function Template() {
	var templatePath;
}

Template.prototype = {

	init: function() {
		this.templatePath = '/assets/templates/';
	},

	build: function(template, data) {

		// Render element
		return $(new EJS({url: this.templatePath+template}).render(data));

	},

	showHomepage: function() {

		// Load homepage view
		var homepage = this.build('homepage.ejs', {
			name: 'Joel Vardy'
		});

		// Bind a click event
		homepage.bind('click', function(eventObj) {
			console.log('clicked');
		});

		// Set the view
		$('#notes').html(homepage);

	}

}