document.addEventListener('DOMContentLoaded', function() {
    
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
    // Pegamos as palavras salvas no LocalStorage
    const palavras = JSON.parse(localStorage.getItem('bd_palavras')) || [];
    let indiceAtual = 0; // Começamos pela primeira palavra (índice 0)

    // 3. Função para Renderizar o Card Atual
    function mostrarCard() {
        // Se não houver palavras cadastradas
        if (palavras.length === 0) {
            containerCard.innerHTML = `
                <div class="text-center">
                    <h3 class="h4 text-muted mb-3">Nenhuma palavra para revisar!</h3>
                    <p class="text-body-secondary mb-4">Cadastre novas palavras para começar.</p>
                    <a href="cadastro.html" class="btn btn-primary">Cadastrar Palavras</a>
                </div>
            `;
            // Esconde os controles
            blocoRevelar.classList.add('d-none');
            return;
        }

        // Pega a palavra da vez
        const itemAtual = palavras[indiceAtual];

        // --- PREENCHE O HTML (Frente) ---
        // Procura os elementos dentro da div 'card-frente'
        const labelIdioma = cardFrente.querySelector('p');
        const tituloPalavra = cardFrente.querySelector('h2');
        
        // Define o texto (com tratamento de erro caso o elemento não exista)
        if(labelIdioma) labelIdioma.textContent = itemAtual.idioma || 'Idioma';
        if(tituloPalavra) tituloPalavra.textContent = itemAtual.palavra;

        // --- PREENCHE O HTML (Verso) ---
        const tituloTraducao = cardTras.querySelector('h2');
        if(tituloTraducao) tituloTraducao.textContent = itemAtual.traducao;

        // --- RESETA O VISUAL (Estado Inicial) ---
        cardFrente.classList.remove('d-none'); // Mostra a frente
        cardTras.classList.add('d-none');      // Esconde o verso
        
        blocoRevelar.classList.remove('d-none'); // Mostra botão revelar
        blocoDificuldade.classList.add('d-none'); // Esconde botões de dificuldade
        blocoProximo.classList.add('d-none');     // Esconde botão próximo
    }

    // 4. Evento: Clicar em Revelar
    btnRevelar.addEventListener('click', function() {
        // Esconde a frente e o botão revelar
        cardFrente.classList.add('d-none');
        blocoRevelar.classList.add('d-none');

        // Mostra o verso (tradução)
        cardTras.classList.remove('d-none');
        
        // Mostra os controles de dificuldade e próximo
        blocoDificuldade.classList.remove('d-none');
        blocoProximo.classList.remove('d-none');
    });

    // 5. Evento: Clicar em Próximo (ou nos botões de dificuldade)
    // Para simplificar, vamos fazer qualquer botão de dificuldade ou "Próximo" avançar
    const botoesAvancar = [btnProximo, ...blocoDificuldade.querySelectorAll('button')];

    botoesAvancar.forEach(btn => {
        btn.addEventListener('click', function() {
            avancarCard();
        });
    });

    function avancarCard() {
        // Avança o índice
        indiceAtual++;

        // Verifica se acabou a lista
        if (indiceAtual >= palavras.length) {
            // Fim da lista
            containerCard.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-trophy text-warning display-1 mb-3"></i>
                    <h3 class="fw-bold text-success">Parabéns!</h3>
                    <p class="fs-5">Você revisou todas as palavras de hoje.</p>
                    <a href="dashboard.html" class="btn btn-outline-primary mt-3">Voltar ao Início</a>
                </div>
            `;
            // Esconde todos os botões de controle
            blocoRevelar.classList.add('d-none');
            blocoDificuldade.classList.add('d-none');
            blocoProximo.classList.add('d-none');
            return;
        }

        // Se ainda tem palavras, carrega a próxima
        mostrarCard();
    }

    // 6. Inicia tudo
    mostrarCard();
});