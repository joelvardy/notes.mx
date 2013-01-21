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

				// Define the email and password
				var email = $('form #email').val();
				var password = $('form #password').val();

				// Check whether the email is available (the email has already been registered)
				notes.user.available(email, function(response){

					// The email has not been previously registered
					if (response.status) {

						console.log('The user does not have an account');

						// Create the user an account
						notes.user.create(email, password, function(response){

							// The user was successfully created
							if (response.status) {

								console.log('the user was successfully created');

								// Log the new user in
								notes.user.login(email, password, function(response){

									// The user was successfully logged in
									if (response.status) {

										console.log('the user has been successfully logged in');

									// There was an error logging them in, maybe the internet has died
									} else {
										console.log('there was an error loggin the user in');
									}

								});

							// There was an error creating the user
							} else {
								console.log('there was an error creating the user');
							}

						});

					// The email is registered
					} else {

						console.log('This email is already registered');

						// Log the user in
						notes.user.login(email, password, function(response){

							// The user was successfully logged in
							if (response.status) {

								console.log('the user has been successfully logged in');

							// There was an error logging them in, maybe the internet has died
							} else {
								console.log('there was an error loggin the user in');
							}

						});

					}

				});

			}

		};

		// Load homepage view
		var homepage = this.build('homepage.ejs', {}, actions);

		// Set the view
		$('#notes').empty().append(homepage);

	}

}