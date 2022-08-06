const predefinedTime = localStorage.getItem("time")
let TIME_IN_SECONDS = predefinedTime ? parseFloat(predefinedTime) : 60

let time = TIME_IN_SECONDS;
let setTime = TIME_IN_SECONDS;
let running = false;
let runningInterval = null;
let editing = false
const timeElement = document.getElementById("time");
const restartButton = document.getElementById("restart");
const startButton = document.getElementById("startSession");
const minutesInput = document.getElementById("minutesInput");
const minutesInputLabel = document.getElementById("minutesInputLabel");
const minutesInputButton = document.getElementById('minutesInputButton')
const editIcon = document.getElementById('editIcon')

editIcon.addEventListener('click', () => {
    minutesInput.classList.toggle("hidden")
    minutesInputButton.classList.toggle("hidden")
    minutesInputLabel.classList.toggle("hidden")
})


startButton.addEventListener("click", () => {
  toggleSession();
});

const toggleSession = () => {
  if (running) {
    pauseSession();
  } else {
    startSession();
  }
};

minutesInputButton.addEventListener('click', () => {
    localStorage.setItem("time", `${minutesInput.value * 60}`)
    location.reload()
})

const startSession = () => {
  running = true;
  startButton.innerText = "Pause";

  let startTime = new Date();
  let now = new Date();
  const interval = setInterval(() => {
    let now2 = new Date();

    if (now2.getSeconds() > now.getSeconds()) {
      time =
        setTime +
        Math.floor(startTime.getTime() / 1000) -
        Math.floor(now2.getTime() / 1000);
      updateTime(time);
    }

    if (time === 0) {
      new Audio("./ringing.wav").play();
      restartSession();
    }

    now = now2;
  }, 1000);
  runningInterval = interval;
};

const pauseSession = () => {
  clearInterval(runningInterval);
  startButton.innerText = "Start";
  running = false;
  setTime = time;
};
const restartSession = () => {
  if (running) pauseSession();
  time = TIME_IN_SECONDS;
  setTime = TIME_IN_SECONDS;
  updateTime();
};

restartButton.addEventListener("click", () => {
  restartSession();
});

const updateTime = () => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const secondsLength = `${seconds}`.length;

  // Adds 0's in front in case the number doesn't fill 2 characters
  const secondsDisplayed =
    secondsLength === 0 ? "00" : secondsLength === 1 ? `0${seconds}` : seconds;
  timeElement.innerText = `${minutes}:${secondsDisplayed}`;
};

updateTime();
