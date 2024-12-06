function interpretAttackResult(result) {
  if (result === "miss") {
    return { text: "miss", class: "gridSquareMiss" };
  } else if (result.ship !== null) {
    return { text: result.ship, class: "gridSquareHit" };
  }
  return null;
}

export { interpretAttackResult };
