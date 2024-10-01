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
function GameController() {
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");
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

  const getActivePlayer = () => activePlayer;

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

  const playRound = (index) => {
    if (!gameover) {
      let valid = Gameboard.updateBoard(index, activePlayer.token);

      if (valid) {
        Gameboard.printBoard();
        checkGameOver(activePlayer);
        switchActivePlayer();
      }
    }
  };

  return { playRound, getActivePlayer };
}

// IIFE to control the display of the UI
const DisplayController = (function () {
  const game = GameController();
  const boardDiv = document.querySelector(".board");
  const playerDiv = document.querySelector(".player");

  const updateScreen = () => {
    const board = Gameboard.getBoard();
    boardDiv.innerHTML = "";

    const activePlayer = game.getActivePlayer();
    playerDiv.textContent = `${activePlayer.name}'s turn`;

    board.forEach((token, index) => {
      const cell = document.createElement("div");
      cell.textContent = token;
      cell.classList.add("cell");
      cell.id = index;
      boardDiv.appendChild(cell);
    });
  };

  boardDiv.addEventListener("click", (event) => {
    const index = event.target.id;
    game.playRound(index);
    updateScreen();
  });

  updateScreen();
})();
