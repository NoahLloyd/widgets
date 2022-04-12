const TIME_IN_SECONDS =25*60
let time = TIME_IN_SECONDS
let setTime = TIME_IN_SECONDS
let running = false
let runningInterval = null
const restartButton = document.getElementById('restart')
const startButton = document.getElementById('startSession')
startButton.addEventListener('click', () => {toggleSession()})

const toggleSession = () => {
    if(running) {
        pauseSession()
    } else {
        startSession()
    }
}

const startSession = () => {
    running = true
    startButton.innerText = "Pause"

    let startTime = new Date()
    let now = new Date()
    const interval = setInterval(() => {
        let now2 = new Date()

        if(now2.getSeconds() > now.getSeconds()) {
            time = setTime + Math.floor(startTime.getTime() / 1000) - Math.floor(now2.getTime() / 1000)
            updateTime(time)
        }

        now = now2
    }, 1000) 
    runningInterval = interval
}

const pauseSession = () => {
    clearInterval(runningInterval)
    startButton.innerText = "Start"
    running = false
    setTime = time
}

restartButton.addEventListener('click', () => {
    if (running) pauseSession()
    time = TIME_IN_SECONDS
    setTime = TIME_IN_SECONDS
    updateTime()
})


const updateTime = () => {
    const timeElement = document.getElementById('time')
    const minutes = Math.floor(time/60)
    const seconds = time % 60
    const secondsLength = `${seconds}`.length

    // Adds 0's in front in case the number doesn't fill 2 characters
    const secondsDisplayed =  secondsLength === 0 ? "00" : secondsLength === 1 ? `0${seconds}` : seconds
    timeElement.innerText = `${minutes}:${secondsDisplayed}`
}