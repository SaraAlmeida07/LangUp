document.addEventListener('DOMContentLoaded', function() {
    
    // 1. CLASSE (MOLDE)
    class Palavra {
        constructor(palavra, traducao, idioma, definicao, exemplo) {
            this.palavra = palavra;
            this.traducao = traducao;
            this.idioma = idioma;
            this.definicao = definicao;
            this.exemplo = exemplo;
        }
    }

    // 2. LÓGICA DO BOTÃO LIMPAR
    const btnLimpar = document.querySelector('#btn-limpar');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', function() {
            document.querySelectorAll('#form-cadastro input, #form-cadastro textarea, #form-cadastro select')
                .forEach(campo => campo.value = '');
            
            // Foca no campo que estiver visível
            const pDesk = document.getElementById('palavra-desktop');
            const pMob = document.getElementById('palavra-mobile');
            if (pDesk && pDesk.offsetParent !== null) pDesk.focus();
            else if (pMob) pMob.focus();
        });
    }

    // 3. FUNÇÃO DA API (BUSCAR DEFINIÇÃO)
    async function buscarDefinicao() {
        // Captura o valor do campo visível
        const valDesktop = document.getElementById('palavra-desktop').value;
        const valMobile = document.getElementById('palavra-mobile').value;
        const palavra = (valDesktop || valMobile).trim();

        const idiomaSelecionado = document.getElementById('idioma').value;

        if (!palavra) {
            alert("Por favor, digite uma palavra para buscar.");
            return;
        }

        if (idiomaSelecionado !== 'ingles') {
            alert("⚠️ Nesta versão, a busca automática está disponível apenas para Inglês.");
            return;
        }

        // Feedback visual nos botões
        const botoesBusca = document.querySelectorAll('#btn-buscar-api-desktop, #btn-buscar-api-mobile');
        botoesBusca.forEach(btn => btn.textContent = "Buscando...");

        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${palavra}`);
            
            if (!response.ok) {
                throw new Error('Palavra não encontrada');
            }

            const dados = await response.json();

            // Preenche a Definição
            const definicaoEncontrada = dados[0].meanings[0].definitions[0].definition;
            document.getElementById('definicao').value = definicaoEncontrada;

            // Preenche o Exemplo (se houver)
            if(dados[0].meanings[0].definitions[0].example) {
                document.getElementById('exemplo').value = dados[0].meanings[0].definitions[0].example;
            }

        } catch (erro) {
            console.error(erro);
            alert("Não encontramos uma definição para esta palavra.");
        } finally {
            botoesBusca.forEach(btn => btn.textContent = "Buscar Definição");
        }
    }

    // 4. CONECTAR BOTÕES DE BUSCA
    const btnBuscarDesktop = document.getElementById('btn-buscar-api-desktop');
    if (btnBuscarDesktop) btnBuscarDesktop.addEventListener('click', buscarDefinicao);

    const btnBuscarMobile = document.getElementById('btn-buscar-api-mobile');
    if (btnBuscarMobile) btnBuscarMobile.addEventListener('click', buscarDefinicao);


    // 5. EVENTO DE SALVAR (SUBMIT)
    const formCadastro = document.querySelector('#form-cadastro');

    formCadastro.addEventListener('submit', async function(event) { 
        event.preventDefault();

        if (!formCadastro.checkValidity()) {
            alert("Por favor, preencha os campos obrigatórios.");
            return;
        }

        // Captura inteligente dos campos de palavra
        const valDesktop = document.getElementById('palavra-desktop').value;
        const valMobile = document.getElementById('palavra-mobile').value;
        const palavraFinal = (valDesktop || valMobile).trim();

        const novaPalavra = new Palavra(
            palavraFinal,
            document.getElementById('traducao').value,
            document.getElementById('idioma').value,
            document.getElementById('definicao').value,
            document.getElementById('exemplo').value
        );

        try {
            const resposta = await fetch('http://localhost:3000/palavras', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novaPalavra)
            });

            if (resposta.ok) {
                alert('Palavra salva com sucesso!');
                formCadastro.reset();
                window.location.href = 'palavras.html';
            } else {
                alert('Erro ao salvar no servidor.');
            }

        } catch (erro) {
            console.error('Erro:', erro);
            alert('Erro de conexão. Verifique o json-server.');
        }
    });
});