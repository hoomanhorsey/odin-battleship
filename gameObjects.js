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

    // switch (direction) {
    //   case "up":
    //     return ship.length;
    //   case "down":
    //     return ship.length;
    //   case "left":
    //     return ship.length;
    //   case "right":
    //     return ship.length;
    //   // default:
    //   //   return error;
    // }

    // check boundaries

    // check collisions

    console.log(this.boardArray[x][y]);
    console.log(this.boardArray[x][y + 1]);

    // down
    if (this.boardArray[x][y] === 0 && this.boardArray[x][y + 1] === 0) {
      this.boardArray[x][y] = shipType;
      this.boardArray[x][y + 1] = shipType;
    }

    // if (this.boardArray[x][y] === 0) {
    //   this.boardArray[0][0] = shipType;
    // }
    console.log(this.boardArray);
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
