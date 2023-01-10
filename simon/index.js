
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence(){
    userClickedPattern = [];
    level = level + 1;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    // The above and below lines of codes do the same thing
    // $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $("h1").text("Level " + level);
    playSound(randomChosenColor);
}

$(".btn").click(function (e) { 
    e.preventDefault();
    
    var userChosenColor = this.getAttribute("id");
    userClickedPattern.push(userChosenColor);
    // console.log(this.attr("event.key"));
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    playSound(userChosenColor);
});


function playSound(name){

    switch (name) {
        case "green":
            var green = new Audio('sounds/green.mp3');
            green.play();
            break;
        case "red":
            var red = new Audio('sounds/red.mp3');
            red.play();
            break;
        case "blue":
            var blue = new Audio('sounds/blue.mp3');
            blue.play();
            break;
        case "yellow":
            var yellow = new Audio('sounds/yellow.mp3');
            yellow.play();
            break;
    
        default: console.log(randomChosenColor)
            break;
    }
    
}


function animatePress(currentColor){
    $(".btn").on("click", function(e){
        $(this).addClass("pressed");
        setTimeout(() => {
            $(this).removeClass("pressed");
        }, 100);
        // console.log(this);
    });
}

if (level === 0){
    $(".str").one("click", nextSequence);
    $(".str").click(function(){
        $(".str").hide();
    });
}

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
            console.log("Success!");

        }
                

    } else {
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        var wrong = new Audio('sounds/wrong.mp3');
        wrong.play();

        $("h1").text("Game Over 😞");
        startOver();
        
        $(".str").text("Restart")
        $(".str").show();
        // console.log("Failure!");
        // console.log(gamePattern);
        // console.log(userClickedPattern);
        
    }
    // }
    
    
};

function startOver(){
    
    level = 0;
    gamePattern = [];
    $(".str").one("click", nextSequence);

    
}