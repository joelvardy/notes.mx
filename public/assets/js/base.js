(function() {

	$(document).ready(function() {

		// Add classes to the notes scope
		window.notes = {
			user: new User(),
			storage: new Storage(),
			template: new Template(),
			route: new Route()
		};

		// Initialise user class
		window.notes.user.init();

		notes.user.read(function(data){
			// Initialise classes
			window.notes.storage.init();
			window.notes.template.init();
			window.notes.route.init();
		});

	});

}());