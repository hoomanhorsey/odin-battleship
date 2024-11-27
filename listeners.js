function targetListener(attackingPlayer, defendingPlayer) {
  // [TODO - attacking player possibly redundant]

  const moveStatus = document.querySelector(".moveStatus");
  moveStatus.textContent = "Your move. Move cursor to target, click to attack!";

  const gridSquares = document.querySelectorAll(
    `.gridSquare_${defendingPlayer.name}`
  );

  const gridTargetHandler = (event) => {
    removeActiveGridSquareHighlight();
    event.target.classList.add("gridSquareActive");
  };

  gridSquares.forEach((e) => {
    console.log("target listener called");

    e.addEventListener("mouseover", gridTargetHandler);
  });

  // return function to remove listeners
  const removeTargetListener = () => {
    console.log("remove  target listener called");
    gridSquares.forEach((e) => {
      e.removeEventListener("mouseover", gridTargetHandler);
    });
  };
  return removeTargetListener;
}

function attackListener(
  attackingPlayer, // [TODO - possibly redundant]
  defendingPlayer,
  players,
  removeTargetListener,
  computerMove
) {
  const gridSquares = document.querySelectorAll(
    `.gridSquare_${defendingPlayer.name}`
  );

  // callback function for listener
  const gridAttackHandler = (event) => {
    // dupeGridSquareCheck
    if (
      dupeGridSquareCheck(
        players,
        players["playerTwo"],
        event.target.id[10],
        event.target.id[12]
      ) === false
    ) {
      alert("already been clicked");
      return;
    } else {
      removeTargetListener();
      removeAttackListener();

      let attackResult = defendingPlayer.gameBoard.receiveAttack(
        event.target.dataset.row,
        event.target.dataset.column
      );
      updateGridSquare(attackResult, event.target);

      if (
        !attackingPlayer.gameBoard.checkSunk() &&
        !defendingPlayer.gameBoard.checkSunk()
      ) {
        console.log("ships afloat");
        computerMove();
      }
    }
  };

  // assign listener
  gridSquares.forEach((e) => {
    e.addEventListener("click", gridAttackHandler);
  });

  // function to remove attack listener
  const removeAttackListener = () => {
    console.log("remove attack listener called");
    gridSquares.forEach((e) => {
      e.removeEventListener("click", gridAttackHandler);
    });
  };
}

function updateGridSquare(result, eventTarget) {
  if (result === "miss") {
    eventTarget.textContent = result;

    eventTarget.classList.add("gridSquareMiss");
    removeActiveGridSquareHighlight();
  } else if (result.ship !== null) {
    eventTarget.textContent = result.ship;

    removeActiveGridSquareHighlight();
    console.log(result.ship);
    eventTarget.classList.add("gridSquareHit");
  }
}

function removeActiveGridSquareHighlight() {
  if (document.querySelector(".gridSquareActive")) {
    // console.log(document.querySelector(".gridSquareActive"));
    const gridSquareActive = document.querySelector(".gridSquareActive");
    gridSquareActive.classList.remove("gridSquareActive");
  } else {
    return;
  }
}

function dupeGridSquareCheck(players, player, row, column) {
  let shipObject = player.gameBoard.boardArray[row][column];
  // console.log(players["playerTwo"].gameBoard.boardArray[row][column]);
  // console.log(shipObject.missed);
  if (shipObject.hit === true || shipObject.missed === true) {
    console.log("already hit, dont count this one");
    return false;
  }
  // console.log(players["playerOne"].gameBoard.boardArray);
}

export {
  targetListener,
  attackListener,
  removeActiveGridSquareHighlight,
  updateGridSquare,
  dupeGridSquareCheck,
};
