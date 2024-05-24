//timer
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let currentTime = 0;

function updateTime() {
  currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  displayTime(elapsedTime);
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTime, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  displayTime(elapsedTime);
}

function displayTime(time) {
  totalSeconds = Math.floor(time / 1000);
  hours = Math.floor(totalSeconds / 3600);
  minutes = Math.floor((totalSeconds % 3600) / 60);
  seconds = totalSeconds % 60;
}