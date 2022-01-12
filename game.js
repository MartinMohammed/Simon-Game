var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;



// ------------ DETECT Keystrokes  --------------


$(document).on("keypress", function(){
  if (!started){
    // Start title
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

  // we only want to start the game one time - so we have to remove the event listener
  // The .off() method removes event handlers that were attached with .on()
  // $(document).off("keypress");
});

// ------------ DETECT BUTTON CLICKS --------------

// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
// 2nd parameter is callback function which get called with the event object
$(".btn").on("click", function(){
  // event.target always refers to the element that trigger the event, where event
  // is the parameter passed to the function (object to callback function))

  // select with jquery the event trigger button and get the id
  // with attr: 1 param = get attribute value, 2nd == change value
  // Get the value of an attribute for the firste element in the set of matched elements or set
  // one or more attributes fore very matched element
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // play sound of the user clicked button
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    // we have to check if the user if finish with his sequence
    if (userClickedPattern.length === gamePattern.length){
      // Reset userClickedPattern
      setTimeout(nextSequence, 1000);
    }
  }
  else{
    // game over screen --> add class to body

    playSound("wrong")

    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

// will animate the buttonand play audio of the random chosen colour
function nextSequence(){
  userClickedPattern = [];
//everytime here --> increase level with 1
    // val() - Sets or returns the value of form fields
    level ++;
    $("#level-title").text("Level " + level);

  // 0.999 * 4 = 3.99... --> floor = 0 <= x <= 3
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // numeric parameter = durationin ms
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    // like time.sleep from python3
    $("#" + currentColour).removeClass("pressed");
  }, 100)
}

// just take the file name 
function playSound(name){
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver(){
  // reset variables
  started = false;
  level = 0;
  gamePattern = [];
}
