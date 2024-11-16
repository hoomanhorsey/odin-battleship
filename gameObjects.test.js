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

// test("lkj", () => {
//   expect(new Ship("destroyer", 3)).toEqual({
//     name: "destroyer",
//     length: 3,
//     hits: 0,
//     sunk: false,
//   });
// });

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

test("Gameboard placeShip, places ship on board. Places ship in array[0][0], position is 'x' ", () => {
  const andrewBoard = new Gameboard("andrew");
  let down = 0;
  andrewBoard.placeShip(0, 0, down, "carrier");
  expect(andrewBoard.boardArray[0][0]).toBe("X");
});

test("Gameboard receiveAttack,", () => {
  const andrewBoard = new Gameboard("andrew");
  expect(andrewBoard.receiveAttack(0, 0)).toBe();
});
