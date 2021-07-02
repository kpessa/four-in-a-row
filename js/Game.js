class Game {
  constructor() {
    this.board = new Board();
    this.players = this.createPlayers();
    this.ready = false;
  }
  /**
   * Creates two player objects
   * @return {Array} An array of two Player objects.
   */
  createPlayers() {
    const player1 = new Player('Player 1', 1, '#e15258', true);
    const player2 = new Player('Player 2', 2, '#e59a13');
    return [player1, player2];
  }
  /**
   * Initializes the game.
   */
  startGame() {
    this.board.drawHTMLBoard();
    this.activePlayer.activeToken.drawHTMLToken();
    this.ready = true;
  }

  /**
   * Returns active player.
   * @return {Player} player - The active player.
   */
  get activePlayer() {
    const [player1, player2] = this.players;
    return player1.active ? player1 : player2;
  }

  playToken() {
    let spaces = this.board.spaces;
    let activeToken = this.activePlayer.activeToken;
    let targetColumn = spaces.map(row => row[activeToken.columnLocation]);

    let availableSpaces = targetColumn.filter(({ token }) => !token);
    if (availableSpaces.length == 0) {
      // TODO --------
      console.log('NO AVAILABLE SPACES');
    } else {
      let bestSpace = availableSpaces.reverse()[0];
      this.ready = false;
      this.activePlayer.activeToken.drop(bestSpace, () => {
        this.updateGameState(activeToken, bestSpace);
      });
      // console.log(bestSpace);
    }
  }

  /**
   * Branches code, depending on what key player presses
   * @param   {Object}    e - Keydown event object
   */
  handleKeydown = e => {
    if (e.key === 'ArrowRight') this.activePlayer.activeToken.moveRight(this.board.columns);
    if (e.key === 'ArrowLeft') this.activePlayer.activeToken.moveLeft();
    if (e.key === 'ArrowUp') console.log('UP'); // TODO
    if (e.key === 'ArrowDown') this.playToken();
  };

  /**
   * Switches active player.
   */
  switchPlayers = () => this.players.forEach(player => (player.active = !player.active));

  /**
   * Displays game over message.
   * @param {string} message - Game over message.
   */
  gameOver = message => {
    let el = document.getElementById('game-over');
    el.textContent = message;
    el.style.display = 'block';
  };

  /**
   * Checks if there a winner on the board after each token drop.
   * @param   {Object}    Targeted space for dropped token.
   * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
   */

  /**
   * Updates game state after token is dropped.
   * @param   {Object}  token  -  The token that's being dropped.
   * @param   {Object}  target -  Targeted space for dropped token.
   */
  updateGameState = (token, target) => {
    target.mark(token);

    if (this.checkForWin(target)) {
      this.gameOver(`${this.activePlayer.name} won!`);
      return;
    }
    this.switchPlayers();
    if (this.activePlayer.checkTokens()) {
      this.activePlayer.activeToken.drawHTMLToken();
      this.ready = true;
    } else {
      this.gameOver(`Game over - ran out of tokens!`);
    }
  };

  /**
   * Checks if there a winner on the board after each token drop.
   * @param   {Object}    Targeted space for dropped token.
   * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
   */

  checkForWin(target) {
    const owner = target.token.owner;
    let win = false;

    // vertical
    for (let r = 0; r < this.board.rows - 3; r++) {
      for (let c = 0; c < this.board.columns; c++) {
        if (this.board.spaces[r][c].owner === owner && this.board.spaces[r + 1][c].owner === owner && this.board.spaces[r + 2][c].owner === owner && this.board.spaces[r + 3][c].owner === owner) {
          win = true;
        }
      }
    }

    // horizontal
    for (let r = 0; r < this.board.rows; r++) {
      for (let c = 0; c < this.board.columns - 3; c++) {
        if (this.board.spaces[r][c].owner === owner && this.board.spaces[r][c + 1].owner === owner && this.board.spaces[r][c + 2].owner === owner && this.board.spaces[r][c + 3].owner === owner) {
          win = true;
        }
      }
    }

    // diagonal
    for (let r = 0; r < this.board.rows - 3; r++) {
      for (let c = 3; c < this.board.columns; c++) {
        if (
          this.board.spaces[r][c].owner === owner &&
          this.board.spaces[r + 1][c - 1].owner === owner &&
          this.board.spaces[r + 2][c - 2].owner === owner &&
          this.board.spaces[r + 3][c - 3].owner === owner
        ) {
          win = true;
        }
      }
    }

    // diagonal
    for (let r = 3; r < this.board.rows; r++) {
      for (let c = 3; c < this.board.columns; c++) {
        if (
          this.board.spaces[r][c].owner === owner &&
          this.board.spaces[r - 1][c - 1].owner === owner &&
          this.board.spaces[r - 2][c - 2].owner === owner &&
          this.board.spaces[r - 3][c - 3].owner === owner
        ) {
          win = true;
        }
      }
    }

    return win;
  }
}
