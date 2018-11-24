(function ($) {
    "use strict";

    $("#weedingPlace").click(function (e) {
        e.preventDefault();
        window.location.href = "../templates/mapUpdate.html";
    });

    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    });


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) === false){
                showValidate(input[i]);
                check=false;
            }
        }
        if (check === true) {
            var weddingDate = document.getElementById('weddingDate').value;
            var password = document.getElementById('password').value;
            var data = JSON.parse(localStorage.getItem('data'));
            var wedding = data.wedding;
            SoapCall(wedding.placeName,wedding.placeAddress,wedding.placeType,wedding.placeLat,wedding.placeLng,weddingDate,password);
            return false;
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
            hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('name') == 'weddingDate') {
            const weddingDateJSforma = new Date($(input).val().trim().replace(/-/g,"/"));
            const today = new Date();
            if(weddingDateJSforma<=today){
                return false;
            }
        }

        if($(input).val().trim() === ''){
            return false;
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }
    });

})(jQuery);

window.onload = function() {
    // TODO:: Do your initialization job
    var data = window.loadData();
    user = data.user;
    wedding = data.wedding;
    document.getElementById("name").innerHTML = user.firstName+" "+user.lastName;
    document.getElementById("weedingPlace").value = wedding.placeName;
    document.getElementById("weddingDate").value = convertDate(wedding.date);
    $('.input100').each(function(){
        if($(this).val().trim() !== "") {
            $(this).addClass('has-val');
        }
        else {
            $(this).removeClass('has-val');
        }
    });
    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                window.location.href = "../templates/account.html";
            } catch (ignore) {}
        }
    });
};
function SoapCall(placeName,placeAddress,placeType,placeLat,placeLng,weddingDate,password){
    var data = window.loadData();
    user = data.user;
    var url  = window.URLSERVER+"/user/updateWedding";
    var data = {};
    data.placeName  = placeName;
    data.placeAddress  = placeAddress;
    data.placeType  = placeType;
    data.placeLat  = placeLat;
    data.placeLng  = placeLng;
    data.weddingDate  = weddingDate;
    data.password  = password;
    data.user  = user;
    var json = JSON.stringify(data);
    var xhr = createXHR();
    xhr.open("POST", url, true);
    xhr.onreadystatechange  = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var wedding = JSON.parse(xhr.responseText);
                var data = JSON.parse(localStorage.getItem('data'));
                data.wedding = wedding.wedding;
                localStorage.setItem("data", JSON.stringify(data));
                window.location.href = "../templates/account.html";
            } else {
                var data = JSON.parse(xhr.responseText);
                alert(data.message);
            }
        }
    };
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send(json);
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
function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat);
    return [d.getFullYear(), pad(d.getMonth()+1),pad(d.getDate()) ].join('-');
}