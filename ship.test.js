import { Ship } from "./ship.js";

test("Ship class constructor, 'destroyer, 3 becomes object 'name': destroyer, 'length': 3, 'hits': 0, 'sunk': false", () => {
  expect(new Ship("destroyer", 3)).toEqual({
    name: "destroyer",
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
