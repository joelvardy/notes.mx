$(document).ready(function() {

	// Add classes to the notes scope
	window.notes = {
		loading: new Loading(),
		utility: new Utility(),
		user: new User(),
		storage: new Storage(),
		analytics: new Analytics(),
		cryptography: new Cryptography(),
		note: new Note(),
		template: new Template(),
		route: new Route()
	};

	// Initialise classes
	window.notes.loading.init();
	window.notes.user.init();

	notes.user.read(function(data) {
		// Initialise classes
		window.notes.storage.init();
		window.notes.analytics.init();
		window.notes.cryptography.init();
		window.notes.note.init();
		window.notes.template.init();
		window.notes.route.init();
	});

});
