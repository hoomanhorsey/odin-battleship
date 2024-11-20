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
    carrier: new Ship("carrier", 5),
    battleship: new Ship("battleship", 4),
    destroyer: new Ship("destroyer", 3),
    submarine: new Ship("submarine", 3),
    patrolBoat: new Ship("patrolBoat", 2),
  };
  constructor(player) {
    this.player = player;
  }

  shipSunkStatus = [
    { carrier: false },
    { battleship: false },
    { destroyer: false },
    { submarine: false },
    { patrolBoat: false },
  ];

  placeShip(column, row, direction, shipType) {
    // const ship = this.createShip(shipType);

    let ship = this.ships[shipType];

    // create array of proposed position for testing
    const proposedPosition = createProposedPositionArray(
      this.boardArray,
      column,
      row,
      direction,
      ship
    );

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

  // createShip(shipType) {
  //   switch (shipType) {
  //     case "carrier":
  //       return new Ship("carrier", 5);
  //     case "battleship":
  //       return new Ship("battleship", 4);
  //     case "destroyer":
  //       return new Ship("destroyer", 3);
  //     case "submarmine":
  //       return new Ship("submarine", 3);
  //     case "patrolboat":
  //       return new Ship("patrolboat", 2);
  //     default:
  //       return error;
  //   }
  // }

  receiveAttack(column, row) {
    // determines whether co-ords hit a ship

    //checks if co-ord hits

    if (this.boardArray[column][row].ship === null) {
      this.boardArray[column][row].missed = true;
    } else if (this.boardArray[column][row].hit === true) {
      console.log("already been hit, not a legal move");
      return;
    } else {
      this.boardArray[column][row].hit = true;
      let shipType = this.boardArray[column][row].ship;
      console.log("shipType", shipType);

      this.ships[shipType].hit();
    }
    // --if hit, updates gameboard with hit
    //        -- updates ship that is hit
    // if misses, updates gameboard with miss.
  }

  checkSunk() {
    // name the ship that is sunk
    // tally the number of ships sunk
    // advise if all ships are sunk
    let sunkCounter = 0;
    for (const ship in this.ships) {
      if (this.ships[ship].isSunk()) {
        sunkCounter++;
      }
      console.log(this.ships[ship].isSunk());
      /// include 1 for testing, TODO should be 5
      if (sunkCounter === 5) {
        console.log("all ships sunk");
      } else {
        console.log(sunkCounter + " of 5 ships sunk");
      }
    }

    // const ships = Object.entries(this.ships);
    // let sunkShipsCounter = 0;
    // ships.forEach((ship) => tallySunk(sunkShipsCounter, ship));
  }
}

function tallySunk(sunkShipsCounter, ship) {
  if (ship.isSunk()) {
    sunkShipsCounter += 1;
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
  return array.every((value) => value.ship === null);
}

function placeShipOnBoard(boardArray, column, row, direction, ship) {
  switch (direction) {
    case "up":
      for (let i = row; i > 0; i--) {
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
      for (let i = column; i < column + ship.length + 1; i++) {
        boardArray[row][i].ship = ship.type;
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
      tempArray[row].push({ ship: null, hit: false, missed: false });
    }
  }
  return tempArray;
}

export { Ship, Gameboard };
