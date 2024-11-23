function makeGrid() {
  const tempArray = [];
  for (let row = 0; row < 10; row++) {
    tempArray[row] = [];
    for (let column = 0; column < 10; column++) {
      tempArray[row].push({ ship: null, hit: false, missed: false });
    }
  }
  return tempArray;
}

function positionCheckArray(boardArray, row, column, direction, ship) {
  switch (direction) {
    case "up":
      return boardArray
        .slice(row - ship.length + 1, row + 1)
        .map((row) => row[column]);
    case "down":
      return boardArray.slice(row, row + ship.length).map((row) => row[column]);
    case "left":
      return boardArray[row].slice(column - ship.length + 1, column + 1);
    case "right":
      return boardArray[row].slice(column, column + ship.length);
    default:
      return error;
  }
}

function checkMoveLegal(row, column, direction, ship) {
  switch (direction) {
    case "up":
      if (row - ship.length < 0) {
        return false;
      } else {
        return true;
      }
    case "down":
      if (row + ship.length > 9) {
        return false;
      } else {
        return true;
      }
    case "left":
      if (column - ship.length < 0) {
        return false;
      } else {
        return true;
      }
    case "right":
      if (column + ship.length > 9) {
        return false;
      } else {
        return true;
      }
    default:
      return "error";
  }
}

function checkClear(array) {
  return array.every((value) => value.ship === null);
}

function placeShipOnBoard(boardArray, row, column, direction, ship) {
  switch (direction) {
    case "up":
      for (let i = row; i > row - ship.length; i--) {
        boardArray[i][column].ship = ship.type;
      }
      break;
    case "down":
      for (let i = row; i < row + ship.length; i++) {
        boardArray[i][column].ship = ship.type;
      }
      break;
    case "left":
      for (let i = column; i > column - ship.length; i--) {
        boardArray[row][i].ship = ship.type;
      }
      break;
    case "right":
      for (let i = column; i < column + ship.length; i++) {
        boardArray[row][i].ship = ship.type;
      }
      break;
    default:
      return "Invalid diirection provided";
  }
}
export {
  makeGrid,
  positionCheckArray,
  checkMoveLegal,
  checkClear,
  placeShipOnBoard,
};
