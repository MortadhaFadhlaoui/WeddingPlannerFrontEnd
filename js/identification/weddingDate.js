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
        	var weddingDate = document.getElementById('weddingDate').value;
    	  	localStorage.setItem("weddingDate", weddingDate);
    		window.location.href = "../templates/weddingPlace.html";
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
        var weddingDate = document.getElementById('weddingDate').value;
        var weddingDateJSforma = new Date($(input).val().trim().replace(/-/g,"/"));
        var today = new Date();  
            if($(input).val().trim() == '' || weddingDateJSforma<=today){
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

})(jQuery);
window.onload = function() {
    // TODO:: Do your initialization job
	
    // add eventListener for tizenhwkey	
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
        		window.location.href = "../templates/inscription.html";
            } catch (ignore) {}
        }
    });   
};