$(function () {
	const loginBtn = $("button.login");

	function login(button) {
		$.ajax ({
			url: "/users/login",
			method: "GET",
			success: function(data) {
				button.text("Logout");
			}
		});
	}

	function logout(button) {
		$.ajax ({
			url: "/users/logout",
			method: "GET",
			success: function(data) {
				button.text("Login")
			}
		});
  }

	loginBtn.on("click", function(event) {
		if(loginBtn.text() === "Login") {
			login(loginBtn);
		}else {
			logout(loginBtn);
		}
	});
});
