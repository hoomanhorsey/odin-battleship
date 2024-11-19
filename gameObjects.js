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
      direction,
      ship
    );

    console.log("proposed");

    console.log(proposedPosition);

    if (checkMoveLegal(row, column, direction, ship)) {
      console.log("move legal");
    }

    if (checkClear(proposedPosition)) {
      console.log("proposed");
      console.log(proposedPosition);
      console.log("collision free");
    } else {
      console.log("proposed");

      console.log(proposedPosition);
    }

    // check boundaries + collisons with other ships
    if (
      checkMoveLegal(row, column, direction, ship) &&
      checkClear(proposedPosition)
    ) {
      console.log("position is legal, and no collisions");
      // place ship
      placeShipOnBoard(this.boardArray, column, row, direction, ship);
    } else {
      console.log("position is not legall or collisions");
    }

    // // check collisions with other ships
    // if (checkClear(proposedPosition)) {
    //   console.log("positin is clear");
    // } else {
    //   console.log("position is not clear");
    // }

    console.table(this.boardArray);
  }

  createShip(shipType) {
    switch (shipType) {
      case "carrier":
        return new Ship("carrier", 5);
      case "battleship":
        return new Ship("battleship", 4);
      case "destroyer":
        return new Ship("destroyer", 3);
      case "submarmine":
        return new Ship("submarine", 3);
      case "patrolboat":
        return new Ship("patrolboat", 2);
      default:
        return error;
    }
  }

  receiveAttack(column, row) {
    // determines whether co-ords hit an ship
  }
}

function createProposedPositionArray(boardArray, column, row, direction, ship) {
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
  console.log(row, column);
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
  return array.every((value) => value === 0);
}

function placeShipOnBoard(boardArray, column, row, direction, ship) {
  switch (direction) {
    case "up":
      for (let i = row; i > 0; i--) {
        boardArray[i][column] = ship.type;
      }
      break;
    case "down":
      for (let i = row; i < row + ship.length; i++) {
        boardArray[i][column] = ship.type;
      }
      break;
    case "left":
      for (let i = column; i > column - ship.length; i--) {
        boardArray[row][i] = ship.type;
      }
      break;
    case "right":
      for (let i = column; i < column + ship.length + 1; i++) {
        boardArray[row][i] = ship.type;
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
