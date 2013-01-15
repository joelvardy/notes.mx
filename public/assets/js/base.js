(function() {

	$(document).ready(function() {

		// Add classes to the notes scope
		window.notes = {
			user: new User()
		};

		// Initialise user
		window.notes.user.init();

	});

}());