$(document).ready(function() {
    var housePrototype = function() {
        this.stock = 0; //Storage the coins
        this.moreCoins = 0; //Storage the coins per second
        this.click = 1; //Storage the coins per click
        this.upgradeCost1 = 20; //Storage the cost of the upgrade
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

        // Interval of coinss
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

    // Check something every time someone moves the mouse
    $(this).on('mousemove', function() {
        coins.checkUpgrade();
    });

    //  Add a coins per click
    $('#addCoins').on('click', function() {
        coins.stock += coins.click;
        coins.checkUpgrade();
        $('#counter').text(coins.stock);
    });

    // Upgrades coins per click
    $('#upgrade1').on('click', function() {
        coins.click += 1;
        coins.stock -= coins.upgradeCost1;
        coins.upgradeCost1 *= 2;
        $('#upgradeCost1').text(coins.upgradeCost1);
        $('#counter').text(coins.stock);
        $('#clicks').text(coins.click);
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
