let timerInterval;
let startTime;
let elapsedTime = 0;

const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const stopButton = document.getElementById("stop");

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTimer, 10);
  startButton.disabled = true;
  pauseButton.disabled = false;
  stopButton.disabled = false;
}

function updateTimer() {
  const elapsedTimeInSeconds = Math.floor((Date.now() - startTime) / 1000);
  const hours = Math.floor(elapsedTimeInSeconds / 3600).toString().padStart(2, "0");
  const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60).toString().padStart(2, "0");
  const seconds = (elapsedTimeInSeconds % 60).toString().padStart(2, "0");
  timerElement.textContent = `${hours}:${minutes}:${seconds}`;
}

function pauseTimer() {
  clearInterval(timerInterval);
  elapsedTime = Date.now() - startTime;
  pauseButton.textContent = "Continue";
  pauseButton.removeEventListener("click", pauseTimer);
  pauseButton.addEventListener("click", continueTimer);
}

function continueTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTimer, 10);
  pauseButton.textContent = "Pause";
  pauseButton.removeEventListener("click", continueTimer);
  pauseButton.addEventListener("click", pauseTimer);
}

function stopTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  timerElement.textContent = "00:00:00";
  startButton.disabled = false;
  pauseButton.disabled = true;
  stopButton.disabled = true;
  pauseButton.textContent = "Pause";
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
stopButton.addEventListener("click", stopTimer);
