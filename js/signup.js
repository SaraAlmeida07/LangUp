document.addEventListener('DOMContentLoaded', function() {

    // --- 1. APLICAR MÁSCARA (Requisito ID 21) ---
    $('#telefone').mask('(00) 00000-0000');

    // --- 2. LÓGICA DE CADASTRO ---
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Captura os dados
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        // (Num app real, criptografaríamos a senha, mas aqui salvamos texto puro)
        
        // Salva no LocalStorage para simular o banco de dados de usuários
        // (Vamos salvar apenas o nome para usar na Dashboard)
        const usuario = {
            nome: nome,
            email: email,
            telefone: telefone
        };

        // Salva o usuário como se fosse o "banco de dados"
        localStorage.setItem('usuarioCadastrado', JSON.stringify(usuario));
        
        // Já faz o "Login automático" salvando o nome na sessão atual
        localStorage.setItem('usuarioLogado', nome);

        alert('Conta criada com sucesso! Bem-vindo(a), ' + nome + '!');
        
        // Redireciona para a Dashboard
        window.location.href = 'dashboard.html';
    });
});