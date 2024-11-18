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

  placeShip(x, y, direction, shipType) {
    const ship = this.createShip(shipType);

    // up = +y
    // down = -y
    // left = -x
    // right = +x

    // check boundaries

    // check collisions

    console.log(this.boardArray[x][y]);
    console.log(this.boardArray[x][y + 1]);

    // if (checkClear(y, this.boardArray)) {
    //   console.log("position occupied");
    // } else {
    //   console.log("position occupied");
    // }

    // create array of proposed position
    const proposedPosition = createProposedPositionArray(
      this.boardArray,
      x,
      y,
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
    placeShipOnBoard(this.boardArray, x, y, direction, shipType);

    // if (this.boardArray[x][y] === 0 && this.boardArray[x][y + 1] === 0) {
    //   this.boardArray[x][y] = shipType;
    //   this.boardArray[x][y + 1] = shipType;
    // }

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

  receiveAttack(x, y) {
    // determines whether co-ords hit an ship
  }
}

//!!!!!!!TODOcheck ship lenghts here, may be cutting it short by 1
function createProposedPositionArray(boardArray, x, y, direction) {
  switch (direction) {
    case "up":
      return boardArray.slice(y - ship.length + 1, y).map((row) => row[x]);
    case "down":
      return boardArray.slice(y, y + ship.length + 1).map((row) => row[x]);
    case "left":
      return boardArray[y].slice(x - ship.length + 1, x);
    case "right":
      return boardArray[y].slice(x, x + ship.length + 1);
    // default:
    //   return error;
  }
}
function checkClear(array) {
  console.log(array);

  return array.every((value) => value === 0);
}

function placeShipOnBoard(boardArray, x, y, direction, shipType) {
  switch (direction) {
    case "up":
      for (let i = y; i > 0; i--) {
        boardArray[i][x] = shipType;
      }

    case "down":
      for (let i = y; i < ship.length + 1; i++) {
        boardArray[i][x] = shipType;
      }

    case "left":
      for (let i = x; x > 0; i--) {
        boardArray[y][i] = shipType;
      }
    case "right":
      for (let i = x; x < ship.length + 1; i++) {
        console.log(boardArray[y]);

        boardArray[y][i] = shipType;
      }

    // boardArray[y][x] = shipType;

    // for (let i = x; x < ship.length + 1; i++) {
    //   boardArray[y][i] = shipType;
    // }

    // default:
    //   return error;
  }
}

function makeGrid() {
  const tempArray = [];
  for (let i = 0; i < 10; i++) {
    tempArray[i] = [];
    for (let j = 0; j < 10; j++) {
      tempArray[i].push(0);
    }
  }
  return tempArray;
}

const board = new Gameboard("andrew");

export { Ship, Gameboard };
