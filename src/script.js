const gameConfig = {
  jumpDuration: 900,
  checkInterval: 10,
  // Valores para condição de parada(game over)
  blockMeetsCat: 250,
  catSafeJump: 30,
};

// Seleciona elementos DOM
const cat = document.querySelector(".cat");
const block = document.querySelector(".block");
const gameOver = document.querySelector(".hidden");
const gameScore = document.getElementById("score");

// Contador para pontuação
let score = 0;

// Marcador de posição para elementos
let blockPosition = 0;
let catPosition = 0;

// Checa colisão com o bloco; condição de parada
const checkBump = () => {
  blockPosition = block.offsetLeft; // Acessa valor "left" do bloco
  catPosition = +window.getComputedStyle(cat).bottom.replace("px", "");
  /// "getComputedStyle()" para acessar valor de "bottom" do gato
  /// função "replace()" para transformar string (px) em número

  // Se as posições do bloco e do gato estão menores que os valores limite
  if (
    blockPosition <= gameConfig.blockMeetsCat &&
    catPosition < gameConfig.catSafeJump
  )
    return true;
};

// Adiciona e remove classe jump; animação para o gato pular
const jump = () => {
  cat.classList.add("jump");

  setTimeout(() => {
    cat.classList.remove("jump");

    // Se houve colisão ao pular, reduz 1 do score
    if (checkBump()) {
      score--;
    } else {
      score++;
    }
  }, gameConfig.jumpDuration);
};

// Pular ao pressionar tecla espaço
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    jump();
  }
});

// Loop principal do jogo
const gameLoop = setInterval(() => {
  // GAME OVER
  /// se houver colisão do gato com o bloco
  if (checkBump()) {
    // Paralisa animação do bloco
    block.style.animation = "none";

    // Fixa elementos na posição de colisão
    block.style.left = `${blockPosition}px`;
    cat.style.bottom = `${catPosition}px`;

    // Muda imagem do gato para fantasma; ajusta proporções
    cat.style.opacity = "0.8";
    cat.src = "./images/ghost.gif";
    cat.style.width = "80px";
    cat.style.marginLeft = "80px";

    // Animação do fantasma flutuando
    cat.style.animation = "ghost-floating-animation 2s infinite linear";

    // Mostra tela de Game Over
    gameOver.classList.remove("hidden");

    // Mostra pontuação do jogador
    gameScore.innerHTML = `SCORE: ${score}`;

    // Encenrra loop
    clearInterval(gameLoop);
  }
}, gameConfig.checkInterval);
