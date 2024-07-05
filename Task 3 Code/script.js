const startMenu = document.getElementById("startMenu");
const gameContainer = document.getElementById("gameContainer");
const playAgainstPlayerButton = document.getElementById(
  "playAgainstPlayerButton"
);
const playAgainstComputerButton = document.getElementById(
  "playAgainstComputerButton"
);
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const restartButton = document.getElementById("restartButton");
const mainMenuButtonGame = document.getElementById("mainMenuButtonGame");
const winScreen = document.getElementById("winScreen");
const winMessage = document.getElementById("winMessage");
const mainMenuButtonWin = document.getElementById("mainMenuButtonWin");
const restartButtonWin = document.getElementById("restartButtonWin");

let currentPlayer = "X";
let boardState = Array(9).fill(null);
let isGameActive = false;
let isAgainstComputer = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

playAgainstPlayerButton.addEventListener("click", () => startGame(false));
playAgainstComputerButton.addEventListener("click", () => startGame(true));
restartButton.addEventListener("click", restartGame);
mainMenuButtonGame.addEventListener("click", returnToMainMenu);
mainMenuButtonWin.addEventListener("click", returnToMainMenu);
restartButtonWin.addEventListener("click", restartGame);

function startGame(againstComputer) {
  startMenu.style.display = "none";
  gameContainer.style.display = "block";
  winScreen.style.display = "none";
  isGameActive = true;
  isAgainstComputer = againstComputer;
  message.textContent = "Your turn";
  resetVisualEffects();
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute("data-index");

  if (boardState[index] !== null || !isGameActive || checkWin()) return;

  makeMove(index);
  if (checkWin()) {
    endGame(`${currentPlayer} wins!`);
    showWinScreen(`${currentPlayer} wins!`);
  } else if (boardState.every((cell) => cell !== null)) {
    endGame("It's a draw!");
    showWinScreen("It's a draw!");
  } else {
    switchPlayer();
  }
}

function makeMove(index) {
  boardState[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (isAgainstComputer && currentPlayer === "O") {
    message.textContent = "Computer's turn";
    setTimeout(computerMove, 500);
  } else {
    message.textContent = currentPlayer === "X" ? "Your turn" : "Player's turn";
  }
}

function checkWin() {
  for (let combination of winningCombinations) {
    if (combination.every((index) => boardState[index] === currentPlayer)) {
      return true;
    }
  }
  return false;
}

function computerMove() {
  let availableCells = [];
  boardState.forEach((cell, index) => {
    if (cell === null) availableCells.push(index);
  });

  const randomIndex =
    availableCells[Math.floor(Math.random() * availableCells.length)];
  makeMove(randomIndex);

  if (checkWin()) {
    endGame(`${currentPlayer} wins!`);
    showWinScreen(`${currentPlayer} wins!`);
  } else if (boardState.every((cell) => cell !== null)) {
    endGame("It's a draw!");
    showWinScreen("It's a draw!");
  } else {
    switchPlayer();
  }
}

function endGame(messageText) {
  message.textContent = messageText;
  isGameActive = false;
}

function resetVisualEffects() {
  cells.forEach((cell) => {
    cell.textContent = "";
  });
  winScreen.style.display = "none";
}

function restartGame() {
  boardState.fill(null);
  currentPlayer = "X";
  message.textContent = "Your turn";
  resetVisualEffects();
  isGameActive = true;
}

function returnToMainMenu() {
  boardState.fill(null);
  currentPlayer = "X";
  resetVisualEffects();
  isGameActive = false;
  startMenu.style.display = "flex";
  gameContainer.style.display = "none";
  winScreen.style.display = "none";
}

function showWinScreen(messageText) {
  winMessage.textContent = messageText;
  winScreen.style.display = "flex";
  winScreen.style.flexDirection = "column";
  winScreen.style.justifyContent = "center";
  winScreen.style.alignItems = "center";
}
