(function() {

	$(document).ready(function() {

		// Add classes to the notes scope
		window.notes = {
			user: new User(),
			route: new Route()
		};

		// Initialise classes
		window.notes.user.init();
		window.notes.route.init();

	});

}());