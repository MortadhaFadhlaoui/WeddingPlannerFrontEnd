(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() !=="") {
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
        if (check == true) {
            var password = document.getElementById('password').value;
            UploadImage(previewFile(),password);

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
        if(showPass === 0) {
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
    console.log(user);
    document.getElementById("name").innerHTML = user.firstName+" "+user.lastName;
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

    previewFile();  //calls the function named previewFile()

};
function SoapCall(image,password){
    var data = window.loadData();
    user = data.user;
    const url  = window.URLSERVER+"/user/updatePhoto";
    console.log(url);
    var data = {};
    console.log(image);
    data.image  = image;
    data.password  = password;
    data.user  = user;
    var json = JSON.stringify(data);
    var xhr = createXHR();
    xhr.open("POST", url, true);
    xhr.onreadystatechange  = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var user = JSON.parse(xhr.responseText);
                var data = JSON.parse(localStorage.getItem('data'));
                console.log(user.user.image);
                console.log("photo test");
                data.user = user.user;
                localStorage.setItem("data", JSON.stringify(data));
                console.log(data);
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

function UploadImage(image,password){
    const url  = window.URLSERVER+"/image/upload";
    var formData = new FormData();
    formData.append("file", image);
    console.log(url);
    let xhr = createXHR();
    xhr.open("POST", url, true);
    xhr.onreadystatechange  = function () {
        if (xhr.readyState === 4) {
            var data = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
                SoapCall(data,password);
            } else {
                console.log(data);
            }
        }
    };
    xhr.send(formData);
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
function previewFile(){
	$('#exampleModal').modal('hide')
	 let file;
	 let gallery    = document.getElementById('gallery').files[0]; //sames as here
	 let camera    = document.getElementById('camera').files[0]; //sames as here
	 if (gallery) {
		file = gallery;
	}else{
		file = camera;
	}
    console.log(file);
    let reader  = new FileReader();
    if (file){
    if ( CheckFileName(file.name)){
        reader.onloadend = function () {
            $("#image").attr("src",reader.result) ;
        };

        if (file) {
            reader.readAsDataURL(file); //reads the data as a URL
        } else {
            $("#image").attr("src","../assets/images/placeholder.png") ;
        }
        return file;
    }
    }
}
function CheckFileName(fileName) {


    if (fileName === "")
    {
        alert("Browse to upload a Image");
        return false;
    }
    else if (fileName.split(".")[1].toUpperCase() === "PNG" || fileName.split(".")[1].toUpperCase() === "JPG" || fileName.split(".")[1].toUpperCase() === "JPEG")
    {
        return true;
    }
    else
    {
        alert("Not a Image File !");
        return false;
    }

    return true;

}
