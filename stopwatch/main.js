const timeElement = document.getElementById("time");
const startButton = document.getElementById("start");
const restartButton = document.getElementById("restart");
let running = false;
let intervalRunning = null;
let globalTime = 0;
let addedTime = 602000;

startButton.addEventListener("click", () => {
  toggle();
});

const toggle = () => {
  if (running) {
    pause();
  } else {
    start();
  }
};

const start = () => {
  running = true;
  startButton.innerText = "Pause";
  startTime = new Date();
  const interval = setInterval(() => {
    let now = new Date();
    const timeSoFar = now.getTime() - startTime.getTime() + addedTime;
    updateTime(timeSoFar);
  }, 31);
  intervalRunning = interval;
};

const pause = () => {
  clearInterval(intervalRunning);
  addedTime = globalTime;
  startButton.innerText = "Start";
  running = false;
};

// Doesn't display miliseconds when minutes appear. Doesn't display seconds when hours appear.
const updateTime = (time) => {
  let minutes = 0;
  let hours = 0;
  globalTime = time;
  let displaySeconds = Math.floor(time / 10) / 100;

  // Checks if there's enough for minutes or hours and sets what the values would be
  if (displaySeconds / 60 >= 1) {
    minutes = Math.floor(displaySeconds / 60);
    displaySeconds = displaySeconds % 60;
    if (minutes / 60 >= 1) {
      hours = Math.floor(minutes / 60);
      minutes = minutes % 60;
    }
  }

  const decimalLength = displaySeconds.toString().split(".")[1].length;
  if (decimalLength === 0) {
    displaySeconds = "00";
  }
  if (decimalLength === 1) {
    displaySeconds = `${displaySeconds}0`;
  }
  const minutesDisplay = minutes ? hours ? minutes + "m" : minutes + "m, " : ""
  const hoursDisplay = hours ? hours + "h, " : "";
  if (minutesDisplay) {
    displaySeconds = displaySeconds.toString().split(".")[0];
  }
  if (hoursDisplay) {
      displaySeconds = ""
  }
  timeElement.innerText = `${hoursDisplay}${hoursDisplay ? minutesDisplay ? "" : "0m" : ""}${minutesDisplay}${displaySeconds}${hoursDisplay ? "" : "s"}`;
};

const restart = () => {
  if (running) pause();
  timeElement.innerHTML = "0.00";
  globalTime = 0;
  addedTime = 0;
};

restartButton.addEventListener("click", () => {
  restart();
});
