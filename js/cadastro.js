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

    // Pega o objeto criado e mostra na tela
    function exibirDados(palavraObjeto) {
        const divResultado = document.querySelector('#resultado');

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

    // --- 1. Lógica do Botão Limpar ---
    const btnLimpar = document.querySelector('#btn-limpar');

    btnLimpar.addEventListener('click', function() {
        const campos = document.querySelectorAll('#form-cadastro input, #form-cadastro textarea, #form-cadastro select');

        campos.forEach(campo => {
            campo.value = '';
        });

        document.querySelector('#resultado').innerHTML = '';
        document.getElementById('palavra').focus();
    }); 

    // --- 2. Validação Personalizada (Tradução) ---
    const inputTraducao = document.getElementById('traducao');

    inputTraducao.addEventListener('invalid', function() {
        if (inputTraducao.validity.patternMismatch) {
            inputTraducao.setCustomValidity("Poxa, a tradução não pode ter números! Use apenas letras.");
        } else if (inputTraducao.validity.valueMissing) {
            inputTraducao.setCustomValidity("Não esqueça de preencher a tradução!");
        } else {
            inputTraducao.setCustomValidity(""); 
        }
    });

    inputTraducao.addEventListener('input', function() {
        inputTraducao.setCustomValidity("");
    });


    // --- 3. Evento de Envio (Salvar) ---
    const formCadastro = document.querySelector('#form-cadastro');

    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede a página de recarregar

        if (!formCadastro.checkValidity()) {
            alert("Por favor, corrija os campos destacados antes de enviar.");
            return; // Sai da função e não salva nada
        }

        // Captura os valores
        const palavraInput = document.getElementById('palavra').value;
        const traducaoInput = document.getElementById('traducao').value;
        const idiomaInput = document.getElementById('idioma').value;
        const definicaoInput = document.getElementById('definicao').value;
        const exemploInput = document.getElementById('exemplo').value;

        // Cria o objeto
        const novaPalavra = new Palavra(
            palavraInput, 
            traducaoInput, 
            idiomaInput, 
            definicaoInput, 
            exemploInput
        );

       console.log("Objeto criado:", novaPalavra); // só para ver no F12
    
        // SALVAR NO LOCALSTORAGE --

        const listaDePalavras = JSON.parse(localStorage.getItem('bd_palavras')) || [];

        listaDePalavras.push(novaPalavra);

        localStorage.setItem('bd_palavras', JSON.stringify(listaDePalavras));

        alert('Palavra salva com sucesso!');

        document.querySelector('#form-cadastro').reset();

        window.location.href = 'palavras.html';
    });

}); // Fecha o DOMContentLoaded