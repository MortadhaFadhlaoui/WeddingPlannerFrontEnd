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
    localStorage.setItem("guestid", cid);
//	window.location.href = "TaskDetails.html";


    alertify.confirm("Would You like to delete this Guest",
        function(){

            $.ajax({
                type: "GET",
                url: 'https://weddingnodeserver.herokuapp.com/guest/deleteGuest?guestid='+cid,
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
    $.ajax({
        type: "GET",
        url: 'https://weddingnodeserver.herokuapp.com/guest/getGuests?WeddingID='+wedding._id,
        contentType: 'application/json',
        success: function (response) {
            var listContainer = document.createElement('div');
            document.getElementById('guests').appendChild(listContainer);
            var listElement = document.createElement('ul');
            listContainer.appendChild(listElement);

            for (var key in response.guests) {
if (response.guests[key].isVerified ) {
                var  datea =  new Date(response.guests[key].GuestName).toDateString();


                    var html = [
                        '<a id="' + response.guests[key]._id + '" href="javascript:void(0)" onclick="clickMe(this.id)">',
                        '<div class="card u-clearfix">',
                        '<div class="col-sm-5 wthree-news-img">',
                        '<div class="card-media-preview u-flex-center">',
                        '<svg fill="#ffffff" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">',
                        '<path d="M8 5v14l11-7z"/>',
                        '<path d="M0 0h24v24H0z" fill="none"/>',
                        '</svg>',
                        '</div>',
                        '<u><span class="card-media-tag card-media-tag-orange"></span></u>',
                        '</div>',
                        '</br>',
                        '<div class="card-button card-button-link">',
                        '<i aria-hidden="true"></i>' + response.guests[key].GuestName,
                        '</br>',
                        '<i aria-hidden="true"></i><span style="font-size: 15px">' + response.guests[key].Email,
                        '</span></div>',
                        '</div>',
                        '</div>',
                        '</a>',
                    ].join('');
                    var div = document.createElement('div');
                    div.innerHTML = html;
                    listContainer.appendChild(div);
}else{
    var  datea =  new Date(response.guests[key].GuestName).toDateString();


    var html = [
        '<a id="' + response.guests[key]._id + '" href="javascript:void(0)" onclick="clickMe(this.id)">',
        '<div class="card u-clearfix">',
        '<div class="col-sm-5 wthree-news-img">',
        '<div class="card-media-preview u-flex-center">',
        '<svg fill="#ffffff" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">',
        '<path d="M8 5v14l11-7z"/>',
        '<path d="M0 0h24v24H0z" fill="none"/>',
        '</svg>',
        '</div>',
        '<u><span class="card-media-tag card-media-tag-red"></span></u>',
        '</div>',
        '</br>',
        '<div class="card-button card-button-link">',
        '<i aria-hidden="true"></i>' + response.guests[key].GuestName,
        '</br>',
        '<i aria-hidden="true"></i><span style="font-size: 15px">' + response.guests[key].Email,
        '</span></div>',
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
    window.location.href = "../templates/newguest.html";
}



