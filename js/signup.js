document.addEventListener('DOMContentLoaded', function () {
    // 1. MÁSCARA
    $('#telefone').mask('(00) 00000-0000');

    // 2. FUNÇÃO DE HASH
    async function hashSenha(senha) {
        const encoder = new TextEncoder();
        const data = encoder.encode(senha);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash))
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('');
    }

    // 3. EVENTO DE CADASTRO
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const senhaPura = document.getElementById('senha').value;

        // Criptografa
        const senhaCriptografada = await hashSenha(senhaPura);

        const novoUsuario = {
            nome: nome,
            email: email,
            telefone: telefone,
            senha: senhaCriptografada
        };

        try {
            const resposta = await fetch('http://localhost:3000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoUsuario)
            });

            if (resposta.ok) {
                alert('Conta criada com sucesso! Bem-vindo(a), ' + nome + '!');

                localStorage.setItem('usuarioLogado', nome);

                window.location.href = './dashbord.html';
            } else {
                alert('Erro ao criar conta. Tente novamente.');
            }
        } catch (erro) {
            console.error(erro);
            alert('Erro de conexão com o servidor.');
        }
    });
});
