function startTimer() {
    let timer = 45
    setInterval(function () {
        document.getElementById('timerDisplay').innerHTML = timer
        timer--

        if (timer < 0) {
            timer = 0
        }
    }, 1000);
}

window.onload = function () {
    startTimer();
};
