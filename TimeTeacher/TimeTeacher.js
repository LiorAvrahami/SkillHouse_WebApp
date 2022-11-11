let IsTimerRunning = false;
let TimerStartTime;
let RequiredInterval;

let ScoreBoxOGCol = document.getElementById("ScoreBox").style.backgroundColor;

const MaxInterval = 8;
const MinInterval = 3;

function ButtonClicked() {
    if (!IsTimerRunning) {
        IsTimerRunning = true;
        TimerStartTime = new Date();
        RequiredInterval = Math.floor(Math.random() * (MaxInterval - MinInterval)) + MinInterval;
        document.getElementById("TimeRequestLable").innerHTML = RequiredInterval;
        /* clear old run stuff */
        document.getElementById("TimeResultLable").innerHTML = "_";
        document.getElementById("ScoreLable").innerHTML = "_";
        document.getElementById("ScoreBox").style.backgroundColor = ScoreBoxOGCol;
        document.getElementById("Button").innerHTML = "Stop";

    } else {
        IsTimerRunning = false;
        let TimerInterval = ((new Date().getTime()) - TimerStartTime.getTime()) / 1000;
        let score = getScore(RequiredInterval, TimerInterval);
        document.getElementById("TimeResultLable").innerHTML = TimerInterval.toFixed(1);
        document.getElementById("ScoreLable").innerHTML = score.toFixed(1);
        ScoreBoxOGCol = document.getElementById("ScoreBox").style.backgroundColor;
        document.getElementById("ScoreBox").style.backgroundColor = getColor(score);
        document.getElementById("Button").innerHTML = "Start Again";
    }
}

function getScore(ReqTime, ResultTime) {
    relError = (ResultTime - ReqTime) / (ReqTime);
    /* score is a function of relError which is the relative error.
        score(0) := 10
        score(inf) := 0

        denote relError with r.
        lets take a fuction of the form:
        score = a/(b + r^2)
        plug in and get:
        a/b = 10
        */
    a = 0.25;
    b = a / 10;
    return a / (b + relError * relError);
}

function getColor(score) {
    if (score < 3) {
        return "#f26050"
    } if (score < 6) {
        return "#f2a150"
    } if (score < 8) {
        return "#e8d266"
    } else {
        return "#71e866"
    }
}

function OnQuestionMarkClicked() {
    alert("when you click start the target time interval in seconds will show. " +
        "also a timer will start in the background. try and stop the timer at the right time.\nmaximum score is 10");
}