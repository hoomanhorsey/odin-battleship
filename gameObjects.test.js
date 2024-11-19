import { Ship, Gameboard } from "./gameObjects.js";

test("Ship class constructor, 'destroyer, 3 becomes object 'name': destroyer, 'length': 3, 'hits': 0, 'sunk': false", () => {
  expect(new Ship("destroyer", 3)).toEqual({
    type: "destroyer",
    length: 3,
    hits: 0,
    sunk: false,
  });
});

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

test("Gameboard createShip, creates new Ship carrier and then a ship with carrier type is created,", () => {
  const andrewBoard = new Gameboard("andrew");
  const carrier = andrewBoard.createShip("carrier");
  expect(carrier.type).toBe("carrier");
});

// test("#47 Gameboard placeShip, Top Left, places ship on board. Places ship in array[1][1] up, position in [1][1]is '0' as move not legal ", () => {
//   const andrewBoard = new Gameboard("andrew");
//   let direction = "up";
//   andrewBoard.placeShip(1, 1, direction, "carrier");
//   expect(andrewBoard.boardArray[1][1]).toBe(0);
// });

// test("#47 Gameboard placeShip, Top Left, places ship on board. Places ship in array[1][1] left, position in [1][1]is '0' as move not legal ", () => {
//   const andrewBoard = new Gameboard("andrew");
//   let direction = "left";
//   andrewBoard.placeShip(1, 1, direction, "carrier");
//   expect(andrewBoard.boardArray[4][4]).toBe(0);
// });

// test("#54 Gameboard placeShip, places ship on board. Places ship in array[0][0] down, position in [0][0]is 'carrier' ", () => {
//   const andrewBoard = new Gameboard("andrew");
//   let direction = "down";
//   andrewBoard.placeShip(4, 4, direction, "carrier");
//   expect(andrewBoard.boardArray[4][4]).toBe("carrier");
// });

// test("#54 Gameboard placeShip, places ship on board. Places ship in array[0][0] up, position in [0][0]is 'carrier' ", () => {
//   const andrewBoard = new Gameboard("andrew");
//   let direction = "up";
//   andrewBoard.placeShip(5, 5, direction, "carrier");
//   expect(andrewBoard.boardArray[5][5]).toBe("carrier");
// });

// test("#61 Gameboard placeShip, places ship on board. Places ship in array[2][0], position [2][0]is 'carrier' ", () => {
//   const andrewBoard = new Gameboard("andrew");
//   let direction = "down";
//   andrewBoard.placeShip(2, 0, direction, "carrier");
//   expect(andrewBoard.boardArray[0][2]).toBe("carrier");
// });

// test("Gameboard placeShip, places ship on board. Places ship in array[9][5], position [9][5] is 'carrier' ", () => {
//   const andrewBoard = new Gameboard("andrew");
//   let direction = "up";
//   andrewBoard.placeShip(9, 5, direction, "carrier");
//   expect(andrewBoard.boardArray[5][9]).toBe("carrier");
// });

// test("Gameboard placeShip, places ship on board. Places ship in array[0][1], position [0][1] is 'carrier' ", () => {
//   const andrewBoard = new Gameboard("andrew");
//   let direction = "right";
//   andrewBoard.placeShip(2, 1, direction, "carrier");
//   expect(andrewBoard.boardArray[1][2]).toBe("carrier");
// });

test("Gameboard placeShip, places ship on board. Places ship in array[5][5], position is [5][5] is 'carrier' ", () => {
  const andrewBoard = new Gameboard("andrew");
  let direction = "left";
  andrewBoard.placeShip(5, 5, direction, "carrier");
  expect(andrewBoard.boardArray[5][5]).toBe("carrier");
});

test("Gameboard placeShip, places ships on board. Places ship in array[5][5], position is [5][5] is 'carrier' ", () => {
  const andrewBoard = new Gameboard("andrew");
  let directionA = "left";
  let directionB = "down";
  andrewBoard.placeShip(5, 5, directionA, "carrier");
  andrewBoard.placeShip(3, 3, directionB, "destroyer");
  expect(andrewBoard.boardArray[5][5]).toBe("carrier");
});

// test("#89 Gameboard placeShip, places ship on board. Places ship in array[9][9], position is [9][9] is '0' as move is not legal ", () => {
//   const andrewBoard = new Gameboard("andrew");
//   let direction = "right";
//   andrewBoard.placeShip(9, 9, direction, "carrier");
//   expect(andrewBoard.boardArray[9][9]).toBe(0);
// });

// test("#96 Gameboard placeShip, places ship on board. Places ship in array[9][9] left, position is [9][9] is 'carrier' ", () => {
//   const andrewBoard = new Gameboard("andrew");
//   let direction = "left";
//   andrewBoard.placeShip(9, 9, direction, "carrier");
//   expect(andrewBoard.boardArray[9][9]).toBe("carrier");
// });

test("Gameboard receiveAttack,", () => {
  const andrewBoard = new Gameboard("andrew");
  expect(andrewBoard.receiveAttack(0, 0)).toBe();
});
