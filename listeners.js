function targetListener(attackingPlayer, defendingPlayer) {
  const gridSquares = document.querySelectorAll(
    `.gridSquare_${defendingPlayer.name}`
  );

  const gridTargetHandler = (event) => {
    removeActiveGridSquareHighlight();
    event.target.classList.add("gridSquareActive");
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
  removeTargetListener,
  nextMove
) {
  const gridSquares = document.querySelectorAll(
    `.gridSquare_${defendingPlayer.name}`
  );

  const gridAttackHandler = (event) => {
    removeTargetListener();
    removeAttackListener();

    let attackResult = defendingPlayer.gameBoard.receiveAttack(
      event.target.dataset.row,
      event.target.dataset.column
    );
    updateGridSquare(attackResult, event.target);
    nextMove();
  };

  gridSquares.forEach((e) => {
    e.addEventListener("click", gridAttackHandler);
  });

  // function to remove attack listener
  function removeAttackListener() {
    console.log("remove attack listener called");
    gridSquares.forEach((e) => {
      e.removeEventListener("click", gridAttackHandler);
    });
  }
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
    console.log(document.querySelector(".gridSquareActive"));
    const gridSquareActive = document.querySelector(".gridSquareActive");
    gridSquareActive.classList.remove("gridSquareActive");
  } else {
    return;
  }
}

//////////////////////////////////
////ABANDON HOPE ALL WHO PAST BEYOND HERE
//////////////////////////////////
////////////////////////////////////
/////////
/////////
/////////
/////////
/////////
/////////

export {
  targetListener,
  attackListener,
  removeActiveGridSquareHighlight,
  updateGridSquare,
};
