// Aguarda o HTML carregar completamente antes de rodar o script
document.addEventListener('DOMContentLoaded', function() {
    class Palavra {
        constructor(palavra, traducao, idioma, definicao, exemplo) {
            this.palavra = palavra;
            this.traducao = traducao;
            this.idioma = idioma;
            this.definicao = definicao;
            this.exemplo = exemplo;
        }
    }

    //  pega o objeto criado e mostra na tela
    function exibirDados(palavraObjeto) {
        const divResultado = document.querySelector('#resultado');

        // Injeta o HTML com os dados dentro da div vazia
        divResultado.innerHTML = `
            <div class="card shadow-sm border-0 rounded-4 p-4 bg-light">
                <h3 class="fw-bold text-primary mb-3">Dados Cadastrados:</h3>
                <p><strong>Palavra:</strong> ${palavraObjeto.palavra}</p>
                <p><strong>Tradução:</strong> ${palavraObjeto.traducao}</p>
                <p><strong>Idioma:</strong> ${palavraObjeto.idioma}</p>
                <p><strong>Definição:</strong> ${palavraObjeto.definicao || 'N/A'}</p>
                <p><strong>Exemplo:</strong> ${palavraObjeto.exemplo || 'N/A'}</p>
            </div>
        `;
    }

    // Botão Limpar
    const btnLimpar = document.querySelector('#btn-limpar');

    btnLimpar.addEventListener('click', function() {
        const campos = document.querySelectorAll('#form-cadastro input, #form-cadastro textarea, #form-cadastro select');

        //Limpando a Div de resultado
        campos.forEach(campo => {
            campo.value = '';
        });

        document.querySelector('#resultado').innerHTML = '';

        const inputDesktop = document.getElementById('palavra-desktop');
        const inputMobile = document.getElementById('palavra-mobile');

        // Se o desktop estiver visível (offsetParent não é null), foca nele, senão foca no mobile
        if(inputDesktop.offsetParent !== null) {
             inputDesktop.focus();
        } else {
             inputMobile.focus();
        }
    });

    // --- PASSO 3: EVENTO DE ENVIO (SALVAR) ---
    const formCadastro = document.querySelector('#form-cadastro');

    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede a página de recarregar

        // Captura os valores (Lógica inteligente para pegar o input visível)
        const palavraInput = document.getElementById('palavra-desktop').value || document.getElementById('palavra-mobile').value;
        const traducaoInput = document.getElementById('traducao').value;
        const idiomaInput = document.getElementById('idioma').value;
        const definicaoInput = document.getElementById('definicao').value;
        const exemploInput = document.getElementById('exemplo').value;

        // Cria o objeto usando a Classe
        const novaPalavra = new Palavra(
            palavraInput, 
            traducaoInput, 
            idiomaInput, 
            definicaoInput, 
            exemploInput
        );

        exibirDados(novaPalavra);
    });
});




