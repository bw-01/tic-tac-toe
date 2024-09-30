// IIFE for the Gameboard
const Gameboard = (function () {
  let boardState = Array(9).fill(" ");

  const getBoard = () => boardState;

  const updateBoard = (index, playerToken) => {
    if (boardState[index] !== " ") {
      console.log("Cell already occupied.");
      return false;
    } else {
      boardState[index] = playerToken;
      return true;
    }
  };

  const boardFull = () => {
    return !boardState.includes(" ");
  };

  // Print the board state to the console
  const printBoard = () => {
    console.log(boardState.slice(0, 3));
    console.log(boardState.slice(3, 6));
    console.log(boardState.slice(6, 9));
  };

  const resetBoard = () => {
    boardState = Array(9).fill(" ");
  };

  return { getBoard, updateBoard, boardFull, printBoard, resetBoard };
})();

// Factory function to create the players
function Player(name, token) {
  return { name, token };
}

// Function to control the flow of the game
const GameController = (function () {
  const player1 = Player("Bob", "x");
  const player2 = Player("Sue", "o");
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let gameover = false;
  let activePlayer = player1;

  const switchActivePlayer = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };

  const checkGameOver = (activePlayer) => {
    const board = Gameboard.getBoard();

    for (let i = 0; i < winningLines.length; i++) {
      const line = winningLines[i];
      let playerWon = true;

      for (let j = 0; j < line.length; j++) {
        const boardIndex = line[j];

        if (board[boardIndex] != activePlayer.token) {
          playerWon = false;
          break;
        }
      }

      if (playerWon) {
        console.log(`${activePlayer.name} wins!!!`);
        gameover = true;
        return;
      }
    }

    if (!gameover && Gameboard.boardFull()) {
      console.log("It's a draw!");
      gameover = true;
    }
  };

  const playRound = () => {
    while (!gameover) {
      let index = -1;

      while (
        isNaN(index) ||
        index < 0 ||
        index > 8 ||
        !Gameboard.updateBoard(index, activePlayer.token)
      ) {
        const playerChoice = prompt(`${activePlayer.name}, please pick a cell from 1 to 9`);
        index = parseInt(playerChoice) - 1;
      }

      Gameboard.printBoard();
      checkGameOver(activePlayer);
      switchActivePlayer();
    }
  };

  playRound();

  return {playRound};
})();

// const game = GameController();
