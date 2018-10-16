/**
 * 
 */
window.onload = function() {
    // TODO:: Do your initialization job
	var email = localStorage.getItem("email");
	var password = localStorage.getItem("password");
	console.log(email);
	console.log(password);
    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });   
};