/**
 * 
 */
window.onload = function() {
    // TODO:: Do your initialization job
	var data = JSON.parse(localStorage.getItem('data'));
    console.log(data);
    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });   
};