const game = new Game();

/**
 * Listens for click on `#begin-game` and calls startGame() on game object
 */
document.getElementById('begin-game').onclick = event => {
  game.startGame();

  event.target.style.display = 'none';
  document.getElementById('play-area').style.opacity = '1';
};

/**
 * Listen for keyboard presses
 */
document.addEventListener('keydown', game.handleKeydown);
