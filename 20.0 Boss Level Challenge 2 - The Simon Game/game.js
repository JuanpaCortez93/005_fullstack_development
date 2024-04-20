$(document).ready(() => {

    const buttonColors = ["red", "blue", "green", "yellow"];
    var userClickedPattern = [];
    var gamePattern = [];
    let level = 1;
    let started = false;

    function playSound (colour) {
        const audio = new Audio(`./sounds/${colour}.mp3`)
        audio.play();
    }

    function nextSequence (level) {

        for(let i=1; i <= level; i++){
            var randomNumber = Math.round(3*Math.random());
            var randomChosenColour = buttonColors[randomNumber];
            gamePattern.push(randomChosenColour);
        }

        gamePattern.map((pattern, index) => {
            setTimeout(() => {
                playSound(pattern);
                $(`#${pattern}`).fadeOut(500).fadeIn(500);
            },1000*(index+1))
        });

    }

    $('body').keypress(function(e) {
        const code = e.key;
        if (code == 'a' && started == false) {
            $('#level-title').text('Level 1!');
            nextSequence(level);
            started = true;
        }
    });

    $(`.btn`).on('click', function(){
        let userChosenColour = $(this).attr('id');
        if(userChosenColour != ''){
            userClickedPattern.push(userChosenColour);
            $(`#${userChosenColour}`).fadeOut(500).fadeIn(500);

            if(gamePattern[userClickedPattern.length-1] != userChosenColour){
                    userClickedPattern = [];
                    gamePattern = [];
                    started = false;
                    level = 1;

                    playSound('wrong');
                    $('#level-title').text('You lose! Press A to restart!');
                    $('body').addClass('game-over');
                    setTimeout(function() {
                        $('body').removeClass('game-over');
                    }, 200);
            }else{
                playSound(userChosenColour);

                if(userClickedPattern.length == gamePattern.length){
                    if(JSON.stringify(userClickedPattern) == JSON.stringify(gamePattern)){
                        userClickedPattern = [];
                        gamePattern = [];                            
                        level += 1;
                        nextSequence(level);

                        $('#level-title').text(`Level ${level}!`);
                    }
                }
            }               
        }
    });

});