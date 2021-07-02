class Space {
  constructor(x, y) {
    /** @type {Number} x */ this.x = x;
    /** @type {Number} y */ this.y = y;
    /** @type {string} id */ this.id = `space-${x}-${y}`;
    /** @type {Object} Token */ this.token = null;
    /** @type {Number} diameter */ this.diameter = 76;
    /** @type {Number} radius */ this.radius = this.diameter / 2;
  }
  drawSVGSpace() {
    const svgSpace = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    svgSpace.setAttributeNS(null, 'id', this.id);
    svgSpace.setAttributeNS(null, 'cx', this.x * this.diameter + this.radius);
    svgSpace.setAttributeNS(null, 'cy', this.y * this.diameter + this.radius);
    svgSpace.setAttributeNS(null, 'r', this.radius - 8);
    svgSpace.setAttributeNS(null, 'fill', 'black');
    svgSpace.setAttributeNS(null, 'stroke', 'none');

    document.getElementById('mask').appendChild(svgSpace);
  }

  /**
   * Updates space to reflect a token has been dropped into it.
   * @param {Object} token - The dropped token
   */
  mark(token) {
    this.token = token;
  }

  /**
   * Checks if space has an associated token to find its owner
   * @return  {(null|Object)} Returns null or the owner object of the space's associated token.
   */
  get owner() {
    if (this.token === null) {
      return null;
    } else {
      return this.token.owner;
    }
  }
}
