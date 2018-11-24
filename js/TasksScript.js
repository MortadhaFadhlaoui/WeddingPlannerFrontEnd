window.onload = function() {
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                window.location.href = "../templates/home.html";
            } catch (ignore) {}
        }
    });
};

function clickMe(cid) {
    localStorage.setItem("taskid", cid)
//	window.location.href = "TaskDetails.html";


    alertify.confirm("Would You like to delete this Task",
        function(){

            $.ajax({
                type: "GET",
                url: 'https://weddingnodeserver.herokuapp.com/task/deleteTask?taskid='+cid,
                contentType : 'application/json',
                success: function (response) {
                    console.log(response);
                    window.location.reload()
                }, error: function (error) {
                    console.log(error);

                }

            });
            alertify.success('Ok');
        },
        function(){
            alertify.error('Cancel');
        });
}


$(document).ready(function (e) {
    var dataa = JSON.parse(localStorage.getItem('data'));
    console.log(dataa);
    var user = dataa.user;
    var wedding = dataa.wedding;
    if (user.image){
        $("#image").attr("src",window.URLSERVER+"/assets/"+ user.image) ;
        $("#pic").attr("src",window.URLSERVER+"/assets/"+ user.image) ;
        $("#pic1").attr("src",window.URLSERVER+"/assets/"+ user.image) ;
    }
    document.getElementById("userName").innerHTML = user.firstName+" "+user.lastName;
    document.getElementById("email").innerHTML = user.email;
	var data = $(this).serializeArray();
	var inputs = {};
	$.each(data, function (k, v) {
		inputs[v.name] = v.value;
	});

	$.ajax({
		type: "GET",
		url: 'https://weddingnodeserver.herokuapp.com/task/getTasks?WeddingID='+wedding._id,
		data: JSON.stringify(inputs),
		contentType: 'application/json',
		success: function (response) {
				var listContainer = document.createElement('div');
				document.getElementById('tasks').appendChild(listContainer);
				var listElement = document.createElement('ul');
				listContainer.appendChild(listElement);

				for (var key in response.tasks) {

var  datea =  new Date(response.tasks[key].DateTask).toDateString();
var checked = new Date(response.tasks[key].DateTask) ;
var now = new Date();
now.setHours(0,0,0,0);
if (checked<now){
					var html = [
								'<a id="' + response.tasks[key]._id + '" href="javascript:void(0)" onclick="clickMe(this.id)">',
								'<div class="card u-clearfix">',
								'<div class="col-sm-5 wthree-news-img">',
								'<div class="card-media-preview u-flex-center">',
								'<svg fill="#ffffff" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">',
								'<path d="M8 5v14l11-7z"/>',
								'<path d="M0 0h24v24H0z" fill="none"/>',
								'</svg>',
								'</div>',
								'<u><span class="card-media-tag card-media-tag-orange">' + response.tasks[key].TaskName + '</span></u>',
								'</div>',
								'</br>',
								'<div class="card-button card-button-link">',
								'<i aria-hidden="true"></i>' + response.tasks[key].Budget,
								'</br>',
								'<i class="fa fa-clock-o" aria-hidden="true"></i>' +datea,
								'</br>',
								'<i aria-hidden="true"></i>' + response.tasks[key].Description,
								'</div>',
								'</div>',
								'</div>',
								'</a>',
					].join('');


					var div = document.createElement('div');
					div.innerHTML = html;
					listContainer.appendChild(div);
}else {
    var html = [
        '<a id="' + response.tasks[key]._id + '" href="javascript:void(0)" onclick="clickMe(this.id)">',
        '<div class="card u-clearfix">',
        '<div class="col-sm-5 wthree-news-img">',
        '<div class="card-media-preview u-flex-center">',
        '<svg fill="#ffffff" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">',
        '<path d="M8 5v14l11-7z"/>',
        '<path d="M0 0h24v24H0z" fill="none"/>',
        '</svg>',
        '</div>',
        '<u><span class="card-media-tag card-media-tag-brown">' + response.tasks[key].TaskName + '</span></u>',
        '</div>',
        '</br>',
        '<div class="card-button card-button-link">',
        '<i aria-hidden="true"></i>' + response.tasks[key].Budget,
        '</br>',
        '<i class="fa fa-clock-o" aria-hidden="true"></i>' +datea,
        '</br>',
        '<i aria-hidden="true"></i>' + response.tasks[key].Description,
        '</div>',
        '</div>',
        '</div>',
        '</a>',
    ].join('');


    var div = document.createElement('div');
    div.innerHTML = html;
    listContainer.appendChild(div);
}

				}




		}, error: function (error) {
			console.log(error);
			alert(error);
		}

	});

});


function newt() {
    window.location.href = "../templates/newtask.html";
}



