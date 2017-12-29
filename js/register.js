if(localStorage.getItem('token') !== null) {
   location.hash = "#";
}
    
function validateUsername () {
	var username = document.forms["register-form"]["username"].value;
	var message1 = document.getElementById('usernameMessage');
	if (username.length < 8 ) {
        document.forms["register-form"]["username"].className = "form-control is-invalid";
		message1.style.color = "red";
        message1.innerHTML = '&nbsp*Username must contain at least 8 characters';
		return false;
	}
	else {
        document.forms["register-form"]["username"].className = "form-control is-valid";
    	message1.style.color = "#66cc66";
        message1.innerHTML = '&nbspValid username!';
        return true;
    }
}

function validatePassword () {
	var password = document.forms["register-form"]["password"].value;
	var message2 = document.getElementById('passwordMessage');
	if (password.length < 8 ) {
        document.forms["register-form"]["password"].className = 'form-control is-invalid';
		message2.style.color = "red";
        message2.innerHTML = '&nbsp*Passwords must contain at least 8 characters';
		return false;
	}
	else {
        document.forms["register-form"]["password"].className = 'form-control is-valid';
    	message2.style.color = "#66cc66";
        message2.innerHTML = '&nbspValid passwords!'
        return true;
    } 
}

function checkPassword() {
	var password = document.forms["register-form"]["password"].value;
	var confirmPassword = document.forms["register-form"]["confirmPassword"].value;
	var message = document.getElementById('confirmPasswordMessage');
	if (password === confirmPassword) {
        document.forms["register-form"]["confirmPassword"].className = 'form-control is-valid';
        message.style.color = "#66cc66";
        message.innerHTML = '&nbspPasswords Match!';
        return true;
	}
	else {
        document.forms["register-form"]["confirmPassword"].className = 'form-control is-invalid';
		message.style.color = "red";
        message.innerHTML = "&nbsp*Passwords Don't Match";
        return false;
	}
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validate() {
  var result = document.getElementById('emailMessage');
  var email = document.forms["register-form"]["email"].value;
  if (validateEmail(email)) {
  	document.forms["register-form"]["email"].className = 'form-control is-valid';
    result.style.color = "#66cc66";
    result.innerHTML = "&nbspValid email!";
    return true;
  } else {
  	document.forms["register-form"]["email"].className = 'form-control is-invalid';
    result.style.color = "red";
    result.innerHTML = "&nbsp*Invalid email";
    return false;
  }
}

function submit() {
	var username = document.forms["register-form"]["username"].value;
	var password = document.forms["register-form"]["password"].value;
	var fullName = document.forms["register-form"]["fullName"].value;
	var address  = document.forms["register-form"]["address"].value;
	var birthDay = document.forms["register-form"]["birthDay"].value;
	var email    = document.forms["register-form"]["email"].value;
	var phone	 = document.forms["register-form"]["phone"].value;
	var gender	 = document.forms["register-form"]["gender"].value;

	var registerData = {
		"username": username,
		"password": password,
		"fullName": fullName,
		"address": address,
		"birthDay": birthDay,
		"email": email,
		"phone": phone,
		"gender": gender

	};

	var isValidUsername = validateUsername();
	var isValidPassword = validatePassword();
	var isCheckPassword = checkPassword();
	var isValidEmail = validate();

	if (username === "" || password === "" || fullName === "" || address === "" || birthDay === "" || email === "" || phone === "") {
		toastr["warning"]("Username, password, fullName, address, birthDay, email, phone can't be null!");
		return false;
	}

	if (isCheckPassword === false) {
		toastr["warning"]("Please retype your passwords correctly!");
		return false;
	}
	if (isValidEmail === false) {
		toastr["warning"]("Please enter your email correctly!");
		return false;
	}

    if (isValidUsername && isValidPassword && isCheckPassword && isValidEmail) {
			$.ajax({
				url: userApi,
				method: "POST",
				data: registerData,
				success: function(res){
					if (res.status === '400') {
						toastr["error"](res.error);
						return;
					}
					$('#register-done').modal('show');
				},
				error: function(res){
					toastr["warning"](res.responseJSON.error);
				}
			});
		}	
}