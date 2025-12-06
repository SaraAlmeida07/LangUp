document.addEventListener('DOMContentLoaded', function () {
    // 1. VERIFICAÇÃO DE LOGIN
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (!usuarioLogado) {
        alert('Você precisa fazer login para acessar essa página!');
        window.location.href = 'index.html';
        return;
    }

    // 2. SAUDAÇÃO (Nome do Usuário)
    const tituloMobile = document.getElementById('welcome-title-mobile');
    const tituloDesktop = document.getElementById('welcome-title-desktop');

    if (tituloMobile) tituloMobile.textContent = `Olá, ${usuarioLogado}!`;
    if (tituloDesktop) tituloDesktop.textContent = `Bem-vindo de volta, ${usuarioLogado}!`;

    // 3. CHAMAR FUNÇÕES DE ESTATÍSTICA
    atualizarTotalPalavras();
    atualizarCardsDePratica();
});

// Função A: Busca o total de palavras na API
async function atualizarTotalPalavras() {
    try {
        const resposta = await fetch('http://localhost:3000/palavras');
        if (resposta.ok) {
            const palavras = await resposta.json();
            const contador = document.getElementById('stat-palavras');
            if (contador) contador.textContent = palavras.length;
        }
    } catch (error) {
        console.error('Erro ao contar palavras:', error);
        const contador = document.getElementById('stat-palavras');
        if (contador) contador.textContent = '-';
    }
}

// Função B: Atualiza "Revisões de Hoje" e "Última Prática" (LocalStorage)
function atualizarCardsDePratica() {
    // Pega os dados salvos pelo flashcards.js
    const hoje = new Date().toLocaleDateString();
    const dataUltimaPratica = localStorage.getItem('data_pratica');
    let contadorHoje = parseInt(localStorage.getItem('contador_pratica')) || 0;

    // Se a data salva for diferente de hoje, o contador de hoje é 0
    if (dataUltimaPratica !== hoje) {
        contadorHoje = 0;
    }

    // --- CARD 1: REVISÕES DE HOJE ---
    const elRevisoes = document.getElementById('stat-revisoes');
    if (elRevisoes) {
        elRevisoes.textContent = contadorHoje;
    }

    // --- CARD 2: ÚLTIMA PRÁTICA (DATA) ---
    const elUltimaPratica = document.getElementById('stat-pratica');
    const elTextoPratica = elUltimaPratica ? elUltimaPratica.nextElementSibling : null;

    if (elUltimaPratica) {
        if (!dataUltimaPratica) {
            elUltimaPratica.textContent = '--';
            if (elTextoPratica) elTextoPratica.textContent = 'Nenhuma prática registrada';
        } else if (dataUltimaPratica === hoje) {
            elUltimaPratica.textContent = 'Hoje';
            elUltimaPratica.classList.add('text-success'); // Fica verde se for hoje
        } else {
            elUltimaPratica.textContent = dataUltimaPratica; // Mostra a data (ex: 23/10/2025)
            elUltimaPratica.classList.remove('text-success');
        }
    }
}
