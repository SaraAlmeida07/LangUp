// Aguarda o HTML carregar
document.addEventListener('DOMContentLoaded', function() {

    
    
    // 1. Selecionar o formulário
    const loginForm = document.getElementById('login-form');

    // 2. Adicionar evento de envio
    loginForm.addEventListener('submit', function(event) {
        
        // 3. Previne o recarregamento da página
        event.preventDefault();

        
        
        // Tenta buscar se existe um usuário cadastrado no LocalStorage (vindo do signup.html)
        const usuarioCadastradoJSON = localStorage.getItem('usuarioCadastrado');
        
        let nomeParaLogin = 'User'; // Nome padrão caso ninguém tenha se cadastrado ainda

        if (usuarioCadastradoJSON) {
            // Se achou alguém, usa o nome dessa pessoa!
            const usuarioObj = JSON.parse(usuarioCadastradoJSON);
            nomeParaLogin = usuarioObj.nome;
        }

        // 4. Salva na "Sessão" (quem está logado agora)
        localStorage.setItem('usuarioLogado', nomeParaLogin);

        // 5. Feedback e Redirecionamento
        alert(`Login realizado com sucesso! Bem-vindo(a), ${nomeParaLogin}!`);
        window.location.href = 'dashboard.html';
    });
});