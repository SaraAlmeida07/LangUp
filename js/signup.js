document.addEventListener('DOMContentLoaded', function() {

    // 1. MÁSCARA TELEFONE
    $('#telefone').mask('(00) 00000-0000');

    // 2. FUNÇÃO DE CRIPTOGRAFIA (HASH)
    async function hashSenha(senha) {
        const encoder = new TextEncoder();
        const data = encoder.encode(senha);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // 3. LÓGICA DE SALVAR
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const senhaPura = document.getElementById('senha').value;
        
        // Gera o hash da senha antes de salvar
        const senhaCriptografada = await hashSenha(senhaPura);

        const usuario = {
            nome: nome,
            email: email,
            telefone: telefone,
            senha: senhaCriptografada // Salva o código doido, não a senha real
        };

        localStorage.setItem('usuarioCadastrado', JSON.stringify(usuario));
        localStorage.setItem('usuarioLogado', nome); // Já loga direto ao cadastrar

        alert('Conta criada com sucesso! Bem-vindo(a), ' + nome + '!');
        window.location.href = 'dashboard.html';
    });
});