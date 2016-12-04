$(document).ready(function() {
    var housePrototype = function() {
        this.stock = 0; //Storage the coins
        this.moreCoins = 0; //Storage the coins per second
        this.click = 1; //Storage the coins per click
        this.upgradeArray = 0; //Change the element in the array
        this.upgradeCost1 = 25; //Storage the cost of the upgrade
        this.upgradeCost2 = 35; //Storage the cost of the upgrade
        this.finishInterval = false; //Finished the Interval

        //Checks if the stock can enable the upgrades

        this.checkUpgrade = function checkUpgrade() {
            if (coins.stock >= coins.upgradeCost1) {
                $('#upgrade1').prop('disabled', false);
            } else {
                $('#upgrade1').prop('disabled', true);
            }

            if (coins.stock >= coins.upgradeCost2) {
                $('#upgrade2').prop('disabled', false);
            } else {
                $('#upgrade2').prop('disabled', true);
            }
        };

        //Interval of coins
        this.coinsInterval = function() {
            var coinsIntervalId = setInterval(function() {
                coins.checkUpgrade();
                coins.stock += coins.moreCoins;
                $('#counter').text(coins.stock);
            }, 1000);
        };
    };

    var coins = new housePrototype(); //Creates a new instance of housePrototype

    //Set the initial costs of the upgrades
    $('#upgradeCost1').text(coins.upgradeCost1);
    $('#upgradeCost2').text(coins.upgradeCost2);
    $('#clicks').text(coins.click);
    //Check something every time someone moves the mouse
    $(this).on('mousemove', function() {
        coins.checkUpgrade(); //Checks if there is any avaliable upgrade
    });

    //Add a coins per click
    $('#addCoins').on('click', function() {
        coins.stock += coins.click; //Add to the stock clicks
        coins.checkUpgrade();
        $('#counter').text(coins.stock); //Shows in the html the stock
    });

    
    //Upgrades coins per click
    $('#upgrade1').on('click', function() {
        coins.stock -= coins.upgradeCost1; //Rest the cost to the stock
        $('#counter').text(coins.stock);

        //JSON with the data of the object
        $.getJSON( "data/objects.json", function( data ) {    
            coins.click = data.broom.upgrade[coins.upgradeArray]; //Change the coins per click
            coins.upgradeCost1 = data.broom.cost[coins.upgradeArray]; //Change the cost of the upgrade
            $('#addCoins').prop('src', data.broom.img[coins.upgradeArray]) //Change the image file for the upgrade
            coins.upgradeArray += 1;    
            $('#clicks').text(coins.click); //Change the coins per click in the html
            $('#upgradeCost1').text(coins.upgradeCost1); //Change the cost of the upgrade in the html

            //Checks if there aren't any element in the array
            if (coins.upgradeArray >= data.broom.upgrade.length+1) {
                $('#upgrade1').remove(); //Disable the upgrade1 button
                coins.click = data.broom.upgrade[data.broom.upgrade.length-1]; //Left the upgrade with the last value of the array
            };
        });

    });

    // Upgrades coins per second
    $('#upgrade2').on('click', function() {
        coins.moreCoins += 1;
        coins.stock -= coins.upgradeCost2;
        coins.upgradeCost2 *= 2;
        $('#upgradeCost2').text(coins.upgradeCost2);
        $('#clickPerSec').text(coins.moreCoins);
        $('#counter').text(coins.stock);
        $('.house').append('<div class="sofa"></div>');

        // Starts the coins Interval
        if (!coins.finishInterval) {
            coins.coinsInterval();
            coins.finishInterval = true;
        };
    });
});
