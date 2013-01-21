function Template() {
	var templatePath,
		events;
}

Template.prototype = {

	init: function() {
		this.templatePath = '/assets/templates/';
	},

	addEvent: function(selector, event, handler) {

		// Add event to events array
		this.events.push({
			selector: selector,
			event: event,
			handler: handler
		});

	},

	build: function(template, data, actions) {

		var _this = this;

		this.events = [];
		if (typeof data != 'object') {
			data = {};
		}
		data.template = this;
		data.actions = actions;

		// Render element
		var element = $(new EJS({url: this.templatePath+template+'?'+(new Date().getTime())}).render(data));

		// Bind events
		for (var i=0; i<this.events.length; i++) {
			var event = this.events[i];
			element.delegate(event.selector, event.event, event.handler);
		}

		// Return element
		return element;

	},

	showHomepage: function() {

		// Define actions
		var actions = {

			submitForm: function(event){
				event.preventDefault();
				console.log('Run the registration / login form');
			}

		};

		// Load homepage view
		var homepage = this.build('homepage.ejs', {}, actions);

		// Set the view
		$('#notes').empty().append(homepage);

	}

}