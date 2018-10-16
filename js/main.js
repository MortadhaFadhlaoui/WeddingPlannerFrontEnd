window.onload = function() {
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });   
};
//Sample code
login = function() {
	window.location.href = "../templates/login.html";
	};
	
sign = function() {
	window.location.href = "../templates/inscription.html";
	};
	