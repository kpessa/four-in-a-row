/**
 * @property {Number} rows - number of rows the board has
 * @property {Number} columns - number of columns the board has
 * @property {Space[][]} spaces = 2-D array of Spaces
 */
class Board {
  /**
   * Creates a Board instance.
   * @param {number} rows - number of rows the board has
   * @param {number} columns = number of columns the board has
   */
  constructor(rows = 6, columns = 7) {
    /** @type {Number} rows */ this.rows = rows;
    /** @type {Number} columns */ this.columns = columns;
    /** @type {Space[][]} */ this.spaces = this.createSpaces();
  }

  /**
   * Generates 2D array of spaces.
   * @return {Array} An array of space objects
   */
  // prettier-ignore
  createSpaces = () => Array(this.rows).fill().map((_, y) =>
    Array(this.columns).fill().map((_, x) => new Space(x, y)));
  drawHTMLBoard = () => this.spaces.forEach(row => row.forEach(space => space.drawSVGSpace()));
}
