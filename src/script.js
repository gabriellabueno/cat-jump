const cat = document.querySelector(".cat");
const block = document.querySelector(".block");
const gameOver = document.querySelector(".hidden");

// Adiciona e remove classe jump; animação para o gato pular
const jump = () => {
  cat.classList.add("jump");

  setTimeout(() => {
    cat.classList.remove("jump");
  }, 900);
};

document.addEventListener("keypress", jump);

const loop = setInterval(() => {

  // Valores para condição de parada(game over)
  const blockMeetsCat = 250; // Quando o bloco encosta no gato
  const catSafeJump = 30; // Valor mínimo antes do gato encostar no bloco

  const blockPosition = block.offsetLeft; // Acessa valor 'left' do css do bloco
  const catPosition = +window.getComputedStyle(cat).bottom.replace("px", "");
  /// não existe função offsetBottom
  /// 'getComputedStyle()' para acessar estilos da classe gato
  /// função 'replace()' para transformar string (px) em número

  // GAME OVER; condição de parada do jogo
  if (
    blockPosition <= blockMeetsCat &&
    blockPosition > 0 && // para continuar animação do bloco, posição quando o bloco passa do gato
    catPosition < catSafeJump
  ) {
    // Paralisa animações
    block.style.animation = "none";
     
    // Fixa elementos na posição
    block.style.left = `${blockPosition}px`;
    cat.style.bottom = `${catPosition}px`;

    // Muda imagem do gato para fantasma; ajusta proporções
    cat.style.opacity = "0.70";
    cat.src = "./images/ghost.gif";
    //cat.style.opacity = "1";
    cat.style.width = "80px";
    cat.style.marginLeft = "80px";

    // Animação fantasma flutuando
    cat.style.animation = "ghost-floating-animation 2s infinite linear";
    
    // Mostra tela de Game Over
    gameOver.classList.remove("hidden");
    
    clearInterval(loop); // Encerra loop
  }
}, 10);
