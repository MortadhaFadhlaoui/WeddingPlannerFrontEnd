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
            var oldPassword = document.getElementById('oldPassword').value;
            var newPassword = document.getElementById('newPassword').value;
            var repeatPassword = document.getElementById('repeatPassword').value;
            SoapCall(oldPassword,newPassword,repeatPassword);
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
        if($(input).val().trim() === ''){
            return false;
        }
        if($(input).attr('name') === 'repeatPassword' || $(input).attr('name') === 'newPassword' || $(input).attr('name') === 'oldPassword') {
            if($(input).val().trim().length<4) {
                return false;
            }
        }
        if(document.getElementsByName("newPassword")[0].value !== document.getElementsByName("repeatPassword")[0].value ) {
            if($(input).attr('name') === 'repeatPassword'){
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
function SoapCall(oldPassword,newPassword,repeatPassword){
    var data = window.loadData();
    user = data.user;
    var url  = window.URLSERVER+"/user/updatePassword";
    console.log(url);
    var data = {};
    data.oldPassword  = oldPassword;
    data.newPassword  = newPassword;
    data.repeatPassword  = repeatPassword;
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
