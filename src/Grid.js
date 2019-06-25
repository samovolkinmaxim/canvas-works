export default class Grid {
  constructor(width, height, clearValue) {
    this.area = new Array(width * height);
    this.width = width;
    this.height = height;
    this.clearValue = clearValue;
    this.clear();
  }

  isInside(vector) {
    return vector.x >= 0 && vector.x < this.width &&
           vector.y >= 0 && vector.y < this.height;
  }

  get(vector) {
    return this.area[vector.x + this.width * vector.y];
  }

  set(vector, value) {
    this.area[vector.x + this.width * vector.y] = value;
  }

  clear() {
    for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
            this.area[x + y * this.width] = this.clearValue;
        }
    }
  }

  toString() {
    let result = '';
    for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
            result += this.area[x + y * this.width];
        }
        result += '\n';
    }
    return result;
  }
}
