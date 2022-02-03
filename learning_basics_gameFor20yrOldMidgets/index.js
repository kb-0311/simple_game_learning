

//An array of buttons
var buttonColours = ["red", "blue", "green", "yellow"];


//A dynamic array of pattern of clicks of user for that level;
var userClickedPattern=[];

var numberOfClicks=0;


//A dynamic Array of  pattern of randomly generated pattern for a level 
var gamePattern = [];

var level = 0;

var begin=false;


    $(document).keydown(()=>{
        if(!begin)
        {
            $("#level-title").text("Level  "+ level);
            begin=true;
        
            level++;
            nextSequence();
        }
    }
    );

    function checkAnswer(currentLevel){
        console.log(userClickedPattern.length);
        console.log(gamePattern.length);

        

        if(gamePattern[currentLevel-1]===userClickedPattern[currentLevel-1])
        {
            console.log("success");
            if(userClickedPattern.length===gamePattern.length)
            {
                setTimeout(()=>{nextSequence()},1000);
            }
        }


        else
        {
            wrongAnswer();
        }

      

    }

    function wrongAnswer(){

        var youAreWrong=new Audio("sounds/wrong.mp3");
        youAreWrong.play();



        

        $("body").addClass("game-over");

        setTimeout(()=>{$("body").removeClass("game-over");},200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        restart();



    }
    
    function restart(){
        level=0;
        begin=false;
        gamePattern=[];
        

    }




function nextSequence() {

    userClickedPattern=[];

        
        
        $("#level-title").text("Level "+(level));
        
        level++;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  playSound(randomChosenColour);



}

//to find and play animation+sound on the user selected div of class btn
$(".btn").click(function(){



        numberOfClicks++;

        
        var userChosenColor= $(this).attr("id");

        userClickedPattern.push(userChosenColor);

        animatePress(userChosenColor);

        playSound(userChosenColor);



        checkAnswer(userClickedPattern.length);
   

});



//funtion to play a sound
function playSound(currentColor){
    var audio = new Audio("sounds/" + currentColor+ ".mp3");
    audio.play();

}

//function to play the button animation 

function animatePress (currentColor){

    $("#"+currentColor).addClass("pressed");

    setTimeout(()=>{$("#"+currentColor).removeClass("pressed")},100);



}