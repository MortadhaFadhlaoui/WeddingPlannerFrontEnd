window.onload = function() {
    // TODO:: Do your initialization job
    // Animate loader off screen
    var data = window.loadData();
    user = data.user;
    document.getElementById("name").innerHTML = user.firstName+" "+user.lastName;
    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                window.location.href = "../templates/home.html";
            } catch (ignore) {}
        }
    });
};