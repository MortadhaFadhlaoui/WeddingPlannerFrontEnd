/**
 * 
 */

window.onload = function() {
    // TODO:: Do your initialization job
    // Animate loader off screen
	var data = window.loadData();
	var user = data.user;
	var wedding = data.wedding;
	var partner = data.partner;
    if (partner){
        document.getElementById("firstNamePartners").innerHTML = user.firstName+" & " +partner.firstName;
    }else {
        document.getElementById("firstNamePartners").innerHTML = user.firstName;
    }
    document.getElementById("weddingPlace").innerHTML = wedding.placeName;

    // Set the date we're counting down to
    var countDownDate = new Date(wedding.date).getTime();
    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("demo").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });   
};