$(function () {
	const loginBtn = $("button.login");
	const errorFlash = $(".error-flash");

	function login(button) {
		$.ajax ({
			url: "/users/login",
			method: "GET",
			success: function(data) {
				button.text("Logout");
				globalRender();
			},
			fail: function(error) {
				errorFlash.text(error.error);
			}
		});
	}

	const loHtml = $("#loggedout-html").html();
	
	function logout(button) {
		$.ajax ({
			url: "/users/logout",
			method: "GET",
			success: function(data) {
				button.text("Login");
				$(".categories").html("loHtml");
				//TODO: add a class to disable the #what-todo-box
			},
			fail: function(err) {
				errorFlash.text(error.error);
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
