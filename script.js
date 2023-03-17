//your code here
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const timeDisplay = document.getElementById('time');

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

function startTimer() {
  // Disable start button and enable pause and stop buttons
  startButton.disabled = true;
  pauseButton.disabled = false;
  stopButton.disabled = false;

  // Get current time in milliseconds
  startTime = Date.now() - elapsedTime;

  // Start timer
  timerInterval = setInterval(() => {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    updateTimeDisplay();
  }, 10);
}

function pauseTimer() {
  // Change pause button text to "continue"
  pauseButton.textContent = 'continue';

  // Pause timer
  clearInterval(timerInterval);
}

function continueTimer() {
  // Change pause button text back to "pause"
  pauseButton.textContent = 'pause';

  // Resume timer
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    updateTimeDisplay();
  }, 10);
}

function stopTimer() {
  // Reset elapsed time and disable pause and stop buttons
  elapsedTime = 0;
  pauseButton.disabled = true;
  stopButton.disabled = true;

  // Stop timer and update time display
  clearInterval(timerInterval);
  updateTimeDisplay();

  // Enable start button
  startButton.disabled = false;
}

function updateTimeDisplay() {
  // Convert elapsed time to hours, minutes, and seconds
  const hours = Math.floor(elapsedTime / 3600000).toString().padStart(2, '0');
  const minutes = Math.floor((elapsedTime % 3600000) / 60000).toString().padStart(2, '0');
  const seconds = Math.floor((elapsedTime % 60000) / 1000).toString().padStart(2, '0');

  // Update time display
  timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

// Initialize time display
updateTimeDisplay();

// Add event listeners to buttons
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', () => {
  if (pauseButton.textContent === 'pause') {
    pauseTimer();
  } else {
    continueTimer();
  }
});
stopButton.addEventListener('click', stopTimer);

