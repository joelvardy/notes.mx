function Route() {
	var tasksBeforeChange;
}

Route.prototype = {

	init: function() {

		var _this = this;

		this.tasksBeforeChange = [];

		// Run routes on hash change
		$(window).bind('hashchange', function() {
			_this.run();
		});

		// Run routes in initialisation
		this.run();

	},

	addTaskBeforeChange: function(task) {
		this.tasksBeforeChange.push(task);
	},

	cearTasksBeforeChange: function() {
		this.tasksBeforeChange = [];
	},

	runTasksBeforeChange: function() {

		// Iterate through tasks
		for (var i=0; i<this.tasksBeforeChange.length; i++) {
			this.tasksBeforeChange[i]();
		}

		// Clear tasks
		this.cearTasksBeforeChange();

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

	goBack: function() {

		history.back();

	},

	run: function() {

		var _this = this;

		// Run tasks before page chnges
		this.runTasksBeforeChange();

		// User logout
		if (this.getHash() == 'user/logout') {
			notes.user.logout(function() {
				notes.analytics.triggerPageview('/logout');
				_this.clearHash();
				return;
			});
		}

		// User notes
		if (this.getHash() == 'user/notes' && notes.user.isAuthenticated) {
			notes.analytics.triggerPageview('/user/notes');
			showNotes();
			return;
		}

		// Create new note
		if (this.getHash() == 'note/new' && notes.user.isAuthenticated) {
			notes.analytics.triggerPageview('/note/new');
			showNote();
			return;
		}

		// Specific note
		if (this.getHash().match('^note/([0-9]+)$') && notes.user.isAuthenticated) {
			// Define note ID
			var noteId = this.getHash().match('^note/([0-9]+)$')[1];
			notes.analytics.triggerPageview('/note/'+noteId);
			showNote(noteId);
			return;
		}

		// Not route has been matched, check whether the user is authenticated
		if (notes.user.isAuthenticated) {
			this.setHash('user/notes');
			return;
		}

		// No route has been matched, show homepage
		this.clearHash();
		notes.analytics.triggerPageview('/');
		showHomepage();

	}

}