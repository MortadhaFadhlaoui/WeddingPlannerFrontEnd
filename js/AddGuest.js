

(function ($) {
    "use strict";


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
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        if (check == true) {
            var guestname = document.getElementById("guestname").value;
            var guestemail = document.getElementById("guestemail").value;
            localStorage.setItem("guestname", guestname);
            localStorage.setItem("guestemail", guestemail);
            var data = JSON.parse(localStorage.getItem('data'));
            var wedding = data.wedding;
            var user = data.user;
            var UserName = user.firstName +' '+user.lastName;
            SoapCall(guestname,guestemail,wedding._id,UserName);
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
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'guestemail') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        if($(input).val().trim() == ''){
            return false;
        }
        if($(input).attr('name') == 'guestname') {
            if($(input).val().trim().length<4) {
                return false;
            }
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

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                window.location.href = "../templates/guests.html";
            } catch (ignore) {}
        }
    });
};
function SoapCall(guestname,guestemail,WeddingID,UserName){
    var url  = window.URLSERVER+"/guest/saveGuest";
    var data = {};
    data.GuestName = guestname;
    data.Email  = guestemail;
    data.WeddingID  = WeddingID;
    data.UserName  = UserName;
    var json = JSON.stringify(data);
    var xhr = createXHR();
    xhr.open("POST", url, true);
    xhr.onreadystatechange  = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                window.location.href = "../templates/guests.html";
            } else {
                alert(xhr.responseText);
            }
        }
    }
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send(json);
}
function createXHR() {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
        console.log("it's an IE!");
    }else
    {
        throw new Error("Could not create XMLHttpRequest object.");
    }
    return xhr;
}