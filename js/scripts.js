const palavras = ["o seu negócio", "seus projetos", "seu futuro digital", "sua infraestrutura"];
let index = 0;

function alternarPalavra() {
    document.getElementById("palavra-alternada").innerText = palavras[index];
    index = (index + 1) % palavras.length;
}

setInterval(alternarPalavra, 2000); // Alterna a cada 2 segundos