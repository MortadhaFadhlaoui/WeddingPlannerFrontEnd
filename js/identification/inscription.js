

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
  		  	var firstname = document.getElementById('firstname').value;
  		  	var lastname = document.getElementById('lastname').value;
  		  	var password = document.getElementById('password').value;
  		  	localStorage.setItem("email", email);
  		  	localStorage.setItem("firstname", firstname);
  		 	localStorage.setItem("lastname", lastname);
  		 	localStorage.setItem("password", password);
  		 	SoapCall(email,firstname,lastname,password);        	
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

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
            	window.location.href = "../index.html";
            } catch (ignore) {}
        }
    });   
};
function SoapCall(email,firstName,lastName,password){
	var url  = window.URLSERVER+"/user/checkEmail";
	var data = {};
	data.firstName = firstName;
	data.lastName  = lastName;
	data.email  = email;
	data.password  = password;
	var json = JSON.stringify(data);
	var xhr = createXHR();
	xhr.open("POST", url, true);
	xhr.onreadystatechange  = function () {		
		 if (xhr.readyState === 4) {  		
		        if (xhr.status === 200) {  
		        	console.log(xhr.responseText);
		        	if (xhr.responseText == "email already exists") {
		        		alert("Email already exists, try to connect!");
		        		window.location.href = "../templates/login.html";
					}else if(xhr.responseText == "Welcome Partner"){
		        		alert("Welcome Partner");
		        		window.location.href = "../templates/login.html";
					}
		        } else {  
		        	if (xhr.responseText == "email does not exists") {
		        		window.location.href = "../templates/weddingDate.html";
					}else{
		        		alert("Somthing wrong");
					}
		           console.log("Error", xhr.status);  
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