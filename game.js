//block color to choose from
var buttonColors = ["red", "blue", "green", "yellow"];
//the array that'll contain the pattern
var gamePattern = [];
//the pattern user clicks
var userClickedPattern = [];
//to keep track of game start
var started = false;
var level = 0 ;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});


$(".btn").click(function(){
    //we store the id of the clicked button in a var
    var userChosenColor = $(this).attr("id");
    //adding it to the user's pattern array
    userClickedPattern.push(userChosenColor);
    //playing corresponding audio upon button clicks
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);

    }
}
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart.");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    //generating a random value between 0 and 3
    var randomNumber = Math.floor(Math.random() *4);
    //getting a new element or the block to be pressed in the Pattern
    var randomChosenColor = buttonColors[randomNumber];
    //pushing it in gamePattern Array
    gamePattern.push(randomChosenColor);
    //we select the given random color chosen block and animate it to flash
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    //we play sound of given color block chosen randomly
    playSound(randomChosenColor);

}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    //animate the press and revert
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    level=0;
    gamePattern = [];
    started = false;
}