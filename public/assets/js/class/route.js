function Route() {
	//
}

Route.prototype = {

	init: function() {

		var _this = this;

		// Run routes on hash change
		$(window).bind('hashchange', function() {
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

		var _this = this;

		// User logout
		if (this.getHash() == 'user/logout') {
			notes.user.logout(function() {
				_this.clearHash();
				return;
			});
		}

		// User notes
		if (this.getHash() == 'user/notes' && notes.user.isAuthenticated) {
			notes.template.showNotes();
			return;
		}

		// Specific note
		if (this.getHash().match('^note/([0-9]+)$') && notes.user.isAuthenticated) {
			notes.template.showNote(this.getHash().match('^note/([0-9]+)$')[1]);
			return;
		}

		// Not route has been matched, check whether the user is authenticated
		if (notes.user.isAuthenticated) {
			this.setHash('user/notes');
			return;
		}

		// No route has been matched, show homepage
		this.clearHash();
		notes.template.showHomepage();

	}

}