class Gameboard {
  boardArray = makeGrid();
  missedAttacks = [];

  constructor(player) {
    this.player = player;
  }

  placeShip() {
    switch (expression) {
      case carrier:
        // code block
        break;
      case battleship:
        // code block
        break;
      case cruiser:
        // code block
        break;
      case submarmine:
        // code block
        break;
      case destroyer:
        // code block
        break;

      default:
      // code block
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
      tempArray[i].push([i, j]);
    }
  }
  return tempArray;
}
const board = new Gameboard("andrew");

export { Gameboard };
