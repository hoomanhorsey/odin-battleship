import { Ship, Gameboard, Player } from "./gameObjects.js";

// test("Ship class constructor, 'destroyer, 3 becomes object 'name': destroyer, 'length': 3, 'hits': 0, 'sunk': false", () => {
//   expect(new Ship("destroyer", 3)).toEqual({
//     type: "destroyer",
//     length: 3,
//     hits: 0,
//     sunk: false,
//   });
// });

test("Ship instance, destroyer.hit() once to make hits = 1", () => {
  const destroyer = new Ship("destroyer", 3);
  destroyer.hit();
  expect(destroyer.hits).toBe(1);
});

test("Ship instance, destroyer.hit() x 3 make sunk = true", () => {
  const destroyer = new Ship("destroyer", 3);
  destroyer.hit();
  destroyer.hit();
  destroyer.hit();

  expect(destroyer.sunk).toBe(true);
});
test("Ship instance, destroyer.hit() x 4, return value 'Already sunk'", () => {
  const destroyer = new Ship("destroyer", 3);
  destroyer.hit();
  destroyer.hit();
  destroyer.hit();
  destroyer.hit();
  expect(destroyer.hit()).toBe("Already sunk");
});

test("Gameboard called, creates 2D array/grid of 10 x 10 ", () => {
  const andrewBoard = new Gameboard("andrew");
  expect(andrewBoard.boardArray[0].length).toBe(10);
  expect(andrewBoard.boardArray.length).toBe(10);
});

test("#47 Gameboard placeShip, Top Left, places ship on board. Places ship in array[1][1] up, position in [1][1]is '0' as move not legal ", () => {
  const andrewBoard = new Gameboard("andrew");
  let orientation = "up";
  andrewBoard.placeShip(1, 1, orientation, "carrier");
  expect(andrewBoard.boardArray[1][1].ship).toBe(null);
});

test("#47 Gameboard placeShip, Top Left, places ship on board. Places ship in array[1][1] left, position in [1][1]is '0' as move not legal ", () => {
  const andrewBoard = new Gameboard("andrew");
  let orientation = "left";
  andrewBoard.placeShip(1, 1, orientation, "carrier");
  expect(andrewBoard.boardArray[4][4].ship).toBe(null);
});

test("#54 Gameboard placeShip, places ship on board. Places ship in array[0][0] vertical, position in [0][0]is 'carrier' ", () => {
  const andrewBoard = new Gameboard("andrew");
  let orientation = "vertical";
  andrewBoard.placeShip(4, 4, orientation, "carrier");
  expect(andrewBoard.boardArray[4][4].ship).toBe("carrier");
});

test("#54 Gameboard placeShip, places ship on board. Places ship in array[0][0] up, position in [0][0]is 'carrier' ", () => {
  const andrewBoard = new Gameboard("andrew");
  let orientation = "up";
  andrewBoard.placeShip(5, 5, orientation, "carrier");
  expect(andrewBoard.boardArray[5][5].ship).toBe("carrier");
});

test("#61 Gameboard placeShip, places ship on board. Places ship in array[2][0], position [2][0]is 'carrier' ", () => {
  const andrewBoard = new Gameboard("andrew");
  let orientation = "vertical";
  andrewBoard.placeShip(2, 0, orientation, "carrier");
  expect(andrewBoard.boardArray[0][2].ship).toBe("carrier");
});

test("Gameboard placeShip, places ship on board. Places ship in array[9][5], position [9][5] is 'carrier' ", () => {
  const andrewBoard = new Gameboard("andrew");
  let orientation = "up";
  andrewBoard.placeShip(9, 5, orientation, "carrier");
  expect(andrewBoard.boardArray[5][9].ship).toBe("carrier");
});

test("Gameboard placeShip, places ship on board. Places ship in array[0][1], position [0][1] is 'carrier' ", () => {
  const andrewBoard = new Gameboard("andrew");
  let orientation = "horizontal";
  andrewBoard.placeShip(2, 1, orientation, "carrier");
  expect(andrewBoard.boardArray[1][2].ship).toBe("carrier");
});

test("Gameboard placeShip, places ship on board. Places ship in array[5][5], position is [5][5] is 'carrier' ", () => {
  const andrewBoard = new Gameboard("andrew");
  let orientation = "left";
  andrewBoard.placeShip(5, 5, orientation, "carrier");
  expect(andrewBoard.boardArray[5][5].ship).toBe("carrier");
});

test("Gameboard placeShip, places ships on board. Places ship in array[5][5], position is [5][5] is 'carrier' ", () => {
  const andrewBoard = new Gameboard("andrew");
  let orientationA = "left";
  let orientationB = "vertical";
  andrewBoard.placeShip(5, 5, orientationA, "carrier");
  andrewBoard.placeShip(3, 3, orientationB, "destroyer");
  expect(andrewBoard.boardArray[5][5].ship).toBe("carrier");
});

test("#89 Gameboard placeShip, places ship on board. Places ship in array[9][9], position is [9][9] is '0' as move is not legal ", () => {
  const andrewBoard = new Gameboard("andrew");
  let orientation = "horizontal";
  andrewBoard.placeShip(9, 9, orientation, "carrier");
  expect(andrewBoard.boardArray[9][9].ship).toBe(null);
});

test("#96 Gameboard placeShip, places ship on board. Places ship in array[9][9] left, position is [9][9] is 'carrier' ", () => {
  const andrewBoard = new Gameboard("andrew");
  let orientation = "left";
  andrewBoard.placeShip(9, 9, orientation, "carrier");
  expect(andrewBoard.boardArray[9][9].ship).toBe("carrier");
});

test("Gameboard receiveAttack,", () => {
  const andrewBoard = new Gameboard("andrew");
  let orientation = "horizontal";
  andrewBoard.placeShip(1, 1, orientation, "carrier");
  andrewBoard.receiveAttack(0, 0);
  andrewBoard.receiveAttack(1, 1);
  andrewBoard.receiveAttack(1, 2);
  andrewBoard.receiveAttack(1, 3);

  expect(andrewBoard.boardArray[0][0].ship).toBe(null);
  expect(andrewBoard.boardArray[1][1].ship).toBe("carrier");
  expect(andrewBoard.boardArray[1][1].hit).toBe(true);
  expect(andrewBoard.ships["carrier"].hits).toBe(3);
});

test("test checkSunk", () => {
  const andrewBoard = new Gameboard("andrew");
  let orientation = "horizontal";
  andrewBoard.placeShip(1, 1, orientation, "patrolBoat");
  andrewBoard.receiveAttack(1, 1);
  andrewBoard.receiveAttack(1, 2);

  andrewBoard.checkSunk();

  expect(andrewBoard.boardArray[0][0].ship).toBe(null);
  expect(andrewBoard.boardArray[1][1].ship).toBe("patrolBoat");
  expect(andrewBoard.ships["patrolBoat"].hits).toBe(2);

  expect(andrewBoard.ships["patrolBoat"].isSunk()).toBe(true);
});

test("playerConstruction", () => {
  const playerOne = new Player("playerOne");
  expect(playerOne.gameBoard.ships["carrier"].hits).toBe(0);
});

test("Objects in DOM validation", () => {
  const playerOne = new Player("playerOne");
  const playerTwo = new Player("playerTwo");

  const players = {
    playerOne: new Player("playerOne"),
    playerTwo: new Player("playerTwo"),
  };

  players["playerOne"].gameBoard.placeShip(0, 0, "vertical", "carrier");
  players["playerOne"].gameBoard.placeShip(5, 5, "up", "destroyer");
  players["playerOne"].gameBoard.placeShip(9, 9, "up", "battleship");
  players["playerOne"].gameBoard.placeShip(4, 7, "vertical", "patrolBoat");
  players["playerOne"].gameBoard.placeShip(0, 6, "horizontal", "submarine");

  players["playerTwo"].gameBoard.placeShip(5, 5, "left", "destroyer");
  players["playerTwo"].gameBoard.placeShip(9, 9, "left", "battleship");
  players["playerTwo"].gameBoard.placeShip(4, 7, "left", "patrolBoat");
  players["playerTwo"].gameBoard.placeShip(0, 6, "horizontal", "submarine");
  players["playerTwo"].gameBoard.placeShip(0, 0, "vertical", "carrier");

  expect(players["playerTwo"].gameBoard.boardArray[7][4]).toEqual({
    hit: false,
    missed: false,
    ship: "patrolBoat",
  });
  expect(players["playerTwo"].gameBoard.boardArray[7][3]).toEqual({
    hit: false,
    missed: false,
    ship: "patrolBat",
  });

  // expect(players["playerTwo"].gameBoard.boardArray[7][3]).toBe("bah");
});
