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
    });


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
            var email = document.getElementById('updateEmail').value;
            var firstName = document.getElementById('firstname').value;
            var lastName = document.getElementById('lastname').value;
            var password = document.getElementById('password').value;
            SoapCall(firstName,lastName,password,email);
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
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
        if($(input).attr('name') == 'password' || $(input).attr('name') == 'lastname' || $(input).attr('name') == 'firstname') {
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
    var data = window.loadData();
    user = data.user;
    document.getElementById("name").innerHTML = user.firstName+" "+user.lastName;
    document.getElementById("updateEmail").value = user.email;
    document.getElementById("firstname").value = user.firstName;
    document.getElementById("lastname").value = user.lastName;

    $('.input100').each(function(){
        if($(this).val().trim() != "") {
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
function SoapCall(firstName,lastName,password,email){
    var data = window.loadData();
    user = data.user;
    var url  = window.URLSERVER+"/user/updateUser";
    console.log(url);
    var data = {};
    data.firstName  = firstName;
    data.lastName  = lastName;
    data.password  = password;
    data.email  = email;
    data.user  = user;
    var json = JSON.stringify(data);
    var xhr = createXHR();
    xhr.open("POST", url, true);
    xhr.onreadystatechange  = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var user = JSON.parse(xhr.responseText);
                var data = JSON.parse(localStorage.getItem('data'));
                data.user = user.user;
                localStorage.setItem("data", JSON.stringify(data));
                window.location.href = "../templates/account.html";
            } else {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                console.log(data.message);
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
