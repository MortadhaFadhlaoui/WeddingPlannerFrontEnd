
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
        	var email = document.getElementById('email').value;
  		  	var password = document.getElementById('password').value;
  		 	localStorage.setItem("email", email);
  		 	localStorage.setItem("password", password);
    		SoapCall(email,password);
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
	let email = localStorage.getItem("email");
	let password = localStorage.getItem("password");
	console.log(email+password);
	document.getElementById('email').value = email;
	document.getElementById('password').value = password;
    $('.input100').each(function(){
        if($(this).val().trim() != "") {
            $(this).addClass('has-val');
        }
        else {
            $(this).removeClass('has-val');
        }
    });
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
            	window.location.href = "../index.html";
            } catch (ignore) {}
        }
    });
   // SoapCall(email,password);
};
function SoapCall(email,password){
	var url  = window.URLSERVER+"/user/login";
	console.log(url);
	var data = {};
	data.email  = email;
	data.password  = password;
	var json = JSON.stringify(data);
	var xhr = createXHR();
	xhr.open("POST", url, true);
	xhr.onreadystatechange  = function () {		
		 if (xhr.readyState === 4) {
		        if (xhr.status === 200) {
		        	 let data = JSON.parse(xhr.responseText);
                    localStorage.setItem("data", JSON.stringify(data));
		        	 console.log(data);
		        	window.location.href = "../templates/home.html";
		        } else if (xhr.status === 403) {
		        	 let data = JSON.parse(xhr.responseText);
		        	 alert(data.message);
                    let div = document.getElementById('isVerified');
                         div.innerHTML = "If you didn't receive Verification email";
                         $("#isVerified").show();
                         $("#resend").show();
		        }else {
                    let data = JSON.parse(xhr.responseText);
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
function resendMail() {
    const url  = window.URLSERVER+"/user/resend";
    let data = {};
    let email = document.getElementById('email').value;
    console.log(email);
    data.email  = email;
    var json = JSON.stringify(data);
    var xhr = createXHR();
    xhr.open("POST", url, true);
    xhr.onreadystatechange  = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                let div = document.getElementById('isVerified');
                div.innerHTML = data.message;
                $("#isVerified").show();
                $("#resend").hide();
            } else {
                let data = JSON.parse(xhr.responseText);
                alert(data.message);
            }
        }
    }
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send(json);
}