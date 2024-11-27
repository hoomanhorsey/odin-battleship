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
    console.log(event.target.id);

    let shipObject =
      players["playerTwo"].gameBoard.boardArray[event.target.id[10]][
        event.target.id[12]
      ];

    console.log(
      players["playerTwo"].gameBoard.boardArray[event.target.id[10]][
        event.target.id[12]
      ]
    );

    console.log(shipObject.missed);

    if (shipObject.hit === true || shipObject.missed === true) {
      console.log("already hit, dont count this one");
      return false;
    }

    console.log(players["playerOne"].gameBoard.boardArray);

    // let shipObject =
    //   players["playerOne"].gameBoard.boardArray[gridSquareActive.id[10]][
    //     gridSquareActive.id[12]
    //   ];

    alert("put in check here, line 44 ");
    removeTargetListener();
    removeAttackListener();

    let attackResult = defendingPlayer.gameBoard.receiveAttack(
      event.target.dataset.row,
      event.target.dataset.column
    );
    updateGridSquare(attackResult, event.target);
    // nextMove();

    if (
      !attackingPlayer.gameBoard.checkSunk() &&
      !defendingPlayer.gameBoard.checkSunk()
    ) {
      console.log("ships afloat");
      computerMove();
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

export {
  targetListener,
  attackListener,
  removeActiveGridSquareHighlight,
  updateGridSquare,
};
