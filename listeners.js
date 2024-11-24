// function playerOwnGridListener(player, players) {
//   const gridSquares = document.querySelectorAll(`.gridSquare_${player.name}`);
//   gridSquares.forEach((e) => {
//     e.addEventListener("click", (event) => {
//       console.log(event.target);
//       let row = parseInt(event.target.dataset.row);
//       let column = parseInt(event.target.dataset.column);
//       console.log(
//         event.target.dataset.row +
//           event.target.dataset.column +
//           players[player.name].name +
//           players[player.name].gameBoard.boardArray[row][column].ship
//       );
//       console.log(players[player.name].gameBoard.boardArray[row][column]);
//     });
//   });
// }

function targetListener(attackingPlayer, defendingPlayer) {
  const gridSquares = document.querySelectorAll(
    `.gridSquare_${defendingPlayer.name}`
  );

  const gridTargetHandler = (event) => {
    removeActiveGridSquareHighlight();
    event.target.classList.add("activeGridSquare");
  };

  gridSquares.forEach((e) => {
    e.addEventListener("mouseover", gridTargetHandler);
  });

  // return function to remove listeners
  return function removeTargetListener() {
    console.log("remove  target listener called");
    gridSquares.forEach((e) => {
      e.removeEventListener("mouseover", gridTargetHandler);
    });
  };
}

function attackListener(
  attackingPlayer,
  defendingPlayer,
  removeTargetListener
) {
  const gridSquares = document.querySelectorAll(
    `.gridSquare_${defendingPlayer.name}`
  );

  const gridAttackHandler = (event) => {
    // removeActiveGridSquareHighlight();
    // event.target.classList.add("activeGridSquare");
    console.log(event.target);
    console.log("ATTACK ATTACK!");

    console.log("you actually want to call receive Attack at this point.");
    console.log("then you want to call the removeAttack Listener");
    removeTargetListener();
    removeAttackListener();
  };

  gridSquares.forEach((e) => {
    e.addEventListener("click", gridAttackHandler);
  });

  // function to remove listeners
  function removeAttackListener() {
    console.log("remove attack listener called");

    gridSquares.forEach((e) => {
      e.removeEventListener("click", gridAttackHandler);
    });
  }
}
/////////////////////////////////
////ABANDON HOPE ALL WHO PAST BEYOND HERE
//////////////////////////////////

function playerOtherGridListenerAndRemove(player, players) {
  const gridSquares = document.querySelectorAll(`.gridSquare_${player.name}`);

  const gridClickHandler = (event) => {
    removeActiveGridSquareHighlight();
    event.target.classList.add("activeGridSquare");

    console.log(event.target);
    let row = parseInt(event.target.dataset.row);
    let column = parseInt(event.target.dataset.column);
    console.log(
      event.target.dataset.row +
        event.target.dataset.column +
        players[player.name].name +
        players[player.name].gameBoard.boardArray[row][column].ship
    );
    console.log(players[player.name].gameBoard.boardArray[row][column]);
  };

  gridSquares.forEach((e) => {
    e.addEventListener("click", gridClickHandler);
  });

  // return function to remove listeners
  return function removeGridClickHandlerListener() {
    gridSquares.forEach((e) => {
      e.removeEventListener("click", gridClickHandler);
    });
  };
}

function playerOwnGridListenerAndRemove(player, players) {
  const gridSquares = document.querySelectorAll(`.gridSquare_${player.name}`);

  const gridClickHandler = (event) => {
    removeActiveGridSquareHighlight();
    event.target.classList.add("activeGridSquare");

    console.log(event.target);
    let row = parseInt(event.target.dataset.row);
    let column = parseInt(event.target.dataset.column);
    console.log(
      event.target.dataset.row +
        event.target.dataset.column +
        players[player.name].name +
        players[player.name].gameBoard.boardArray[row][column].ship
    );
    console.log(players[player.name].gameBoard.boardArray[row][column]);
  };

  gridSquares.forEach((e) => {
    e.addEventListener("click", gridClickHandler);
  });

  // return function to remove listeners
  return function removeGridClickHandlerListener() {
    gridSquares.forEach((e) => {
      e.removeEventListener("click", gridClickHandler);
    });
  };
}

function removeActiveGridSquareHighlight() {
  if (document.querySelector(".activeGridSquare")) {
    console.log(document.querySelector(".activeGridSquare"));
    const activeGridSquare = document.querySelector(".activeGridSquare");
    activeGridSquare.classList.remove("activeGridSquare");
  } else {
    return;
  }
}
export {
  playerOwnGridListenerAndRemove,
  playerOtherGridListenerAndRemove,
  targetListener,
  attackListener,
};
