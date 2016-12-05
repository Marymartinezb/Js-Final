$(document).ready(function() {
    var housePrototype = function() {
        this.stock = 0; //Storage the coins
        this.moreCoins = 0; //Storage the coins per second
        this.click = 1; //Storage the coins per click
        this.upgradeArray1 = 0; //Change the element in the array
        this.upgradeArray2 = 0; //Change the element in the array
        this.upgradeArray3 = 0; //Change the element in the array
        this.upgradeArray4 = 0; //Change the element in the array
        this.upgradeCost1 = 25; //Storage the cost of the upgrade
        this.upgradeCost2 = 50; //Storage the cost of the sofa
        this.upgradeCost3 = 100; //Storage the cost of the bed
        this.upgradeCost4 = 150; //Storage the cost of the bed
        this.finishInterval = true; //Finished the Interval

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
                coins.stock += coins.moreCoins;
                $('#counter').text(coins.stock);
            }, 1000);
        };
    };

    var coins = new housePrototype(); //Creates a new instance of housePrototype

    //Set the initial costs of the upgrades
    $('#upgradeCost1').text(coins.upgradeCost1);
    $('#upgradeCost2').text(coins.upgradeCost2);
    $('#upgradeCost3').text(coins.upgradeCost3);
    $('#upgradeCost4').text(coins.upgradeCost4);
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
            if (coins.upgradeArray1 >= data.broom.upgrade.length+1) {
                $('#upgrade1').remove(); //Remove the upgrade1 button
                coins.click = data.broom.upgrade[data.broom.upgrade.length-1]; //Left the upgrade with the last value of the array
            };
            coins.checkUpgrade();
        });
    });

    // Upgrades sofa
    $('#upgrade2').on('click', function() {
        $('.house').append('<div class="sofa"></div>');

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
            coins.upgradeArray2 += 1;
            //Checks if there aren't any element in the array
            if (coins.upgradeArray2 >= data.sofa.upgrade.length) {
                $('#upgrade2').remove(); //Remove the upgrade2 button
                $('clickPerSec').text(coins.moreCoins);
            };
            coins.checkUpgrade();
        });
    });

    // Upgrades Bed
    $('#upgrade3').on('click', function() {
        $('.house').append('<div class="bed"></div>');

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
            coins.upgradeArray3 += 1;
            //Checks if there aren't any element in the array
            if (coins.upgradeArray3 >= data.bed.upgrade.length) {
                $('#upgrade3').remove(); //Disable the upgrade3 button
                $('clickPerSec').text(coins.moreCoins);
            };
            coins.checkUpgrade();
        });
    });

    // Upgrades TV
    $('#upgrade4').on('click', function() {
        $('.house').append('<div class="tv"></div>');

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
            coins.upgradeArray4 += 1;
            //Checks if there aren't any element in the array
            if (coins.upgradeArray4 >= data.tv.upgrade.length) {
                $('#upgrade4').remove(); //Disable the upgrade4 button
                $('clickPerSec').text(coins.moreCoins);
            };
            coins.checkUpgrade();
        });
    });
});