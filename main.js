const startButton = document.querySelector("#start");
const endButton = document.querySelector("#stop");
const overlay = document.querySelector("#overlay");
const closeButton = document.querySelector("#close");
const circles = document.querySelectorAll(".circle");
const scoreText = document.querySelector("#score");
const resultText = document.querySelector("#result");

let active = 0;
let score = 0;
let pace = 1000;
let rounds = 0;
let timer;

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

circles.forEach((circle, i) => {
  circle.addEventListener("click", () => clickedCircle(i));
});

const clickedCircle = (i) => {
  console.log("clicked circle was:", i);
  if (i !== active) {
    endGame();
  } else {
    score++;
    rounds--;
    scoreText.textContent = score;
  }
};

const startGame = () => {
  startButton.style.display = "none";
  endButton.style.display = "inline";
  for (let i = 0; i < circles.length; i++) {
    circles[i].style.pointerEvents = "auto";
  }
  console.log("game started");

  let nextActive = pickNew(active);
  circles[nextActive].classList.toggle("active");
  circles[active].classList.remove("active");

  active = nextActive;
  console.log("active circle:", active);
  timer = setTimeout(startGame, pace);
  pace = pace - 10;

  if (rounds >= 5) {
    endGame();
  }
  rounds++;

  function pickNew(active) {
    let nextActive = getRndInt(0, 3);

    if (nextActive != active) {
      return nextActive;
    } else {
      return pickNew(active);
    }
  }
};

const endGame = () => {
  console.log("game ended");
  clearTimeout(timer);
  overlay.style.visibility = "visible";
  if (score == 0) {
    resultText.textContent = `Your score is ${score}. Try again, It is not the end of the world!`;
  } else if (score > 1 || score < 10) {
    resultText.textContent = `Your score is ${score}. Not bad, You can do even better`;
  } else if (score > 11) {
    resultText.textContent = `Your score is ${score}. You are amazing!`;
  }
};

const reloadGame = () => {
  window.location.reload();
};

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}
const startGameMusic = () => {
  startSound = new sound("/start.wav");
  startSound.play();
};

const endGameMusic = () => {
  endSound = new sound("/end.wav");
  startSound.stop();
  endSound.play();
};

startButton.addEventListener("click", startGame);
startButton.addEventListener("click", startGameMusic);
endButton.addEventListener("click", endGame);
endButton.addEventListener("click", endGameMusic);
closeButton.addEventListener("click", reloadGame);
