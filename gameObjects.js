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

  ships = {
    C: new Ship("C", 5),
    B: new Ship("B", 4),
    D: new Ship("D", 3),
    S: new Ship("S", 3),
    P: new Ship("P", 2),
  };

  shipSunkStatus = [
    { C: false },
    { B: false },
    { D: false },
    { S: false },
    { P: false },
  ];

  placeShip(row, column, direction, shipType, player) {
    row = parseInt(row);
    column = parseInt(column);
    let ship = this.ships[shipType];

    // create array of proposed position for testing
    const proposedPosition = positionCheckArray(
      this.boardArray,
      row,
      column,
      direction,
      ship
    );
    // check boundaries + collisons with other ships

    if (checkMoveLegal(row, column, direction, ship)) {
      ("checkMoveLegal is true");
    } else {
      console.log("position is not legal ");
      return;
    }
    if (checkClear(proposedPosition)) {
      console.log("checkClear is true");
    } else {
      console.log("position is has collisions");
      return;
    }

    if (player.name === "playerOne") {
      if (prompt("Are you happy with position? Y or N") === "Y") {
        placeShipOnBoard(this.boardArray, row, column, direction, ship);
      } else {
        return;
      }
    } else {
      placeShipOnBoard(this.boardArray, row, column, direction, ship);
    }
    // if (prompt("Are you happy with position? Y or N") === "Y") {
    //   // place ship
    //   console.log(this.boardArray);
    //   placeShipOnBoard(this.boardArray, row, column, direction, ship);
    // }
  }

  // // check boundaries + collisons with other ships
  // if (
  //   checkMoveLegal(row, column, direction, ship) &&
  //   checkClear(proposedPosition)
  // ) {
  //   // place ship
  //   console.log(this.boardArray);
  //   placeShipOnBoard(this.boardArray, row, column, direction, ship);
  // } else {
  //   console.log("position is not legal or collisions");
  //   return;
  // }

  // // check boundaries + collisons with other ships
  // if (
  //   checkMoveLegal(row, column, direction, ship)
  // ) {'checkMoveLegal is true'}  else {
  //   console.log("position is not legal ");
  //   return;
  // }
  //   if (
  //   checkClear(proposedPosition)) {
  //     console.log('checkClear is true');

  //   } else {
  //     console.log("position is has collisions");
  //   return;
  //   }

  //   // place ship
  //   console.log(this.boardArray);
  //   placeShipOnBoard(this.boardArray, row, column, direction, ship);
  // } else {
  //   console.log("position is not legal or collisions");
  //   return;
  // }

  receiveAttack(row, column) {
    // updates gameBoard with a miss

    console.log("receiveAttack called");

    if (this.boardArray[row][column].ship === null) {
      this.boardArray[row][column].missed = true;
      return "miss";
    }
    // duplicate hit//TODO, need to also include if it's been missed
    else if (this.boardArray[row][column].hit === true) {
      console.log("already been hit, not a legal move");
      return "illegalMove";
    }
    // updates gameBoard with hit as well as ship
    else {
      this.boardArray[row][column].hit = true;
      this.ships[this.boardArray[row][column].ship].hit();

      return this.boardArray[row][column];
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
      return true;
    }
    // advise if all ships are sunk
    else {
      // console.log(sunkCounter + " of 5 ships sunk");
      return false;
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
