const movies = ["avatar", "inception", "batman", "frozen", "spiderman", "superman", "interstellar", "coco", "moana", "ironman"];

let selectedMovie;
let guessedLetters = [];
let lives;
let wins = 0;
let losses = 0;

const blanksEl = document.getElementById("blanks");
const inputEl = document.getElementById("guessInput");
const btnEl = document.getElementById("guessBtn");
const messageEl = document.getElementById("message");
const livesEl = document.getElementById("lives");
const playAgainBtn = document.getElementById("playAgainBtn");
const winsEl = document.getElementById("wins");
const lossesEl = document.getElementById("losses");

function startGame() {
  selectedMovie = movies[Math.floor(Math.random() * movies.length)];
  guessedLetters = [];
  lives = 6;
  livesEl.textContent = lives;
  messageEl.textContent = "";
  inputEl.value = "";
  btnEl.disabled = false;
  playAgainBtn.classList.add("hidden");
  displayWord();
}

function displayWord() {
  let display = "";
  for (let letter of selectedMovie) {
    display += guessedLetters.includes(letter) ? letter + " " : "_ ";
  }
  blanksEl.textContent = display.trim();
}

btnEl.addEventListener("click", () => {
  const guess = inputEl.value.toLowerCase();
  inputEl.value = "";

  if (!guess || guess.length !== 1 || !/[a-z]/.test(guess)) {
    messageEl.textContent = "Enter a valid letter!";
    return;
  }

  if (guessedLetters.includes(guess)) {
    messageEl.textContent = "You already guessed that letter!";
    return;
  }

  guessedLetters.push(guess);

  if (!selectedMovie.includes(guess)) {
    lives--;
    livesEl.textContent = lives;
  }

  displayWord();

  if (!blanksEl.textContent.includes("_")) {
    messageEl.textContent = "🎉 You guessed the movie!";
    btnEl.disabled = true;
    wins++;
    winsEl.textContent = wins;
    playAgainBtn.classList.remove("hidden");
  } else if (lives === 0) {
    messageEl.textContent = `😢 Game over! The movie was "${selectedMovie}"`;
    btnEl.disabled = true;
    losses++;
    lossesEl.textContent = losses;
    playAgainBtn.classList.remove("hidden");
  }
});

playAgainBtn.addEventListener("click", startGame);

startGame();