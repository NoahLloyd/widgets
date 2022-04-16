const columns = document.querySelectorAll(".column");
const text = document.getElementById("text");
const playAgain = document.getElementById("playAgain");
let player = "X";

playAgain.addEventListener("click", () => location.reload());

const newGame = () => {
  playAgain.classList.add("hidden");
  columns.forEach((column) => {
    column.addEventListener("click", () => {
      clickOnColumn(column);
    });
  });
};
newGame();

const clickOnColumn = (column) => {
  const nextPlayer = player === "X" ? "O" : "X";
  if (column.innerHTML === "&nbsp;") {
    column.innerHTML = player;
    column.classList.add('col-show')
    player = nextPlayer;
    text.innerText = `Your turn, player ${player}`;
    checkForWin();
  } else {
    text.innerText = "You cannot click there!";
  }
};
const checkForWin = () => {
  // Makes a 2d array of how the board looks
  let board = [];
  [0, 1, 2].forEach((row) => {
    const startIndex = row * 3;
    board = [
      ...board,
      [
        columns[startIndex].innerText,
        columns[startIndex + 1].innerText,
        columns[startIndex + 2].innerText,
      ],
    ];
  });
  xWin = checkBoard(board, "X");
  oWin = checkBoard(board, "O");
  if (xWin) {
    if (xWin === "tie") {
      handleTie();
    } else {
      handleWin("X");
    }
  }
  if (oWin) {
    if (oWin === "tie") {
      handleTie();
    } else {
      handleWin("O");
    }
  }
};

const checkBoard = (board, player) => {
  const player3 = player + player + player;
  // Checks if anyone won
  let winner = "";
  if (player3 === board[0][0] + board[1][0] + board[2][0]) winner = player;
  if (player3 === board[0][1] + board[1][1] + board[2][1]) winner = player;
  if (player3 === board[0][2] + board[1][2] + board[2][2]) winner = player;

  if (player3 === board[0][0] + board[0][1] + board[0][2]) winner = player;
  if (player3 === board[1][0] + board[1][1] + board[1][2]) winner = player;
  if (player3 === board[2][0] + board[2][1] + board[2][2]) winner = player;

  if (player3 === board[0][0] + board[1][1] + board[2][2]) winner = player;
  if (player3 === board[0][2] + board[1][1] + board[2][0]) winner = player;
  if (winner === player) {
  }
  let tie = true;
  board.forEach((row) => {
    row.forEach((col) => {
      if (col !== "X" && col !== "O") tie = false;
    });
  });
  if (winner === player) {
    return true;
  } else {
    return tie ? "tie" : false;
  }
};
const handleWin = (winner) => {
  text.innerText = `Congrats ${winner}!`;
  endOfGame()
};
const handleTie = () => {
  text.innerText = "It was a tie!";
  endOfGame()
};
const endOfGame = () => {
  playAgain.classList.remove("hidden");

  // Removes the event listeners from the boxes
  columns.forEach((column) => {
    copyCol = column.cloneNode(true);
    column.parentNode.replaceChild(copyCol, column);
  });
};
