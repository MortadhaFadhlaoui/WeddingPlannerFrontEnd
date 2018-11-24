
window.onload = function() {
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                window.location.href = "../templates/weddingPlace.html";
            } catch (ignore) {}
        }
    });
};