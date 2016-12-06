$(document).ready(function() {
    var housePrototype = function() {
        this.stock = 0; //Storage the coins
        this.lostCoins = 1;
        this.winCoins = 1;
        this.moreCoins = 0; //Coins per second
        this.click = 100; //Coins per click
        this.houseImg = 'img/house.jpg'; //The img of the house
        this.coinsSounds = new Audio('audio/coins.wav'); //Coins sound for the click
        this.upgradesSounds = new Audio('audio/upgrade.wav'); //Coins sound for the click        
        this.upgradeArray1 = 0; //Change the element in the array
        this.upgradeArray2 = 0; //Change the element in the array
        this.upgradeArray3 = 0; //Change the element in the array
        this.upgradeArray4 = 0; //Change the element in the array
        this.upgradeCost1 = 25; //Storage the cost of the upgrade
        this.upgradeCost2 = 50; //Storage the cost of the sofa
        this.upgradeCost3 = 100; //Storage the cost of the bed
        this.upgradeCost4 = 150; //Storage the cost of the tv
        this.finishInterval = true; //Finished the Interval
        this.randomTimeOut; //Random Number for the time out
        this.timeCount = 0; //Global time count

        //Creates a Random Number with a min and a max
        this.randomNum = function randomNum(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        };

        //Checks if the stock can enable the upgrades
        this.checkUpgrade = function checkUpgrade() {
            if (coins.stock >= coins.upgradeCost1) {
                $('#upgrade1').prop('disabled', false);
            } else {
                $('#upgrade1').prop('disabled', true);
            };

            if (coins.stock >= coins.upgradeCost2) {
                $('#upgrade2').prop('disabled', false);
            } else {
                $('#upgrade2').prop('disabled', true);
            };

            if (coins.stock >= coins.upgradeCost3) {
                $('#upgrade3').prop('disabled', false);
            } else {
                $('#upgrade3').prop('disabled', true);
            }
            if (coins.stock >= coins.upgradeCost4) {
                $('#upgrade4').prop('disabled', false);
            } else {
                $('#upgrade4').prop('disabled', true);
            }
        };

        //Interval of coins
        this.coinsInterval = function() {
            var coinsIntervalId = setInterval(function() {
                coins.checkUpgrade();
                coins.stock += coins.moreCoinsDefault;
                $('#counter').text(coins.stock);
            }, 1000);
        };

        //Interval for a random event
        this.timeOutInterval = function(){
            var timeOutIntervalId = setInterval(function() {
                coins.randomTimeOut = coins.randomNum(3000,4000);
                setTimeout(function(){ coins.minigame() }, coins.randomTimeOut);
            }, 70000);
        }

        //Count the seconds
        this.counterGlobal = function(){
            var counterGlobalId = setInterval(function(){
                $('#time').text(coins.timeCount);
                coins.timeCount++
            }, 1000);
        };

        //Counter of the minigame
        this.counterMinigame = function(){
            var number = 0;

            var counterMinigameId = setInterval(function(){
                number += 1;
                $('#minigameTime').text('Llevas ' + number + ' segundos de 20 segundos');
                $('#phone').animate({
                    'left': '+=10'
                }, {
                    duration: 450,
                    easing: 'easeOutElastic'
                });
                $('#phone').animate({
                    'left': '-=10'
                }, {
                    duration: 450,
                    easing: 'easeOutElastic'
                });

                if (number == 20) {
                    clearInterval(counterMinigameId);
                    coins.wonGame(false);
                };
            }, 1000);

        };

        //Interval for the lost or the win of the minigame
        this.wonGame = function(won){
            if (won) {
                coins.winCoins += 1;
            }else{
                coins.lostCoins += 1;
                $('#phone').stop();
                $('#phone').prop('disabled', true);
                $('#minigame').css('display', 'none');
            };
            var time = 0;
            var wonGameId = setInterval(function(){
                time++
                if (time == 20) {
                    coins.winCoins = 1;
                    coins.lostCoins = 1;
                    clearInterval(wonGameId);
                };
            }, 1000);
        };

        //Some minigame functionality
        this.minigame = function(){
            coins.counterMinigame();
            $('#phone').prop('disabled', false);
            $('#phone').on('click', function(){
                $('#minigame').css('display', 'block');
            });
        }
    };

    var coins = new housePrototype(); //Creates a new instance of housePrototype
    coins.moreCoinsDefault = coins.moreCoins / coins.lostCoins * coins.winCoins; //Storage the coins per second
    coins.clickDefault = coins.click / coins.lostCoins * coins.winCoins; //Storage the coins per click

    //Set the initial values
    coins.counterGlobal();
    $('#houseImg').css({'background-image': 'url('+ coins.houseImg +')'});
    $('#upgradeCost1').text(coins.upgradeCost1);
    $('#upgradeCost2').text(coins.upgradeCost2);
    $('#upgradeCost3').text(coins.upgradeCost3);
    $('#upgradeCost4').text(coins.upgradeCost4);
    $('#clicks').text(coins.click);
    coins.timeOutInterval();

    //Creates Items
    $('#house').prepend('<img class="sofa">');
    $('#house').prepend('<img class="bed">');
    $('#house').prepend('<img class="tv">');

    //Check something every time someone moves the mouse
    $(this).on('mousemove', function() {
        coins.checkUpgrade(); //Checks if there is any avaliable upgrade
    });

    //Add a coins per click
    $('#addCoins').on('click', function() {
        //----------- Animation with a coin and sound when you click -------------//
        coins.stock += coins.clickDefault; //Add to the stock clicks
        coins.checkUpgrade();
        $('#counter').text(coins.stock); //Shows in the html the stock
        coins.coinsSounds.play();
    });


    //Upgrades coins per click
    $('#upgrade1').on('click', function() {
        //JSON with the data of the object
        $.getJSON( "data/objects.json", function( data ) {
            coins.stock -= coins.upgradeCost1; //Rest the cost to the stock
            $('#counter').text(coins.stock);
            coins.click = data.broom.upgrade[coins.upgradeArray1]; //Change the coins per click
            coins.upgradeCost1 = data.broom.cost[coins.upgradeArray1]; //Change the cost of the upgrade
            $('#addCoins').prop('src', data.broom.img[coins.upgradeArray1]) //Change the image file for the upgrade
            $('#clicks').text(coins.click); //Change the coins per click in the html
            $('#upgradeCost1').text(coins.upgradeCost1); //Change the cost of the upgrade in the html
            coins.upgradeArray1 += 1;
            //Checks if there aren't any element in the array
            if (coins.upgradeArray1 >= data.broom.upgrade.length) {
                $('#upgrade1').remove(); //Remove the upgrade1 button
                coins.click = data.broom.upgrade[data.broom.upgrade.length-1]; //Left the upgrade with the last value of the array
            };
            coins.checkUpgrade();
        });
        coins.upgradesSounds.play();
    });

    // Upgrades sofa
    $('#upgrade2').on('click', function() {
        // Starts the coins Interval
        if (coins.finishInterval) {
            coins.coinsInterval();
            coins.finishInterval = false;
        };

        //JSON with the data of the object
        $.getJSON( "data/objects.json", function( data ) {
            coins.stock -= coins.upgradeCost2; //Rest the cost to the stock
            $('#counter').text(coins.stock);
            coins.moreCoins += data.sofa.upgrade[coins.upgradeArray2]; //Change the coins per second
            coins.upgradeCost2 = data.sofa.cost[coins.upgradeArray2]; //Change the cost of the upgrade
            $('#upgrade2').prop('src', data.sofa.img[coins.upgradeArray2]) //Change the image file for the upgrade
            $('#upgradeCost2').text(coins.upgradeCost2); //Change the cost of the upgrade in the html
            $('#clickPerSec').text(coins.moreCoins); //Show the clicks per sec in the html
            $('.sofa').css({
                'height': data.sofa.tall[coins.upgradeArray2],
                'width': data.sofa.large[coins.upgradeArray2]
            });
            $('.sofa').prop('src', data.sofa.img[coins.upgradeArray2]);
            coins.upgradeArray2 += 1;
            //Checks if there aren't any element in the array
            if (coins.upgradeArray2 >= data.sofa.upgrade.length) {
                $('#upgrade2').remove(); //Remove the upgrade2 button
                $('clickPerSec').text(coins.moreCoins);
            };
            coins.checkUpgrade();
        });
        coins.upgradesSounds.play();
    });

    // Upgrades Bed
    $('#upgrade3').on('click', function() {
        // Starts the coins Interval
        if (coins.finishInterval) {
            coins.coinsInterval();
            coins.finishInterval = false;
        };

        //JSON with the data of the object
        $.getJSON( "data/objects.json", function( data ) {
            coins.stock -= coins.upgradeCost3; //Rest the cost to the stock
            $('#counter').text(coins.stock);
            coins.moreCoins += data.bed.upgrade[coins.upgradeArray3]; //Change the coins per second
            coins.upgradeCost3 = data.bed.cost[coins.upgradeArray3]; //Change the cost of the upgrade
            $('#upgrade3').prop('src', data.bed.img[coins.upgradeArray3]) //Change the image file for the upgrade
            $('#upgradeCost3').text(coins.upgradeCost3); //Change the cost of the upgrade in the html
            $('#clickPerSec').text(coins.moreCoins); //Show the clicks per sec in the html
            $('.bed').css({
                'height': data.bed.tall[coins.upgradeArray3],
                'width': data.bed.large[coins.upgradeArray3]
            });
            $('.bed').prop('src', data.bed.img[coins.upgradeArray3]);
            coins.upgradeArray3 += 1;
            //Checks if there aren't any element in the array
            if (coins.upgradeArray3 >= data.bed.upgrade.length) {
                $('#upgrade3').remove(); //Disable the upgrade3 button
                $('clickPerSec').text(coins.moreCoins);
            };
            coins.checkUpgrade();
        });
        coins.upgradesSounds.play();
    });

    // Upgrades TV
    $('#upgrade4').on('click', function() {
        // Starts the coins Interval
        if (coins.finishInterval) {
            coins.coinsInterval();
            coins.finishInterval = false;
        };

        //JSON with the data of the object
        $.getJSON( "data/objects.json", function( data ) {
            coins.stock -= coins.upgradeCost4; //Rest the cost to the stock
            $('#counter').text(coins.stock);
            coins.moreCoins += data.tv.upgrade[coins.upgradeArray4]; //Change the coins per second
            coins.upgradeCost4 = data.tv.cost[coins.upgradeArray4]; //Change the cost of the upgrade
            $('#upgrade4').prop('src', data.tv.img[coins.upgradeArray4]) //Change the image file for the upgrade
            $('#upgradeCost4').text(coins.upgradeCost4); //Change the cost of the upgrade in the html
            $('#clickPerSec').text(coins.moreCoins); //Show the clicks per sec in the html
            $('.tv').css({
                'height': data.tv.tall[coins.upgradeArray4],
                'width': data.tv.large[coins.upgradeArray4],
                'top': data.tv.posTop[coins.upgradeArray4],
                'right': data.tv.posRight[coins.upgradeArray4],
            });
            $('.tv').prop('src', data.tv.img[coins.upgradeArray4]);
            coins.upgradeArray4 += 1;
            //Checks if there aren't any element in the array
            if (coins.upgradeArray4 >= data.tv.upgrade.length) {
                $('#upgrade4').remove(); //Disable the upgrade4 button
                $('clickPerSec').text(coins.moreCoins);
            };
        });
        coins.checkUpgrade();
        coins.upgradesSounds.play();
    });

    //Random Event with the guys of the house
    var btn;
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
            };
        };

        // Matches the  button clicked with the memory array
        var match = function match() {
            if (btn == memoryArray[0]) {
                memoryArray.shift();
            } else {
                alert('Pediste');
                gameLevel = 1;
                memoryArray = [];
                stopNum = 0;
                coins.wonGame(false);
            };

            if (gameLevel == 2 && memoryArray.length == 0) {
                alert('Has Ganado');
                coins.wonGame(true);
            } else if (memoryArray.length == 0) {
                alert('Siguiente nivel!');
                gameLevel += 1;
                alert('Nivel: ' + gameLevel);
                play();
            };
        }

       

    $('#play').on('click', function() {
        game();
    });

    $('#btn-1').on('click', function() {
        btn = 0;
        match();
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
        match();
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
        match();
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
        match();
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

    //Cookies
    document.cookie = coins.stock + coins.moreCoinsDefault + coins.clickDefault;
    console.log(document.cookie);
});
