$(function () {

	var logButton = $("header nav button");
	function toggleClasses() {
		logButton.toggleClass(".active-logbtn");
	}

	$("button.logout").click(function() {
			$.ajax ({
				url: "/users/login",
				method: "GET",
				success: function(data) {
					if(data.loggedIn) {   
						toggleClasses();
					}
			}
		});
	});

	$("button.login").click(function() {
			$.ajax ({
				url: "/users/logout",
				method: "GET",
				success: function(data) {
					if(data.loggedIn) {   
						toggleClasses();
					}
			}
		});
	});
});
