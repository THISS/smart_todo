$(function () {
	var logButton = $("header nav button");

	logButton.click(function() {
			$.ajax ({
				url: "/users/login",
				method: GET,
				success: function(data) {
					if(data.loggedIn) {   
						logButton.text("logout");
					}
			}
		});
	});

	logButton.click(function() {
			$.ajax ({
				url: "/users/logout",
				method: GET,
				success: function(data) {
					if(data.loggedIn) {   
						logButton.text("login");
					}
			}
		});
	});
});
