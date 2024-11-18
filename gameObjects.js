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

    // up = +y
    // down = -y
    // left = -x
    // right = +x

    // check boundaries

    // check collisions

    // create array of proposed position
    const proposedPosition = createProposedPositionArray(
      this.boardArray,
      column,
      row,
      direction
    );
    // check if position is clear
    if (checkClear(proposedPosition)) {
      console.log("positin is clear");
    } else {
      console.log("position is not clear");
    }

    // place ship
    // down
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
function checkClear(array) {
  console.log(array);
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
