import { updateGameMoveStatus } from "./display.js";
import { gameLoop } from "./index.js";

import {
  gameBoardEventHandlersDetach,
  removeShipClickListener,
} from "./eventHandling.js";

function interpretAttackResult(result) {
  if (result === "miss") {
    return { text: "miss", class: "squareMiss" };
  } else if (result.ship !== null) {
    return { text: result.ship, class: "squareHit" };
  }
  return null;
}

// let clickToStartGameHandler;
// let gameMoveStatus;

// Create a handler factory
function createStartGameClickHandler(players, gameMoveStatus) {
  return function handleStartGameClick(event) {
    gameLoop(players); // Use the specific `players` object
    gameMoveStatus.removeEventListener("click", handleStartGameClick);
    console.log("gameMoveStatus removed ");
    // remove gameBoard event handlers
    gameBoardEventHandlersDetach();
    // remove ship click on pivot listeners
    removeShipClickListener();
  };
}

function setUpGameStartListener(players) {
  const gameMoveStatus = document.querySelector(".gameMoveStatus");

  // Create a handler with the specific `players`
  const startGameClickHandler = createStartGameClickHandler(
    players,
    gameMoveStatus
  );
  console.log("all ships placed");
  updateGameMoveStatus("shipsPlaced");
  gameMoveStatus.addEventListener("click", startGameClickHandler);
}

export {
  interpretAttackResult,
  setUpGameStartListener,
  // startGameClickHandler,
};
