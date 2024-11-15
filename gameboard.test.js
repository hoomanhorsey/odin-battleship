import { Gameboard } from "./gameboard.js";

// test("Gameboard", () => {
//   expect(new Gameboard("andrew")).toEqual({
//     boardArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     player: "andrew",
//   });
// });
// test("gameboard stuff", () => {
//   const andrewBoard = new Gameboard("andrew");
//   expect(andrewBoard.boardArray).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
// });

test("Gameboard called, creates 2D array /grid of 10 x 10 ", () => {
  const andrewBoard = new Gameboard("andrew");
  expect(andrewBoard.boardArray[0].length).toBe(10);
  expect(andrewBoard.boardArray.length).toBe(10);
});

test("Gameboard placeShip,", () => {
  const andrewBoard = new Gameboard("andrew");
  expect(andrewBoard.receiveAttack(0, 0)).toBe();
});

test("Gameboard receiveAttack,", () => {
  const andrewBoard = new Gameboard("andrew");
  expect(andrewBoard.receiveAttack(0, 0)).toBe();
});
