class Player {
  /**
   * Creates a player instance
   * @param {string} name - Name of the player
   * @param {number} id - ID of the player, either 1 or 2
   * @param {string} color - Player's color - helps style tokens, differentiate players
   * @param {boolean} active - whether or not it's the player's turn
   */
  constructor(name, id, color, active = false) {
    this.name = name;
    this.id = id;
    this.color = color;
    /** @type {Boolean} */ this.active = active;
    /** @type {Token[]} */ this.tokens = this.createTokens(21);
  }
  /**
   * Creates token objects for player
   * @param {number} num - Number of token objects to be created
   * @returns {Array} An array of the newly created token objects
   */
  // prettier-ignore
  createTokens = num => Array(num).fill().map((_, i) => new Token(i, this));

  /**
   * Returns the tokens that haven't been used yet
   * @returns {Token[]} An array of the newly created token objects
   */
  get unusedTokens() {
    return this.tokens.filter(token => !token.dropped);
  }

  /**
   * Gets the active token by returning the first token in the array of unused tokens.
   * @return {Token} First token object in the array of unused tokens.
   */
  get activeToken() {
    return this.tokens.find(token => !token.dropped);
  }

  /**
   * Checks if a player has any undropped tokens left
   * @return {Boolean}
   */
  checkTokens() {
    return this.unusedTokens.length === 0 ? false : true;
  }
}
