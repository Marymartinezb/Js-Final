$(document).ready(function() {
    var stock = 0; //Storage the cookies
    var moreCookies = 0; //Storage the cookies per second
    var click = 1; //Storage the cookies per click
    var finishInterval = false; //Finished the Interval

    // Checks if the stock can enable the upgrades
    var checkUpgrade = function checkUpgrade() {
        if (stock >= 20) {
            $('#upgrade').prop('disabled', false);
        }
        else {
            $('#upgrade').prop('disabled', true);
        }

        if (stock >= 35){
            $('#upgrade2').prop('disabled', false);
        }
        else {
            $('#upgrade2').prop('disabled', true);
        }
    };

    // Interval of cookies
    var cookieInterval = function() {
        var cookieIntervalId = setInterval(function() {
            checkUpgrade();
            stock += moreCookies;
            $('#counter').text(stock);
        }, 1000);
    };

    // Check something every time someone moves the mouse
    $(this).on('mousemove', function() {
        checkUpgrade();
    });

    //  Add a cookie per click
    $('#addCookie').on('click', function() {
        stock += click;
        $('#counter').text(stock);
    });

    // Upgrades cookies per second
    $('#upgrade').on('click', function() {
        moreCookies += 1;
        stock -= 20;
        $('#clickPerSec').text(moreCookies);
        $('#counter').text(stock);

        // Starts the cookie Interval
        if (!finishInterval) {
            cookieInterval();
        };
        
        finishInterval = true;
    });

    // Upgrades cookies per click
    $('#upgrade2').on('click', function() {
        stock -= 35;
        click += 1;
        $('#counter').text(stock);
    });
});
