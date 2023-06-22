var gamePattern = [];
var buttons = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gameStarted = 0;
var level = 0;
var patternMatchIndex = 0;
$(".btn").click(function () {
    // console.log(this.id);
    var id = this.id;
    userClickedPattern.push(id);

    playSound(this.id);
    animatePress(this.id);

    // matching the pattern
    if (gamePattern.length > 0) {
        //console.log(gamePattern[patternMatchIndex]+" "+userClickedPattern[patternMatchIndex]);
        if (userClickedPattern[patternMatchIndex] == gamePattern[patternMatchIndex]) {
            //console.log("Enter");
            patternMatchIndex++;
            if (patternMatchIndex == gamePattern.length) {
                userClickedPattern = [];
                patternMatchIndex = 0;
                //console.log("Enter");
                setTimeout(nextSequence, 1000);

            }
        }
        else {
            level = 0;
            userClickedPattern = [];
            gamePattern = [];
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            $("body").addClass("game-over");
            setTimeout(function () {
                $("h1").text("Game Over, Press Any Key to Restart");
                $("body").removeClass("game-over");
            }, 200);
            
            gameStarted = 0;
        }
    }
    else {
        userClickedPattern.pop();
    }


});

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    gamePattern.push(buttons[randomNumber]);
    $("#" + buttons[randomNumber]).fadeOut(100).fadeIn(100);
    playSound(buttons[randomNumber]);
    $("h1").text("Level " + level);
    level++;

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(name) {
    $("#" + name).addClass("pressed");
    setTimeout(function () {
        $("#" + name).removeClass("pressed");
    }, 100);
}

document.addEventListener("keypress", function () {
    if (gameStarted == 0) {
        gameStarted = 1;

        nextSequence();
    }
})

