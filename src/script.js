let start = document.getElementById("start");
let stop = document.getElementById("stop");
let reset = document.getElementById("reset");
let time = document.getElementById("time");
let interval;
timeLeft = 10;
function updateTime(){
    let min = Math.floor(timeLeft/60);
    let sec = Math.floor(timeLeft%60);
    let formatTime = `${min.toString().padStart(2,"0")} : ${sec.toString().padStart(2,"0")}`;
    time.innerHTML = formatTime;
}
function startTimer(){
    alert("To stay focused, please enable 'Do Not Disturb' mode on your device!");
    document.body.style.filter = "brightness(80%)";
    interval = setInterval(()=>{
        timeLeft--;
        updateTime();
        if(timeLeft == 0){
            clearInterval(interval);
            let audio = document.getElementById('timeUpAudio');
            audio.play();
            const modal = new bootstrap.Modal(document.getElementById('timeModal'));
            modal.show();
            timeLeft = 1500;
        }
    },1000);
}
function stopTimer(){
    let confirmStop = confirm("You're doing great! Do you really want to stop? Stay focused and keep going! 💪");
    if (confirmStop) {
        resetTimer();
    } else {
        clearInterval(interval);
    }
}
function resetTimer(){
    clearInterval(interval);
    interval = null;
    timeLeft = 1500;
    updateTime();
}
start.addEventListener("click",startTimer);
stop.addEventListener("click",stopTimer);
reset.addEventListener("click",resetTimer);
updateTime();
function getRandomQuote() {
    fetchQuote();
    setInterval(fetchQuote, 15000);
}
function updateQuote() {
    const quoteElement = document.getElementById("quote");
    quoteElement.innerText = getRandomQuote();
}
updateQuote();
setInterval(updateQuote, 15000);

function fetchQuote(){
    $.getJSON("https://api.quotable.io/random",function(data){
       $("#content").text(data.content);
       $("#author").text("- " + data.author); 
    });
}