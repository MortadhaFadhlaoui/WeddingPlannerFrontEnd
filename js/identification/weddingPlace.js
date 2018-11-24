/**
 * 
 */

(function ($) {
    "use strict";
    /*==================================================================
    [ autocomplete input ]*/
    var searchedplace = '' ;
	var autocomplete = new kt.OsmNamesAutocomplete(
		        'search', 'https://geocoder.tilehosting.com/', 'cggk5z1dop3FWqCNuurn');
		    autocomplete.registerCallback(function(item) {
		        var json = JSON.stringify(item, ' ', 2);
		        const place = JSON.parse(json);
		        console.log(json);
		        console.log(place.display_name);
		        searchedplace = place.display_name;
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
        console.log(autocomplete);
        if (check == true) {
          	localStorage.setItem("weddingPlace", searchedplace);
        	window.location.href = "../templates/invitePartner.html";
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
   
            if($(input).val().trim() == '' || searchedplace == ''){
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
        		window.location.href = "../templates/weddingDate.html";
            } catch (ignore) {}
        }
    });   
};

function pickPlace() {
    window.location.href = "../templates/mapWeddingPlace.html";
}