class Ship {
  hits = 0;
  sunk = false;
  constructor(type, n) {
    this.name = type;
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

console.log(ship.name, ship.length, ship.hits, ship.sunk);
// Expected output: "destroyer"

export { Ship };
