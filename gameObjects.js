class Ship {
  hits = 0;
  sunk = false;
  constructor(type, n) {
    this.type = type;
    this.length = n;
  }

  hit() {
    if (this.isSunk()) {
      return "Already sunk";
    } else {
      this.hits++;
      this.isSunk();
    }
  }
  isSunk() {
    if (this.hits === this.length) {
      this.sunk = true;
      return this.sunk;
    }
  }
}
const ship = new Ship("destroyer", 4);

console.log(ship.type, ship.length, ship.hits, ship.sunk);
// Expected output: "destroyer"

class Gameboard {
  boardArray = makeGrid();
  missedAttacks = [];

  constructor(player) {
    this.player = player;
  }

  placeShip(column, row, direction, shipType) {
    const ship = this.createShip(shipType);

    // create array of proposed position for testing
    const proposedPosition = createProposedPositionArray(
      this.boardArray,
      column,
      row,
      direction
    );

    // check boundaries
    if (checkMoveLegal(row, column, direction, ship.length)) {
      console.log("position is legal");
    } else {
      console.log("position is not legall");
    }

    // check collisions with other ships
    if (checkClear(proposedPosition)) {
      console.log("positin is clear");
    } else {
      console.log("position is not clear");
    }

    // place ship
    placeShipOnBoard(this.boardArray, column, row, direction, shipType);

    console.table(this.boardArray);
  }

  createShip(shipType) {
    switch (shipType) {
      case "carrier":
        return new Ship("carrier", 5);
      case battleship:
        return new Ship("battleship", 4);
      case cruiser:
        return new Ship("destroyer", 3);
      case submarmine:
        return new Ship("submarine", 3);
      case destroyer:
        return new Ship("patrolboat", 2);
      default:
        return error;
    }
  }

  receiveAttack(column, row) {
    // determines whether co-ords hit an ship
  }
}

//!!!!!!!TODOcheck ship lenghts here, may be cutting it short by 1
function createProposedPositionArray(boardArray, column, row, direction) {
  switch (direction) {
    case "up":
      return boardArray
        .slice(row - ship.length - 1, row)
        .map((row) => row[row]);
    case "down":
      return boardArray
        .slice(row, row + ship.length + 1)
        .map((row) => row[row]);
    case "left":
      return boardArray[row].slice(column - ship.length + 1, column);
    case "right":
      return boardArray[row].slice(column, column + ship.length + 1);
    default:
      return error;
  }
}

///!doesn't currently test if starting position is illegal
function checkMoveLegal(row, column, direction, shipLength) {
  console.log(row, column);
  switch (direction) {
    case "up":
      if (row - shipLength < 0) {
        return false;
      } else {
        return true;
      }
    case "down":
      if (row + shipLength > 9) {
        return false;
      } else {
        return true;
      }
    case "left":
      if (column - shipLength < 0) {
        return false;
      } else {
        return true;
      }
    case "right":
      if (column + shipLength > 9) {
        return false;
      } else {
        return true;
      }
    default:
      return "error";
  }
}

function checkClear(array) {
  return array.every((value) => value === 0);
}

function placeShipOnBoard(boardArray, column, row, direction, shipType) {
  switch (direction) {
    case "up":
      for (let i = row; i > 0; i--) {
        boardArray[i][column] = shipType;
      }
      break;
    case "down":
      for (let i = row; i < ship.length + 1; i++) {
        boardArray[i][column] = shipType;
      }
      break;
    case "left":
      for (let i = column; i > 0; i--) {
        boardArray[row][i] = shipType;
      }
      break;
    case "right":
      for (let i = column; i < column + ship.length + 1; i++) {
        boardArray[row][i] = shipType;
      }
      break;
    default:
      return "error";
  }
}

function makeGrid() {
  const tempArray = [];
  for (let row = 0; row < 10; row++) {
    tempArray[row] = [];
    for (let column = 0; column < 10; column++) {
      tempArray[row].push(0);
    }
  }
  return tempArray;
}

export { Ship, Gameboard };
