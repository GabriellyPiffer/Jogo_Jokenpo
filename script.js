// Gerenciamento de elementos da interface
const regras = document.getElementById("regra");
const jogo = document.querySelector(".jogo");
const selecao = document.querySelector(".gameplay");
const arenaPlayer = document.getElementById("arena-player");
const arenaHouse = document.getElementById("arena-house");
const resultado = document.querySelector(".result");
const pontoPlayerEl = document.getElementById("ponto-player");
const pontoHouseEl = document.getElementById("ponto-house");
const playAgain = document.querySelector(".fim");
const btnJogarNovamente = document.querySelector(".playAgain");
const buttonRegras = document.querySelector(".regras-button");

// Variáveis de Estado
let playerScore = 0;
let houseScore = 0;
let torneioFinalizado = false;

// Dicionário mapeando as imagens
const dadosCartas = {
    pedra: { classe: "pedra-card", img: "./images/pedra.png", alt: "Pedra" },
    papel: { classe: "papel-card", img: "./images/papel.png", alt: "Papel" },
    tesoura: { classe: "tesoura-card", img: "./images/tesoura.png", alt: "Tesoura" },
    spock: { classe: "spock-card", img: "./images/spook.png", alt: "Spock" },
    lagarto: { classe: "lagarto-card", img: "./images/lagarta.png", alt: "Lagarto" }
};

const listaOpcoes = ["pedra", "papel", "tesoura", "spock", "lagarto"];

function mostraregras() {
    regras.style.display = "flex";
}

function fecharegras() {
    regras.style.display = "none";
}

// Construtor dinâmico da carta
function renderizarCarta(tipo) {
    const dados = dadosCartas[tipo];

    return `
        <div class="carta-corpo ${dados.classe} no-hover">
            <div class="carta-arte">
                <img src="${dados.img}" alt="${dados.alt}">
            </div>
        </div>
    `;
}

// FUNÇÃO DA COROA
function adicionarCoroa() {
    arenaPlayer.innerHTML += `
        <div class="coroa-vencedor">
            <img src="./images/coroa.png" alt="Coroa">
        </div>
    `;
}

function jogar(escolhaUsuario) {

    if (torneioFinalizado) return;

    jogo.style.animation = "opacidade 0.4s linear reverse";

    setTimeout(() => {
        jogo.style.display = "none";
        selecao.style.display = "flex";
    }, 400);

    buttonRegras.style.display = "none";

    arenaPlayer.innerHTML = renderizarCarta(escolhaUsuario);
    arenaPlayer.setAttribute("data-value", escolhaUsuario);

    const randomIdx = Math.floor(Math.random() * 5);
    const escolhaIA = listaOpcoes[randomIdx];

    arenaHouse.innerHTML = renderizarCarta(escolhaIA);
    arenaHouse.setAttribute("data-value", escolhaIA);

    setTimeout(() => {
        verificarVencedor(escolhaUsuario, escolhaIA);
    }, 500);
}

function verificarVencedor(player, house) {

    const cardUser = arenaPlayer.querySelector(".carta-corpo");
    const cardComp = arenaHouse.querySelector(".carta-corpo");

    const formatarPontos = (ponto) =>
        ponto < 10 ? `0${ponto}` : ponto;

    let resultadoRodada = "";

    // EMPATE
    if (player === house) {

        resultadoRodada = "Empate na rodada! ;)";

        cardUser.classList.add("luz-empate");
        cardComp.classList.add("luz-empate");

    }

    // PLAYER GANHA
    else if (
        (player === "pedra" && (house === "tesoura" || house === "lagarto")) ||
        (player === "tesoura" && (house === "papel" || house === "lagarto")) ||
        (player === "papel" && (house === "pedra" || house === "spock")) ||
        (player === "lagarto" && (house === "spock" || house === "papel")) ||
        (player === "spock" && (house === "pedra" || house === "tesoura"))
    ) {

        resultadoRodada = "Você venceu a rodada! :)";

        playerScore++;

        pontoPlayerEl.innerHTML = formatarPontos(playerScore);

        cardUser.classList.add("luz-vitoria");

    }

    // COMPUTADOR GANHA
    else {

        resultadoRodada = "O Computador venceu a rodada! :(";

        houseScore++;

        pontoHouseEl.innerHTML = formatarPontos(houseScore);

        cardComp.classList.add("luz-derrota");

    }

    // FINAL DO TORNEIO
    if (playerScore === 2) {

        resultado.innerHTML = " VOCÊ GANHOU! ";

        adicionarCoroa();

        btnJogarNovamente.innerHTML = "Novo Torneio";

        torneioFinalizado = true;

    }

    else if (houseScore === 2) {

        resultado.innerHTML = "💀 VOCÊ PERDEU! 💀";

        btnJogarNovamente.innerHTML = "Novo Torneio";

        torneioFinalizado = true;

    }

    else {

        resultado.innerHTML = resultadoRodada;

        btnJogarNovamente.innerHTML = "Próxima Rodada";

    }

    playAgain.style.display = "flex";
}

function reset() {

    if (torneioFinalizado) {

        playerScore = 0;
        houseScore = 0;

        pontoPlayerEl.innerHTML = "00";
        pontoHouseEl.innerHTML = "00";

        torneioFinalizado = false;
    }

    // REMOVE COROA
    const coroa = document.querySelector(".coroa-vencedor");

    if (coroa) {
        coroa.remove();
    }

    jogo.style.display = "flex";
    jogo.style.animation = "opacidade 0.5s linear";

    selecao.style.display = "none";

    resultado.innerHTML = "BATALHANDO...";

    playAgain.style.display = "none";

    buttonRegras.style.display = "block";

    arenaPlayer.innerHTML = "";
    arenaHouse.innerHTML = "";
}