document.addEventListener('DOMContentLoaded', function() {

    // 1. FUNÇÃO DE HASH
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

        try {
            // --- BUSCAR NA API (GET) ---
            // O json-server permite filtrar direto na URL: ?email=valor
            const resposta = await fetch(`http://localhost:3000/usuarios?email=${emailDigitado}`);
            const usuariosEncontrados = await resposta.json();

            // 1. Verifica se encontrou alguém com esse e-mail
            if (usuariosEncontrados.length === 0) {
                alert("Usuário não encontrado. Por favor, cadastre-se.");
                return;
            }

            // O json-server retorna uma lista, pegamos o primeiro (e único)
            const usuarioSalvo = usuariosEncontrados[0];

            // 2. Verifica a senha (Comparando os Hashs)
            const hashDigitado = await hashSenha(senhaDigitada);

            if (hashDigitado === usuarioSalvo.senha) {
                // SUCESSO
                localStorage.setItem('usuarioLogado', usuarioSalvo.nome);
                alert(`Bem-vindo de volta, ${usuarioSalvo.nome}!`);
                window.location.href = 'dashboard.html';
            } else {
                // ERRO DE SENHA
                alert("Senha incorreta.");
            }

        } catch (erro) {
            console.error(erro);
            alert("Erro ao conectar com o servidor.");
        }
    });
});