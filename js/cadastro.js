document.addEventListener('DOMContentLoaded', function() {
    
    // CLASSE (MOLDE)
    class Palavra {
        constructor(palavra, traducao, idioma, definicao, exemplo) {
            this.palavra = palavra;
            this.traducao = traducao;
            this.idioma = idioma;
            this.definicao = definicao;
            this.exemplo = exemplo;
            
        }
    }

    // --- LÓGICA DO BOTÃO LIMPAR ---
    const btnLimpar = document.querySelector('#btn-limpar');
    btnLimpar.addEventListener('click', function() {
        document.querySelectorAll('#form-cadastro input, #form-cadastro textarea, #form-cadastro select')
            .forEach(campo => campo.value = '');
        document.getElementById('palavra').focus();
    });

  
    inputTraducao.addEventListener('input', () => inputTraducao.setCustomValidity(""));


    // --- EVENTO DE ENVIO 
    const formCadastro = document.querySelector('#form-cadastro');

    formCadastro.addEventListener('submit', async function(event) { 
        event.preventDefault();

        if (!formCadastro.checkValidity()) {
            alert("Por favor, corrija os erros antes de salvar.");
            return;
        }

        // 1. Captura os valores
        const novaPalavra = new Palavra(
            document.getElementById('palavra').value,
            document.getElementById('traducao').value,
            document.getElementById('idioma').value,
            document.getElementById('definicao').value,
            document.getElementById('exemplo').value
        );

        // 2. ENVIAR PARA O JSON SERVER 
        try {
            const resposta = await fetch('http://localhost:3000/palavras', {
                method: 'POST', // Método para CRIAR
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novaPalavra) // Transforma o objeto em texto para enviar
            });

            if (resposta.ok) {
                alert('Palavra salva com sucesso no Servidor!');
                formCadastro.reset();
                window.location.href = 'palavras.html'; // Redireciona para a lista
            } else {
                alert('Erro ao salvar no servidor.');
                console.error('Erro na API:', resposta.status);
            }

        } catch (erro) {
            console.error('Erro de conexão:', erro);
            alert('Não foi possível conectar ao servidor. Verifique se o json-server está rodando.');
        }
    });
});