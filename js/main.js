const memoryCards = [
    "1.png", "1.png", "2.png", "2.png", "3.png", "3.png", "4.png", "4.png", "5.png", "5.png", "6.png", "6.png", "7.png", "7.png", "8.png", "8.png", "9.png", "9.png", "10.png", "10.png",
];
var memoryTable = document.querySelector(".memory-table");
var game = document.querySelector(".container");
var startgame = document.querySelector(".startGame");
var opened = [];
var MaxScore = document.querySelector(".maxScore")
var matched = [];

var model = document.getElementById("model");
var play = document.querySelector(".play-btn");
var restart = document.querySelector(".restart-btn");
var playAgain = document.querySelector(".play-again-btn");
var stepCounter = document.querySelector(".step-counter");

var steps = 0;

var minuteCounter = document.querySelector(".minute");
var secondCounter = document.querySelector(".second");
var time;
var minutes = 00;
var seconds = 00;
var timeStart = false;

function shuffle(arr) {
    var currentIndex = arr.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }
    return arr;
}

function startGame() {
    var shuffleCards = shuffle(memoryCards);
    for (let i = 0; i < shuffleCards.length; i++) {
        var liTag = document.createElement('li');
        liTag.classList.add('card');
        var addImage = document.createElement('img');
        liTag.appendChild(addImage);
        addImage.setAttribute("src", "image/" + shuffleCards[i]);
        memoryTable.appendChild(liTag);
    }
}
play.addEventListener("click", function() {
    game.style.display = "flex";
    startgame.style.display = "none";
    startGame();

});

function removeCard() {
    while (memoryTable.hasChildNodes()) {
        memoryTable.removeChild(memoryTable.firstChild);
    }
}

function timer() {

    time = setInterval(function() {
        seconds++;
        if (seconds <= 9) {
            secondCounter.innerHTML = "0" + seconds;

        }
        if (seconds > 9) {
            secondCounter.innerHTML = seconds;

        }
        if (seconds == 60) {
            minutes++;
            minuteCounter.innerHTML = "0" + minutes;
            seconds = 0;
            secondCounter.innerHTML = "0" + seconds;
        }
        if (minutes > 9) {
            minuteCounter.innerHTML = minutes;

        }
    }, 1000);
}

function stopTime() {
    clearInterval(time);
    secondCounter.innerHTML = "00";
    minuteCounter.innerHTML = "00";

}

function resetEverything() {
    stopTime();
    timeStart = false;
    seconds = 0;
    minutes = 0;
    steps = 0;
    stepCounter.innerHTML = 0;
    matched = [];
    opened = [];
    removeCard();
    startGame();
}

function stepsCounter() {
    stepCounter.innerHTML++;
    steps++;
}

function comparing() {
    if (opened.length == 2) {
        document.body.style.pointerEvents = "none";
    }
    if (opened.length == 2 && opened[0].src == opened[1].src) {
        matching();
    } else if (opened.length == 2 && opened[0].src != opened[1].src) {
        noMatching();
    }
}

function matching() {
    setTimeout(function() {
        opened[0].parentElement.classList.add("match");
        opened[1].parentElement.classList.add("match");
        matched.push(...opened);
        document.body.style.pointerEvents = "auto";
        winGame();
        opened = [];
    }, 1000);
    stepsCounter();

}

function noMatching() {
    setTimeout(function() {
        opened[0].parentElement.classList.remove("flip");
        opened[1].parentElement.classList.remove("flip");
        document.body.style.pointerEvents = "auto";
        opened = [];
    }, 1200);
    stepsCounter();

}

function AddScoreInfo() {
    var scoreInfo = document.querySelector(".score-info");
    for (let i = 1; i <= 3; i++) {
        var infoElement = document.createElement('P');
        infoElement.classList.add("info");
        scoreInfo.appendChild(infoElement);
    }
    let p = scoreInfo.querySelectorAll("p.info");
    p[0].innerHTML = "You finished the game in " + steps + " steps";
    p[1].innerHTML = "in " + minutes + " minutes " + seconds + " seconds.";
    p[2].innerHTML = "Your score is " + (minutes * 60 + seconds + steps) + "!";
    MaxScore.innerHTML = minutes * 60 + seconds + steps;


}

function displayModel() {
    var modelClose = document.getElementsByClassName("close")[0];
    model.style.display = "block";
    modelClose.onclick = function() {
        model.style.display = "none";

    };
    window.onclick = function(event) {
        if (event.target == model) {
            model.style.display = "none";

        }
    }
}

function winGame() {
    if (matched.length == 20) {
        stopTime();
        AddScoreInfo();
        displayModel();
    }
}

memoryTable.addEventListener("click", function(e) {
    if (e.target.nodeName == "LI") {
        console.log(e.target.nodeName + " Was clicked");
        if (timeStart == false) {
            timeStart = true;
            timer();
        }
        flipCard();
    }

    function flipCard() {
        e.target.classList.add("flip");
        addToOpened();
    }

    function addToOpened() {
        if (opened.length == 0 || opened.length == 1) {
            opened.push(e.target.firstElementChild);
        }
        comparing();
    }
});

restart.addEventListener("click", resetEverything);
playAgain.addEventListener("click", function() {
    model.style.display = "none";
    resetEverything();
});