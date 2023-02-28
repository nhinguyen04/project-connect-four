const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  _setMovementBefore() {
    Screen.render();
    this.resetBackgroundColor();
  }

  _setMovementAfter() {
    this.setBackgroundColor();
    Screen.render();
  }

  up() {
    // Move cursor up
    this._setMovementBefore();
    if (this.row > 0) {
      this.row -= 1;
    }
    this._setMovementAfter();
  }

  down() {
    // Move cursor down
    this._setMovementBefore();
    if (this.row < 2) {
      this.row += 1;
    }
    this._setMovementAfter();
  }

  left() {
    // Move cursor left
    this._setMovementBefore();
    if (this.col > 0) {
      this.col -= 1;
    }
    this._setMovementAfter();
  }

  right() {
    // Move cursor right
    this._setMovementBefore();
    if (this.col < 2) {
      this.col += 1;
    }
    this._setMovementAfter();
  }

}


module.exports = Cursor;
