function interpretAttackResult(result) {
  if (result === "miss") {
    return { text: "miss", class: "squareMiss" };
  } else if (result.ship !== null) {
    return { text: result.ship, class: "squareHit" };
  }
  return null;
}

function shipBlocksInPlace(players) {
  console.log(players);

  let counter = 0;
  for (const key in players["playerOne"].gameBoard.ships) {
    if (players["playerOne"].gameBoard.ships[key]["placed"]) {
      counter++;
    }
  }
  return counter === 5;
}

export { interpretAttackResult, shipBlocksInPlace };
