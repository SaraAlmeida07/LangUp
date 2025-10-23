// Aguarda o HTML da página ser completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', function() {

    // 1. Captura o formulário de login pelo seu ID
    const loginForm = document.getElementById('login-form');

    // 2. Adiciona um "escutador de eventos" que fica esperando o formulário ser enviado
    loginForm.addEventListener('submit', function(event) {
        
        // 3. Impede o comportamento padrão do formulário, que é recarregar a página
        event.preventDefault();

        // --- SIMULAÇÃO DE LOGIN ---
        
        // 4. Guarda uma informação na "gaveta" do navegador (localStorage)
        // para que outras páginas saibam que o usuário está logado.
        localStorage.setItem('usuarioLogado', 'Sofia');

        // 5. Exibe um alerta de sucesso
        alert('Login realizado com sucesso! Redirecionando para a Dashboard...');

        // 6. Redireciona o usuário para a página principal do aplicativo
        window.location.href = 'dashboard.html';
    });
});