let userScore = 0;
let compScore = 0;
let drawScore = 0;
let gameHistory = [];

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const historyList = document.querySelector("#history-list");
const resetButton = document.querySelector("#reset-game");
const winPercentage = document.querySelector("#win-percentage");
const totalGames = document.querySelector("#total-games");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * 3)];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
  updateGameHistory("Draw");
  drawScore++;
  updateStats();
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats computer's ${compChoice}.`;
    msg.style.backgroundColor = "green";
    updateGameHistory("Win");
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. Computer's ${compChoice} beats your ${userChoice}.`;
    msg.style.backgroundColor = "red";
    updateGameHistory("Loss");
  }
  updateStats();
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    const userWin = (userChoice === "rock" && compChoice === "scissors") ||
                    (userChoice === "paper" && compChoice === "rock") ||
                    (userChoice === "scissors" && compChoice === "paper");
    showWinner(userWin, userChoice, compChoice);
  }
};

const updateGameHistory = (result) => {
  gameHistory.unshift(result);
  if (gameHistory.length > 5) gameHistory.pop();
  historyList.innerHTML = gameHistory.map(res => `<li class="${res.toLowerCase()}">${res}</li>`).join('');
};

const updateStats = () => {
  const total = userScore + compScore + drawScore;
  const winPercentageValue = total ? ((userScore / total) * 100).toFixed(2) : 0;
  winPercentage.innerText = `Win Percentage: ${winPercentageValue}%`;
  totalGames.innerText = `Total Games: ${total}`;
};

const resetGame = () => {
  userScore = 0;
  compScore = 0;
  drawScore = 0;
  gameHistory = [];
  userScorePara.innerText = "0";
  compScorePara.innerText = "0";
  msg.innerText = "Game Reset. Choose your move!";
  msg.style.backgroundColor = "#081b31";
  historyList.innerHTML = "";
  updateStats();
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

resetButton.addEventListener("click", resetGame);

// Initialize stats
updateStats();