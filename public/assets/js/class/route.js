function Route() {
	//
}

Route.prototype = {

	init: function() {

		var _this = this;

		// Run routes on hash change
		$(window).bind('hashchange', function(){
			_this.run();
		});

		// Run routes in initialisation
		this.run();

	},

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

		history.pushState({}, 'Notes', '#!/'+hash);
		this.run();

	},

	run: function() {

		// User notes
		if (this.getHash() == 'user/notes') {
			console.log('show the user notes');
			return;
		}

		// Not route has been matched, check whether the user is authenticated
		if (notes.user.isAuthenticated) {
			this.setHash('user/notes');
			this.init();
			return;
		}

		// No route has been matched, show homepage
		this.clearHash();
		notes.template.showHomepage();

	}

}