/**
 *
 */

window.loadData = function() {
    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");
    var data = JSON.parse(localStorage.getItem('data'));
    console.log(data);
    var user = data.user;
    if (user.image){
        $("#image").attr("src",window.URLSERVER+"/assets/"+ user.image) ;
        $("#pic").attr("src",window.URLSERVER+"/assets/"+ user.image) ;
        $("#pic1").attr("src",window.URLSERVER+"/assets/"+ user.image) ;
    }
    document.getElementById("userName").innerHTML = user.firstName+" "+user.lastName;
    document.getElementById("email").innerHTML = user.email;
    return data;
};
