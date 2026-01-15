var gamePattern = [];
var userClickedPattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];
var organizedButton = $(".btn").css("cursor", "pointer");
var level = 0;
var started = false;
var onSound = true;

$(document).on("keypress", function(){
    
    if(!started) {
        nextSequence();
        started = true;
    }

});        

organizedButton.click(function() {
    
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour); 
    
    animatePressed(userChosenColour);
    
    playSound(userChosenColour);
    
    checkAnswer(userClickedPattern.length - 1);
    
});

$("#toggle-btn-sound").on("click", function(){
    onSound = !onSound;
    if (onSound) {

        $("#toggle-btn-sound").text("🔊"); 

    } else {

        $("#toggle-btn-sound").text("🔇");
    }
});

function nextSequence() {
    userClickedPattern = [];
    
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    
    var randomChosenColour = buttonColor[randomNumber];
    
    gamePattern.push(randomChosenColour); 
    // console.log(gamePattern);
    
    $("#" + randomChosenColour).fadeOut(80).fadeIn(80);
    
    playSound(randomChosenColour);
};

function playSound(name) {
    if (onSound === false) return;

    var addAudio = new Audio("sounds/" + name + ".mp3")
    addAudio.play();
    addAudio.volume = 0.4
    
};

function animatePressed(currentColor) {
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
};

function checkAnswer(currentLevel) {
    
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    
    } else {
        $("#level-title").text("Game Over!, Press any key to play again!");
        $("body").addClass("game-over");
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 100);

        if (onSound === false) return;
        var gameOver = new Audio("sounds/wrong.mp3");
        gameOver.play();
        gameOver.volume = 0.5;

        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        started = false;
    }
}

    
    