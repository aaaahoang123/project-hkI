
function openLoginModal() {
    $("#login-modal").modal('show');
}
$('#login-modal').on('show.bs.modal', function () {
	$('#loginError').hide();
})
$('#loginError').hide();
function login(){

    var username = $("#login-username").val();
    var password = $("#login-pasword").val();
    var loginData = {
         "username": username,
         "password": password
      };

    var urlAPI = "https://rlcapi.herokuapp.com/api/authentication";
    $.ajax({
      type: "POST",
      url: urlAPI,
      data: loginData,
      success: function(res){
        console.log(res);
        toastr["success"]('<strong>Login successfully!</strong>');
        localStorage.setItem("token", res.token);
        localStorage.setItem("username", username);
    		setTimeout("location.reload(true);",1200);       
      },
      error: function(errorRes){
        console.log(errorRes.responseJSON.error);
        $('#loginError').show();
        // alert(errorRes.responseJSON.error);
        document.getElementById('loginError').innerHTML = errorRes.responseJSON.error;
        // $('#loginError').innerHTML = "errorRes.responseJSON.error";
      }
    });
}

if (localStorage.getItem('token') !== null && localStorage.getItem('token') || undefined) {
	document.querySelectorAll("#login-logout > a")[1].innerHTML = localStorage.getItem('username');
	document.querySelectorAll("#login-logout > a")[2].innerHTML = "Logout";
	document.querySelectorAll("#login-logout > a")[2].removeAttribute("href");
	document.querySelectorAll("#login-logout > a")[2].onclick = function() {
		signOut();
	};
}
else {
	document.querySelectorAll("#login-logout > a")[1].innerHTML = "Login";
	document.querySelectorAll("#login-logout > a")[1].onclick = function() {
		openLoginModal();
	};
	document.querySelectorAll("#login-logout > a")[2].innerHTML = "Register";
	
	}

function signOut(){
    $.ajax({
    	url: "https://rlcapi.herokuapp.com/api/authentication",
    	type: "DELETE",
    	data: {
    		'token': localStorage.getItem('token')
    	},
    	success: function(res) {
    		console.log(res);
    		localStorage.removeItem('token');
    		localStorage.removeItem('username');
    		location.reload();
    	},
    	error: function(res) {
    		console.log(res);
    		alert('Error when logout');
    	}
    }); 
}