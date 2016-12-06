var btn;
var memoryGame = (function() {
    // Variables
    var btnColors = $('#game button')
    var gameLevel = 1;
    var memoryArray = [];
    var stopNum = 0;

    // Get a rounded random number
    var randomNum = function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    // Function with the play settings
    var play = function play() {
        // Disable the play button
        $('#play').prop('disabled', true);

        // Intervals
        var interval = setInterval(function() {gameAnimation()}, 500);

        var gameAnimation = function gameAnimation() {
            stopNum++;
            var numX = randomNum(0,btnColors.length);
            // Run every button of the game
            $.each(btnColors, function(index, value){
                $(this).css('border', 'none');
                $(this).css('border-bottom', '3px solid #6980ab');
                if (index == numX) {
                    $(this).css('border','6px solid #be5c25');
                    memoryArray.push(index);
                }
            });

            // Clear the last color of the button
            var clearBtn = function clearBtn() {
                btnColors[memoryArray[memoryArray.length-1]].style.border = 'none';
                btnColors[memoryArray[memoryArray.length-1]].style.borderBottom = '3px solid #6980ab';
                clearInterval(intervalClear);
            }

            // Stop interval
            if (gameLevel == 1) {
                if (stopNum == 3) {
                    clearInterval(interval);
                    var intervalClear = setInterval(function () {clearBtn()}, 500);
                    stopNum = 0;
                }
            }
            else if (gameLevel == 2) {
                if (stopNum == 5) {
                    clearInterval(interval);
                    var intervalClear = setInterval(function () {clearBtn()}, 500);
                    stopNum = 0;
                }
            }
            else if (gameLevel == 3) {
                if (stopNum == 8) {
                    clearInterval(interval);
                    var intervalClear = setInterval(function () {clearBtn()}, 500);
                    stopNum = 0;
                }
            }
            else if (gameLevel == 4) {
                if (stopNum == 10) {
                    clearInterval(interval);
                    var intervalClear = setInterval(function () {clearBtn()}, 500);
                    stopNum = 0;
                }
            }
        };
    };

    // Matches the  button clicked with the memory array
    var match = function match() {
        if (btn == memoryArray[0]) {
            console.log('Bien hecho');
            memoryArray.shift();
        } else {
            console.log(btn);
            console.log(memoryArray);
            alert('Pediste');
            location.reload();
        };

        if (gameLevel == 4 && memoryArray.length == 0) {
            alert('Has Ganado');
            location.reload();
        } else if (memoryArray.length == 0) {
            alert('Siguiente nivel!');
            gameLevel += 1;
            alert('Nivel: ' + gameLevel);
            play();
        };
    }

    return {
        game: function(){
            play()
        },

        match: function() {
            match()
        }
    }

})();


$('#play').on('click', function() {
    memoryGame.game();
});

$('#btn-1').on('click', function() {
    btn = 0;
    memoryGame.match();
});

$('#btn-1').on('mouseenter', function() {
    $(this).animate({
        'position': 'absolute',
        'top': '+=20'
    }, {
        duration: 500,
        easing: 'easeOutElastic'
    });
});

$('#btn-1').on('mouseleave', function() {
    $(this).animate({
        'top': '-=20'}, {
            duration: 300,
        });
});

$('#btn-2').on('click', function() {
    btn = 1;
    memoryGame.match();
});

$('#btn-2').on('mouseenter', function() {
    $(this).animate({
        'position': 'absolute',
        'top': '+=20'
    }, {
        duration: 500,
        easing: 'easeOutElastic'
    });
});

$('#btn-2').on('mouseleave', function() {
    $(this).animate({
        'top': '-=20'}, {
            duration: 300,
        });
});

$('#btn-3').on('click', function() {
    btn = 2;
    memoryGame.match();
});

$('#btn-3').on('mouseenter', function() {
    $(this).animate({
        'position': 'absolute',
        'top': '+=20'
    }, {
        duration: 500,
        easing: 'easeOutElastic'
    });
});

$('#btn-3').on('mouseleave', function() {
    $(this).animate({
        'top': '-=20'}, {
            duration: 300,
        });
});

$('#btn-4').on('click', function() {
    btn = 3;
    memoryGame.match();
});

$('#btn-4').on('mouseenter', function() {
    $(this).animate({
        'position': 'absolute',
        'top': '+=20'
    }, {
        duration: 500,
        easing: 'easeOutElastic'
    });
});

$('#btn-4').on('mouseleave', function() {
    $(this).animate({
        'top': '-=20'}, {
            duration: 0,
        });

});
