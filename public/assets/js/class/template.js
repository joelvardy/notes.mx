function Template() {
	var templatePath;
}

Template.prototype = {

	init: function() {
		this.templatePath = '/assets/templates/';
	},

	showHomepage: function() {

		// Load homepage view
		new EJS({url: this.templatePath+'homepage.ejs'}).update('notes', {
			name: 'Joel Vardy'
		});

	}

}