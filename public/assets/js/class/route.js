function Route() {
	//
}

Route.prototype = {

	clearHash: function() {

		window.location.hash = '';
		if (typeof window.history.replaceState == 'function') {
			history.replaceState({}, '', window.location.href.slice(0, -1));
		}

	},

	init: function() {

		// Define the requested resource
		var request = window.location.hash.substring(3);

		// User profile
		if (request == 'user/profile') {
			console.log('show the user profile');
			return;
		}

		// No route has been matched, show homepage
		this.clearHash();
		notes.template.showHomepage();

	}

}