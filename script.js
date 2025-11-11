const playerInput = document.getElementById("player-input");
const boardContainer = document.getElementById("game-board");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");
const submitBtn = document.getElementById("submit");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value.trim();
  player2 = document.getElementById("player2").value.trim();

  if (player1 === "" || player2 === "") {
    alert("Please enter names for both players!");
    return;
  }

  playerInput.classList.add("hidden");
  boardContainer.classList.remove("hidden");

  currentPlayer = player1;
  messageDiv.textContent = `${currentPlayer}, you're up!`;
});

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const index = parseInt(cell.id) - 1;

    if (!gameActive || board[index] !== "") return;

    board[index] = currentSymbol;
    cell.textContent = currentSymbol;

    const winnerCombo = checkWinner();
    if (winnerCombo) {
      winnerCombo.forEach(i => {
        document.getElementById(i + 1).classList.add("newcell");
      });
      messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
      gameActive = false;
      return;
    }

    if (board.every((val) => val !== "")) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    currentSymbol = currentSymbol === "X" ? "O" : "X";
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    messageDiv.textContent = `${currentPlayer}, you're up!`;
  });
});

function checkWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combo;
    }
  }
  return null;
}
