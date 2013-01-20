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

	getHash: function() {

		return window.location.hash.substring(3);

	},

	setHash: function(hash) {

		window.location.hash = '!/'+hash;

	},

	init: function() {

		// User profile
		if (this.getHash() == 'user/profile') {
			console.log('show the user profile');
			return;
		}

		// Not route has been matched, check whether the user is authenticated
		if (notes.user.isAuthenticated) {
			this.setHash('user/profile');
			this.init();
			return;
		}

		// No route has been matched, show homepage
		this.clearHash();
		notes.template.showHomepage();

	}

}