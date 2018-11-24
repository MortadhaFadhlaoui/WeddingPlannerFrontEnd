/*
	Parallelism by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
window.onload = function() {
    // TODO:: Do your initialization job
    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                window.location.href = "../templates/home.html";
            } catch (ignore) {}
        }
    });
};

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '582897705463847',
      xfbml      : true,
      version    : 'v3.2'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


(function($) {
    $(document).bind("mobileinit",function(){
        $.mobile.allowCrossDomainPages(true);
    });
    window.URLSERVER = "https://weddingnodeserver.herokuapp.com";
    let data = JSON.parse(localStorage.getItem('data'));
    let user = data.user;

    document.getElementById("userName").innerHTML = user.firstName+" "+user.lastName;
    document.getElementById("email").innerHTML = user.email;
    
    //Image Name when clicked
    var ImageName='';
    var ImageURL;
    if (user.image){
        $("#image").attr("src",window.URLSERVER+"/assets/"+ user.image) ;
        $("#pic").attr("src",window.URLSERVER+"/assets/"+ user.image) ;
        $("#pic1").attr("src",window.URLSERVER+"/assets/"+ user.image) ;
    }
    let wedding = data.wedding;
    var items = document.getElementById("items");
    if (items) {
    	   if (wedding.album){
    	        let myHTML = '';
    	        for (let i = 0; i < wedding.album.length; i++) {
    	            myHTML += '<article id="article" class="item thumb span-1"><img data-toggle="modal" data-target="#exampleModal" class="deleteId"  src='+window.URLSERVER+"/assets/"+ wedding.album[i]+' alt=""></a></article>';
    	        }
    	        items.innerHTML = myHTML    ;
    	    }	
	}
    var	$window = $(window),
        $body = $('body'),
        $wrapper = $('#wrapper'),
        $main = $('#main'),
        settings = {

            // Keyboard shortcuts.
            keyboardShortcuts: {

                // If true, enables scrolling via keyboard shortcuts.
                enabled: true,

                // Sets the distance to scroll when using the left/right arrow keys.
                distance: 50

            },

            // Scroll wheel.
            scrollWheel: {

                // If true, enables scrolling via the scroll wheel.
                enabled: true,

                // Sets the scroll wheel factor. (Ideally) a value between 0 and 1 (lower = slower scroll, higher = faster scroll).
                factor: 1

            },

            // Scroll zones.
            scrollZones: {

                // If true, enables scrolling via scroll zones on the left/right edges of the scren.
                enabled: true,

                // Sets the speed at which the page scrolls when a scroll zone is active (higher = faster scroll, lower = slower scroll).
                speed: 15

            }

        };

    // Breakpoints.
    breakpoints({
        xlarge:  [ '1281px',  '1680px' ],
        large:   [ '981px',   '1280px' ],
        medium:  [ '737px',   '980px'  ],
        small:   [ '481px',   '736px'  ],
        xsmall:  [ null,      '480px'  ],
    });

    // Tweaks/fixes.

    // Mobile: Revert to native scrolling.
    if (browser.mobile) {

        // Disable all scroll-assist features.
        settings.keyboardShortcuts.enabled = false;
        settings.scrollWheel.enabled = false;
        settings.scrollZones.enabled = false;

        // Re-enable overflow on main.
        $main.css('overflow-x', 'auto');

    }

    // IE: Fix min-height/flexbox.
    if (browser.name == 'ie')
        $wrapper.css('height', '100vh');

    // iOS: Compensate for address bar.
    if (browser.os == 'ios')
        $wrapper.css('min-height', 'calc(100vh - 30px)');

    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Items.

    // Assign a random "delay" class to each thumbnail item.
    $('.item.thumb').each(function() {
        $(this).addClass('delay-' + Math.floor((Math.random() * 6) + 1));
    });

    // IE: Fix thumbnail images.
    if (browser.name == 'ie')
        $('.item.thumb').each(function() {

            var $this = $(this),
                $img = $this.find('img');

            $this
                .css('background-image', 'url(' + $img.attr('src') + ')')
                .css('background-size', 'cover')
                .css('background-position', 'center');

            $img
                .css('opacity', '0');

        });

    // Poptrox.
    $main.poptrox({
        onPopupOpen: function() { $body.addClass('is-poptrox-visible'); },
        onPopupClose: function() { $body.removeClass('is-poptrox-visible'); },
        overlayColor: '#1a1f2c',
        overlayOpacity: 0.75,
        popupCloserText: '',
        popupLoaderText: '',
        selector: '.item.thumb a.image',
        caption: function($a) {
            return $a.prev('h2').html();
        },
        usePopupDefaultStyling: false,
        usePopupCloser: false,
        usePopupCaption: true,
        usePopupNav: true,
        windowMargin: 50
    });

    breakpoints.on('>small', function() {
        if ($main[0] !=null){
            $main[0]._poptrox.windowMargin = 50;
        }
    });

    breakpoints.on('<=small', function() {
        if ($main[0] !=null){
            $main[0]._poptrox.windowMargin = 0;
        }
    });

    // Keyboard shortcuts.
    if (settings.keyboardShortcuts.enabled)
        (function() {

            $window

            // Keypress event.
                .on('keydown', function(event) {

                    var scrolled = false;

                    if ($body.hasClass('is-poptrox-visible'))
                        return;

                    switch (event.keyCode) {

                        // Left arrow.
                        case 37:
                            $main.scrollLeft($main.scrollLeft() - settings.keyboardShortcuts.distance);
                            scrolled = true;
                            break;

                        // Right arrow.
                        case 39:
                            $main.scrollLeft($main.scrollLeft() + settings.keyboardShortcuts.distance);
                            scrolled = true;
                            break;

                        // Page Up.
                        case 33:
                            $main.scrollLeft($main.scrollLeft() - $window.width() + 100);
                            scrolled = true;
                            break;

                        // Page Down, Space.
                        case 34:
                        case 32:
                            $main.scrollLeft($main.scrollLeft() + $window.width() - 100);
                            scrolled = true;
                            break;

                        // Home.
                        case 36:
                            $main.scrollLeft(0);
                            scrolled = true;
                            break;

                        // End.
                        case 35:
                            $main.scrollLeft($main.width());
                            scrolled = true;
                            break;

                    }

                    // Scrolled?
                    if (scrolled) {

                        // Prevent default.
                        event.preventDefault();
                        event.stopPropagation();

                        // Stop link scroll.
                        $main.stop();

                    }

                });

        })();

    // Scroll wheel.
    if (settings.scrollWheel.enabled)
        (function() {

            // Based on code by @miorel + @pieterv of Facebook (thanks guys :)
            // github.com/facebook/fixed-data-table/blob/master/src/vendor_upstream/dom/normalizeWheel.js
            var normalizeWheel = function(event) {

                var	pixelStep = 10,
                    lineHeight = 40,
                    pageHeight = 800,
                    sX = 0,
                    sY = 0,
                    pX = 0,
                    pY = 0;

                // Legacy.
                if ('detail' in event)
                    sY = event.detail;
                else if ('wheelDelta' in event)
                    sY = event.wheelDelta / -120;
                else if ('wheelDeltaY' in event)
                    sY = event.wheelDeltaY / -120;

                if ('wheelDeltaX' in event)
                    sX = event.wheelDeltaX / -120;

                // Side scrolling on FF with DOMMouseScroll.
                if ('axis' in event
                    &&	event.axis === event.HORIZONTAL_AXIS) {
                    sX = sY;
                    sY = 0;
                }

                // Calculate.
                pX = sX * pixelStep;
                pY = sY * pixelStep;

                if ('deltaY' in event)
                    pY = event.deltaY;

                if ('deltaX' in event)
                    pX = event.deltaX;

                if ((pX || pY)
                    &&	event.deltaMode) {

                    if (event.deltaMode == 1) {
                        pX *= lineHeight;
                        pY *= lineHeight;
                    }
                    else {
                        pX *= pageHeight;
                        pY *= pageHeight;
                    }

                }

                // Fallback if spin cannot be determined.
                if (pX && !sX)
                    sX = (pX < 1) ? -1 : 1;

                if (pY && !sY)
                    sY = (pY < 1) ? -1 : 1;

                // Return.
                return {
                    spinX: sX,
                    spinY: sY,
                    pixelX: pX,
                    pixelY: pY
                };

            };

            // Wheel event.
            $body.on('wheel', function(event) {

                // Disable on <=small.
                if (breakpoints.active('<=small'))
                    return;

                // Prevent default.
                event.preventDefault();
                event.stopPropagation();

                // Stop link scroll.
                $main.stop();

                // Calculate delta, direction.
                var	n = normalizeWheel(event.originalEvent),
                    x = (n.pixelX != 0 ? n.pixelX : n.pixelY),
                    delta = Math.min(Math.abs(x), 150) * settings.scrollWheel.factor,
                    direction = x > 0 ? 1 : -1;

                // Scroll page.
                $main.scrollLeft($main.scrollLeft() + (delta * direction));

            });

        })();

    // Scroll zones.
    if (settings.scrollZones.enabled)
        (function() {

            var	$left = $('<div class="scrollZone left"></div>'),
                $right = $('<div class="scrollZone right"></div>'),
                $zones = $left.add($right),
                paused = false,
                intervalId = null,
                direction,
                activate = function(d) {

                    // Disable on <=small.
                    if (breakpoints.active('<=small'))
                        return;

                    // Paused? Bail.
                    if (paused)
                        return;

                    // Stop link scroll.
                    $main.stop();

                    // Set direction.
                    direction = d;

                    // Initialize interval.
                    clearInterval(intervalId);

                    intervalId = setInterval(function() {
                        $main.scrollLeft($main.scrollLeft() + (settings.scrollZones.speed * direction));
                    }, 25);

                },
                deactivate = function() {

                    // Unpause.
                    paused = false;

                    // Clear interval.
                    clearInterval(intervalId);

                };

            $zones
                .appendTo($wrapper)
                .on('mouseleave mousedown', function(event) {
                    deactivate();
                });

            $left
                .css('left', '0')
                .on('mouseenter', function(event) {
                    activate(-1);
                });

            $right
                .css('right', '0')
                .on('mouseenter', function(event) {
                    activate(1);
                });

            $body
                .on('---pauseScrollZone', function(event) {

                    // Pause.
                    paused = true;

                    // Unpause after delay.
                    setTimeout(function() {
                        paused = false;
                    }, 500);

                });

        })();   
   holdPress($(".deleteId"))
})(jQuery);


function SoapCall(images){
    var data = window.loadData();
    wedding = data.wedding;
    const url  = window.URLSERVER+"/user/updateAlbum";
    var data = {};
    data.images  = images;
    data.wedding  = wedding;
    var json = JSON.stringify(data);
    var xhr = createXHR();
    xhr.open("POST", url, true);
    xhr.onreadystatechange  = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var wedding = JSON.parse(xhr.responseText);
                var data = JSON.parse(localStorage.getItem('data'));
                console.log(wedding.wedding.album);
                data.wedding = wedding.wedding;
                localStorage.setItem("data", JSON.stringify(data));
                window.location.href = "../templates/gallery.html";
            } else {
                var data = JSON.parse(xhr.responseText);
                console.log(data.message);
            }
        }
    };
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send(json);
}

function previewFile(){
            let files    = document.querySelector('input[type=file]').files; //sames as here
            if (files){
                for (var i = 0; i < files.length; i++) { //for multiple files
                    if (CheckFileName(files[i].name)){
                        if (i===files.length-1){
                            alert("Image Uploaded !");
                            UploadImage(files);
                        }
                    }else
                    {
                        alert("Not a Image File !");
                        return true;
                    }
                }
            }

}
function CheckFileName(fileName) {


    if (fileName === "")
    {
        alert("Browse to upload a Image");
        return false;
    }
    else if (fileName.split(".")[1].toUpperCase() === "PNG" || fileName.split(".")[1].toUpperCase() === "JPG" || fileName.split(".")[1].toUpperCase() === "JPEG")
    {
        return true;
    }
    else
    {
        return false;
    }

    return true;

}


function UploadImage(images){
    const url  = window.URLSERVER+"/image/uploadMulti";
    var formData = new FormData();

    for (var i=0; i<images.length;i++){
        formData.append("file "+i , images[i]);
    }
    console.log(url);
    let xhr = createXHR();
    xhr.open("POST", url, true);
    xhr.onreadystatechange  = function () {
        if (xhr.readyState === 4) {
            var data = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
                console.log(data);
                SoapCall(data);
            } else {
                console.log(data);
            }
        }
    };
    xhr.send(formData);
}
function createXHR() {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
        console.log("not IE!");
    }else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
        console.log("it's an IE!");
    }else
    {
        throw new Error("Could not create XMLHttpRequest object.");
    }
    return xhr;
}
function deleteImage() {
    if (confirm("This image will be deleted, you are sure!")){
        deleteImageFromServer(ImageName);
    }
}
function deleteImageFromServer(imageName) {
    console.log("Hello");
    var data = window.loadData();
    wedding = data.wedding;
    const url  = window.URLSERVER+"/user/deleteImage";
    var data = {};
    data.imageName  = imageName;
    data.wedding  = wedding;
    var json = JSON.stringify(data);
    var xhr = createXHR();
    xhr.open("POST", url, true);
    xhr.onreadystatechange  = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var wedding = JSON.parse(xhr.responseText);
                var data = JSON.parse(localStorage.getItem('data'));
                console.log(wedding.wedding.album);
                data.wedding = wedding.wedding;
                localStorage.setItem("data", JSON.stringify(data));
                window.location.href = "../templates/gallery.html";
            } else {
                var data = JSON.parse(xhr.responseText);
                console.log(data.message);
            }
        }
    };
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send(json);
}

function holdPress(id) {
    // how many milliseconds is a long press?
    let longPress = 500;
    // holds the start time
    let start;

    id.on( 'mousedown', function( e ) {
        start = new Date().getTime();
    } );

    id.on( 'mouseleave', function( e ) {
        start = 0;
    } );

    id.on( 'mouseup', function( e ) {
        if ( new Date().getTime() >= ( start + longPress )  ) {
            console.log(start);
        } else {        
        	let array = this.src.split('/');
        	ImageName = array[4];
        	ImageURL = this;
        }
    } );
}

// save image local folder
function save(){	
		$('#exampleModal').modal('hide');	
        data = getBase64Image(ImageURL.src);
}

// share fcb function
function goShare() {
    FB.ui({
      method: 'share',
      action_type: 'og.likes',
      action_properties: JSON.stringify({
          object: {
              'og:url': window.URLSERVER,
              'og:title': "hello there",
              'og:description': "just have fun",
              'og:og:image:width': '2560',
              'og:image:height': '960',
              'og:image': ImageURL.src
           }
      })
 }, function(response){
      // Debug response (optional)
      console.log(response);
 });
}


// Generate dataURL from src with canvas
function getBase64Image(url) {
	 var img = new Image();

	    img.setAttribute('crossOrigin', 'anonymous');

	    img.onload = function () {
	        var canvas = document.createElement("canvas");
	        canvas.width =this.width;
	        canvas.height =this.height;

	        var ctx = canvas.getContext("2d");
	        ctx.drawImage(this, 0, 0);

	        var dataURL = canvas.toDataURL("image/png");

	        var data = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
	        console.log(data);
	        var filename = "IMAGE_" + Date.now().toString() + ".png";

            onerror = function(e) {
                alert("Image not saved");
                console.log(e.name + " : " + e.message)
            };

	        onsuccess = function(dir) {
	              var file = dir.createFile(filename);
	              file.openStream("w", function (stream) {
	                  stream.writeBase64(data);
	                  stream.close();
	                  tizen.content.scanFile(file.toURI());
	                  alert("Image saved");
	              }, onerror, "UTF-8");
	        },

	    tizen.filesystem.resolve("images", onsuccess, onerror, "rw")
	    };

	    img.src = url;
}
$(document).bind("mobileinit",function(){
    $.mobile.allowCrossDomainPages(true);
});