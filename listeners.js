function playerOwnGridListener(player, players) {
  const gridSquares = document.querySelectorAll(`.gridSquare_${player.name}`);
  gridSquares.forEach((e) => {
    e.addEventListener("click", (event) => {
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
    });
  });
}

function playerOwnGridListenerAndRemove(player, players) {
  const gridSquares = document.querySelectorAll(`.gridSquare_${player.name}`);
  const gridClickHandler = (event) => {
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

  // return functino to remove listeners
  return function removeGridClickHandlerListener() {
    gridSquares.forEach((e) => {
      e.removeEventListener("click", gridClickHandler);
    });
  };
}

export { playerOwnGridListener, playerOwnGridListenerAndRemove };
