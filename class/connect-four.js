const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // commands
    Screen.addCommand('left', 'move cursor left', this.cursor.left.bind(this.cursor));
    Screen.addCommand('right', 'move cursor right', this.cursor.right.bind(this.cursor));
    Screen.addCommand('up', 'move cursor up', this.cursor.up.bind(this.cursor));
    Screen.addCommand('down', 'move cursor down', this.cursor.down.bind(this.cursor));

    // places a move at cursor's position
    Screen.addCommand('space', 'set a move at cursor location', ConnectFour.setMove.bind(this));

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  static setMove() {
    Screen.render();
    Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);

    // alternate turns
    if (this.playerTurn === "O") {
      this.playerTurn = "X";
    } else {
      this.playerTurn = "O";
    }

    // check winner
    const winner = ConnectFour.checkWin(Screen.grid);
    if (!winner) {
      Screen.render();
    } else {
      ConnectFour.endGame(winner);
    }
  }

  static checkWin(grid) {
    const fullGrid = this._checkFullGrid(grid);

    // Return 'T' if the game is a tie
    if (fullGrid) {
      return "T";
    }

    // Return 'X' if player X wins
    const horizontalWin = this._checkHorizontal(grid);
    // console.log("horizontal === " + horizontalWin);
    const verticalWin = this._checkVertical(grid);
    // console.log("vertical === " + verticalWin);
    const diagonalWin = this._checkDiagonal(grid);
    // console.log("diagonal === " + diagonalWin);

     if(horizontalWin === "X" || verticalWin === "X" || diagonalWin === "X") {
      return "X";
     }

    // Return 'O' if player O wins
    if(horizontalWin === "O" || verticalWin === "O" || diagonalWin === "O") {
       return "O";
    }

    // Return false if the game has not ended
    if (!fullGrid) {
       return false;
    }
  }

  static _checkFullGrid(grid) {
    let full = true;

    for (let row = 0; row < grid.length; row++) {
      let column = grid[row];
      for (let col = 0; col < column.length; col++) {
        if (grid[row][col] === " ") {
          full = false;
        }
      }
    }
    return full;
  }

  static _checkHorizontal(grid) {
    // function to check if there's a horizontal win
    const setOfFourHorizontal = (mark) => {
      let count = 0;
      let testA = [];

      // go across each rows
      for (let row = 0; row < grid.length; row++) {
        const column = grid[row];
        // stop at col 4
        for (let col = 0; col < column.length; col++) {

          const currentSpot = grid[row][col];
          if (currentSpot === mark) {
            count++;

            // check next 3 horizontal
            for (let rightIndex = 1; rightIndex < 4; rightIndex++) {
              if (grid[row][col + rightIndex] === mark) {
                count++;
              }
            }
          }

          // if count = 4, win
          if (count === 4) {
            return mark;
          }

          // reset count
          count = 0;
        }
      }

      return false;
    }

    const checkX = setOfFourHorizontal("X");
    const checkO = setOfFourHorizontal("O");

    if (checkX) {
      return "X";
    } else if (checkO) {
      return "O";
    } else {
      // no win
      return false;
    }
  }

  static _checkVertical(grid) {

    // function to check if there's a vertical win
    const setOfFourVertical = (mark) => {
      let count = 0;

      // stop after row 2 since we need 4 to connect
      for (let row = 0; row <= 2; row++) {
        const column = grid[row];
        for (let col = 0; col < column.length; col++) {

          const currentSpot = grid[row][col];
          if (currentSpot === mark) {
            count++;
            // check bottom 3
            for (let bottomIndex = 1; bottomIndex < 4; bottomIndex++) {
              if (grid[row + bottomIndex][col] === mark) {
                count++;
              }
            }

            // if count = 4, win
            if (count === 4) {
              return mark;
            }

            // reset count
            count = 0;
            }
          }
      }
    }

    const checkX = setOfFourVertical("X");
    const checkO = setOfFourVertical("O");

    if (checkX) {
      return "X";
    } else if (checkO) {
      return "O";
    } else {
      // no win
      return false;
    }
  }

  static _checkDiagonal(grid) {
    const setOfFourDiagonalDown = (mark) => {
      let count = 0;

      // stop after row 3 out of 6 since we need 4 to connect
      for (let row = 0; row <= 2; row++) {
        const column = grid[row];
        // stop after col 4 out of 7
        for (let col = 0; col < column.length; col++) {

          const currentSpot = grid[row][col];
          if (currentSpot === mark) {
            count++
            // check bottom 3 diagonal
            for (let bottomIndex = 0; bottomIndex <= 2; bottomIndex++) {
              if (grid[row + bottomIndex][col + bottomIndex] === mark) {
                count++;
              }
            }
          }
          // if count = 4, win
          if (count === 4) {
            return mark;
          }

          // reset count
          count = 0;
        }
      }
    }

    const setOfFourDiagonalUp = (mark) => {
      let count = 0;

      // only check rows 4 to 6 since we're going diagonal upward
      for (let row = 3; row < grid.length; row++) {
        const column = grid[row];
        // only check columns 1 to 4
        for (let col = 0; col <= 3; col++) {

          const currentSpot = grid[row][col];
          if (currentSpot === mark) {
            count++
            // check top 3 diagonal
            for (let topIndex = 0; topIndex <= 2; topIndex++) {
              if (grid[row - topIndex][col + topIndex] === mark) {
                count++;
              }
            }
          }
          // if count = 4, win
          if (count === 4) {
            return mark;
          }

          // reset count
          count = 0;
        }
      }
    }

    const checkXDown = setOfFourDiagonalDown("X");
    const checkXUp = setOfFourDiagonalUp("X");
    const checkODown = setOfFourDiagonalDown("O");
    const checkOUp = setOfFourDiagonalUp("O");

    if (checkXUp || checkXDown) {
      return "X";
    } else if (checkOUp || checkODown) {
      return "O";
    } else {
      // no win
      return false;
    }
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}


// let     grid = [
// ['X','O','X',' ','X','X','X'],
// ['X','O','X','O','X','O','X'],
// ['O','X','O','X','O','X','O'],
// ['O','X','O','X','O','X','O'],
// ['O','X','O','X','O','X','O'],
// ['X','O','X','O','X','O','X']]

// const setOfFourVertical = (mark) => {
//   let count = 0;

//   // stop after row 2 since we need 4 to connect
//   for (let row = 0; row <= 2; row++) {
//     const column = grid[row];
//     for (let col = 0; col < column.length; col++) {

//       const currentSpot = grid[row][col];
//       if (currentSpot === mark) {
//         count++
//         // check bottom 3
//         for (let bottomIndex = 0; bottomIndex <= 2; bottomIndex++) {
//           if (grid[row + bottomIndex][col] === mark) {
//             count++;
//             if (count === 4) {
//               console.log(row + bottomIndex);
//               console.log(col);
//             }
//           }
//         }
//       }
//       // if count = 4, win
//       if (count === 4) {
//         return mark;
//       }

//       // reset count
//       count = 0;
//     }
//   }

//   return false;
// }

// console.log(setOfFourVertical("X"));




// -----
module.exports = ConnectFour;
