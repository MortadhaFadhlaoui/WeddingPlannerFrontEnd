/**
 * 
 */
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
        	var email = localStorage.getItem("email");
    		var password = localStorage.getItem("password");
    		var firstname = localStorage.getItem("firstname");
    		var lastname = localStorage.getItem("lastname");
    		var weddingDate = localStorage.getItem("weddingDate");
    		var weddingplace = localStorage.getItem("weddingPlace");
    		var emailPartner = document.getElementById('emailPartner').value;
    		console.log(email);
    		console.log(password);
    		console.log(firstname);
    		console.log(lastname);
    		console.log(weddingDate);
    		console.log(weddingplace);
    		console.log(emailPartner);
    		SoapCall(firstname,lastname,email,emailPartner,password,weddingplace,weddingDate);
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

})(jQuery);
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
function SoapCall(firstName,lastName,email,emailPartner,password,place,date){
	var url  = window.URLSERVER+"/user/addWithWedding";
	var data = {};
	data.firstName = firstName;
	data.lastName  = lastName;
	data.email  = email;
	data.emailPartner  = emailPartner;
	data.password  = password;
	data.place  = place;
	data.date  = date;
	var json = JSON.stringify(data);
	var xhr = createXHR();
	xhr.open("POST", url, true);
	xhr.onreadystatechange  = function () {		
		 if (xhr.readyState === 4) {  		
		        if (xhr.status === 200) {  
		        	 var data = JSON.parse(xhr.responseText);
                    localStorage.setItem("data", data);
                    console.log(data);
                    window.location.href = "../../templates/home.html";
		        } else {  
				    alert("user already have a partner");					
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