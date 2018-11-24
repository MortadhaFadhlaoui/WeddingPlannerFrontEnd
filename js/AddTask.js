

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
        	var taskname = document.getElementById("taskname").value;
     	   var budget = document.getElementById("budget").value;
     	   var taskdate = document.getElementById("TaskDate").value;
     	   var description = document.getElementById("Description").value;
  		  	localStorage.setItem("taskname", taskname);
  		  	localStorage.setItem("budget", budget);
  		 	localStorage.setItem("TaskDate", taskdate);
  		 	localStorage.setItem("Description", description);
            var data = JSON.parse(localStorage.getItem('data'));
            var wedding = data.wedding;
  		 	SoapCall(taskname,budget,taskdate,description,wedding._id);
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
            if($(input).val().trim() == ''){
                return false;
            }
            if($(input).attr('name') == 'budget'){
                if ($(input).val().trim().match(/^\d+$/) === null){
                    console.log("okok");
                    return false;
                }
            }
            if($(input).attr('name') == 'taskname' || $(input).attr('name') == 'Description') {
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
            	window.location.href = "../templates/tasks.html";
            } catch (ignore) {}
        }
    });   
};
function SoapCall(taskname,budget,taskdate,description,WeddingID){
	var url  = window.URLSERVER+"/task/savetask";
	var data = {};
	data.TaskName = taskname;
	data.Budget  = budget;
	data.DateTask  = taskdate;
	data.Description  = description;
	data.WeddingID  = WeddingID;
	var json = JSON.stringify(data);
	var xhr = createXHR();
	xhr.open("POST", url, true);
	xhr.onreadystatechange  = function () {		
		 if (xhr.readyState === 4) {  		
		        if (xhr.status === 200) {  
		        	console.log(xhr.responseText);
                    window.location.href = "../templates/tasks.html";
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