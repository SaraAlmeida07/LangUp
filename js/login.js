document.addEventListener('DOMContentLoaded', function() {

    // 1. FUNÇÃO DE CRIPTOGRAFIA (HASH)
    async function hashSenha(senha) {
        const encoder = new TextEncoder();
        const data = encoder.encode(senha);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const emailDigitado = document.getElementById('email').value;
        const senhaDigitada = document.getElementById('senha').value;

        // 2. Busca o usuário no banco
        const usuarioCadastradoJSON = localStorage.getItem('usuarioCadastrado');

        if (!usuarioCadastradoJSON) {
            alert("Usuário não encontrado. Por favor, cadastre-se.");
            return;
        }

        const usuarioSalvo = JSON.parse(usuarioCadastradoJSON);

        // 3. Criptografa a senha digitada para comparar
        const hashDaSenhaDigitada = await hashSenha(senhaDigitada);

        // 4. COMPARAÇÃO SEGURA
        if (emailDigitado === usuarioSalvo.email && hashDaSenhaDigitada === usuarioSalvo.senha) {
            
            // Sucesso
            localStorage.setItem('usuarioLogado', usuarioSalvo.nome);
            alert(`Login realizado com sucesso! Bem-vindo(a), ${usuarioSalvo.nome}!`);
            window.location.href = 'dashboard.html';

        } else {
            // Erro
            alert("Login ou senha incorretos.");
        }
    });
});