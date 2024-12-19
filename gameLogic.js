function interpretAttackResult(result) {
  if (result === "miss") {
    return { text: "miss", class: "squareMiss" };
  } else if (result.ship !== null) {
    return { text: result.ship, class: "squareHit" };
  }
  return null;
}

export { interpretAttackResult };
