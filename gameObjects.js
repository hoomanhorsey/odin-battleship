import {
  makeGrid,
  positionCheckArray,
  checkMoveLegal,
  checkClear,
  placeShipOnBoard,
} from "./helpers.js";

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
    } else {
      return false;
    }
  }
}

class Gameboard {
  boardArray = makeGrid();

  // constructor(player) {
  //   this.player = player;
  // }
  ships = {
    carrier: new Ship("carrier", 5),
    battleship: new Ship("battleship", 4),
    destroyer: new Ship("destroyer", 3),
    submarine: new Ship("submarine", 3),
    patrolBoat: new Ship("patrolBoat", 2),
  };

  shipSunkStatus = [
    { carrier: false },
    { battleship: false },
    { destroyer: false },
    { submarine: false },
    { patrolBoat: false },
  ];

  placeShip(column, row, direction, shipType) {
    let ship = this.ships[shipType];

    // create array of proposed position for testing
    const proposedPosition = positionCheckArray(
      this.boardArray,
      column,
      row,
      direction,
      ship
    );
    // check boundaries + collisons with other ships
    if (
      checkMoveLegal(row, column, direction, ship) &&
      checkClear(proposedPosition)
    ) {
      // place ship
      placeShipOnBoard(this.boardArray, column, row, direction, ship);
    } else {
      console.log("position is not legal or collisions");
      return;
    }
  }

  receiveAttack(column, row) {
    // updates gameBoard with a miss
    if (this.boardArray[column][row].ship === null) {
      this.boardArray[column][row].missed = true;
    }
    // duplicate hit
    else if (this.boardArray[column][row].hit === true) {
      console.log("already been hit, not a legal move");
      return;
    }
    // updates gameBoard with hit as well as ship
    else {
      this.boardArray[column][row].hit = true;
      this.ships[this.boardArray[column][row].ship].hit();
    }
  }

  checkSunk() {
    let sunkCounter = 0;
    const sunkShips = [];

    // create array of sunk ships, in case you want to call them for any reason
    for (const ship in this.ships) {
      if (this.ships[ship].isSunk()) {
        sunkShips.push(this.ships[ship]);
        sunkCounter++;
      }
    }
    // tally the number of ships sunk
    if (sunkCounter === 5) {
      console.log("all ships sunk");
    }
    // advise if all ships are sunk
    else {
      console.log(sunkCounter + " of 5 ships sunk");
    }
    console.log(sunkShips);
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new Gameboard(name);
  }
}

export { Ship, Gameboard, Player };
