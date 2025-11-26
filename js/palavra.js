document.addEventListener('DOMContentLoaded', function() {
    
    const containerLista = document.getElementById('lista-palavras');

    // Função para pegar a bandeira
    function getBandeira(idioma) {
        // Verifica se idioma existe antes de tentar usar toLowerCase
        const i = idioma ? idioma.toLowerCase().trim() : '';

        if (i.includes('inglês') || i.includes('ingles') || i.includes('english')) return '🇺🇸';
        if (i.includes('espanhol') || i.includes('spanish')) return '🇪🇸';
        if (i.includes('francês') || i.includes('frances') || i.includes('french')) return '🇫🇷';
        if (i.includes('português') || i.includes('portugues')) return '🇧🇷';
        
        return '🏳️';
    }

    function carregarLista() {
        // 1. Ler do LocalStorage
        const dados = localStorage.getItem('bd_palavras');
        const palavrasSalvas = dados ? JSON.parse(dados) : [];

        // 2. Verificar se está vazio
        if (palavrasSalvas.length === 0) {
            containerLista.innerHTML = `
                <div class="col-12 text-center mt-5">
                    <p class="text-muted fs-4">📭</p>
                    <p class="text-muted">Nenhuma palavra cadastrada ainda.</p>
                    <a href="cadastro.html" class="btn btn-primary mt-2">Cadastrar a primeira</a>
                </div>
            `;
            return;
        }

        // 3. Limpar o container
        containerLista.innerHTML = '';

        // 4. Desenhar os cards
        palavrasSalvas.reverse().forEach((palavra, index) => {
            
            const bandeira = getBandeira(palavra.idioma);

            const cardHTML = `
                <div class="col">
                    <div class="card shadow-sm border-0 rounded-4 h-100 p-3 card-vocabulario">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <span class="badge bg-light text-dark border">${bandeira} ${palavra.idioma}</span>
                            <button class="btn btn-sm text-danger p-0" onclick="deletarPalavra(${index})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                        
                        <h5 class="fw-bold text-primary mb-1">${palavra.palavra}</h5>
                        <p class="text-dark mb-2 fw-medium">${palavra.traducao}</p>
                        
                        ${palavra.definicao ? `<p class="small text-muted mb-0 border-top pt-2 mt-2">${palavra.definicao}</p>` : ''}
                    </div>
                </div>
            `;
            
            containerLista.innerHTML += cardHTML;
        });
    }

    // Função para deletar
    window.deletarPalavra = function(index) {
        if(confirm("Excluir esta palavra?")) {
            let lista = JSON.parse(localStorage.getItem('bd_palavras')) || [];
            // Ajuste do índice por causa do reverse()
            const indiceReal = lista.length - 1 - index;
            lista.splice(indiceReal, 1); 
            localStorage.setItem('bd_palavras', JSON.stringify(lista));
            carregarLista();
        }
    }

    // Inicia a função
    carregarLista();
});