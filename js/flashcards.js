document.addEventListener('DOMContentLoaded', async function () {
    // 1. Elementos da Tela (DOM)
    const containerCard = document.querySelector('.card-body');
    const cardFrente = document.getElementById('card-frente');
    const cardTras = document.getElementById('card-tras');
    const blocoRevelar = document.getElementById('bloco-revelar');
    const btnRevelar = blocoRevelar.querySelector('button');
    const blocoDificuldade = document.getElementById('bloco-dificuldade');
    const blocoProximo = document.getElementById('bloco-proximo');
    const btnProximo = blocoProximo.querySelector('button');

    // 2. Dados e Estado
    let palavras = [];
    let indiceAtual = 0;

    // - Busca dados da API (fetch) ---
    async function carregarDados() {
        try {
            const resposta = await fetch('http://localhost:3000/palavras');
            if (resposta.ok) {
                palavras = await resposta.json();
                mostrarCard(); // Só mostra o card depois que os dados chegarem
            } else {
                console.error('Erro ao buscar palavras');
            }
        } catch (erro) {
            console.error('Erro de conexão:', erro);
            containerCard.innerHTML = `<p class="text-danger text-center">Erro ao carregar flashcards. Verifique o servidor.</p>`;
        }
    }

    // 3. Função para Renderizar o Card Atual
    function mostrarCard() {
        if (palavras.length === 0) {
            containerCard.innerHTML = `
                <div class="text-center">
                    <h3 class="h4 text-muted mb-3">Nenhuma palavra para revisar!</h3>
                    <p class="text-body-secondary mb-4">Cadastre novas palavras para começar.</p>
                    <a href="cadastro.html" class="btn btn-primary">Cadastrar Palavras</a>
                </div>
            `;
            blocoRevelar.classList.add('d-none');
            return;
        }

        const itemAtual = palavras[indiceAtual];

        // Preenche Frente
        const labelIdioma = cardFrente.querySelector('p');
        const tituloPalavra = cardFrente.querySelector('h2');
        if (labelIdioma) labelIdioma.textContent = itemAtual.idioma || 'Idioma';
        if (tituloPalavra) tituloPalavra.textContent = itemAtual.palavra;

        // Preenche Verso
        const tituloTraducao = cardTras.querySelector('h2');
        if (tituloTraducao) tituloTraducao.textContent = itemAtual.traducao;

        // Reseta Visual
        cardFrente.classList.remove('d-none');
        cardTras.classList.add('d-none');
        blocoRevelar.classList.remove('d-none');
        blocoDificuldade.classList.add('d-none');
        blocoProximo.classList.add('d-none');
    }

    // 4. Evento: Revelar
    if (btnRevelar) {
        btnRevelar.addEventListener('click', function () {
            cardFrente.classList.add('d-none');
            blocoRevelar.classList.add('d-none');
            cardTras.classList.remove('d-none');
            blocoDificuldade.classList.remove('d-none');
            blocoProximo.classList.remove('d-none');
        });
    }

    // 5. Evento: Próximo / Dificuldade
    const botoesAvancar = [btnProximo, ...blocoDificuldade.querySelectorAll('button')];

    botoesAvancar.forEach((btn) => {
        btn.addEventListener('click', function () {
            // --- 1. CONTADOR DIÁRIO (Vem primeiro!) ---
            // Registramos a ação antes de mudar de card
            const hoje = new Date().toLocaleDateString();
            const ultimaData = localStorage.getItem('data_pratica');
            let contador = parseInt(localStorage.getItem('contador_pratica')) || 0;

            // Se a data mudou, reseta o contador
            if (ultimaData !== hoje) {
                contador = 0;
                localStorage.setItem('data_pratica', hoje);
            }

            // Aumenta +1 e salva
            contador++;
            localStorage.setItem('contador_pratica', contador);
            // -------------------------------------

            // --- 2. LÓGICA DE NAVEGAÇÃO ---
            indiceAtual++;

            // Verifica se acabou a lista
            if (indiceAtual >= palavras.length) {
                containerCard.innerHTML = `
                    <div class="text-center py-5">
                        <i class="bi bi-trophy text-warning display-1 mb-3"></i>
                        <h3 class="fw-bold text-success">Parabéns!</h3>
                        <p class="fs-5">Você revisou todas as palavras de hoje.</p>
                        <a href="dashboard.html" class="btn btn-outline-primary mt-3">Voltar ao Início</a>
                    </div>
                `;
                // Esconde os controles
                blocoRevelar.classList.add('d-none');
                blocoDificuldade.classList.add('d-none');
                blocoProximo.classList.add('d-none');
                return;
            }

            // Se não acabou, mostra o próximo
            mostrarCard();
        });
    });

    // 6. Inicia carregando os dados da API
    carregarDados();
});
