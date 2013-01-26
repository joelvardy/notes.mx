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
		var element = $(new EJS({url: this.templatePath+template}).render(data));

		// Bind events
		for (var i=0; i<this.events.length; i++) {
			var event = this.events[i];
			element.delegate(event.selector, event.event, event.handler);
		}

		// Return element
		return element;

	},

	showHomepage: function() {

		var formDisabled = false;

		var errorLoggingIn = function() {
			var errorLoggingIn = new Dialogue();
			errorLoggingIn.setStyle('default error');
			errorLoggingIn.setHeader('Error Logging In');
			errorLoggingIn.setMessage('There was an error logging you in, check your username and password are correct.');
			errorLoggingIn.build();
			errorLoggingIn.show();
		}

		// Define actions
		var actions = {

			submitForm: function(event){

				event.preventDefault();

				if (formDisabled) {
					return;
				} else {
					formDisabled = true;
				}

				// Define the email and password
				var email = $('form #email').val();
				var password = $('form #password').val();

				// Check whether the email is available (the email has already been registered)
				notes.user.available(email, function(response){

					// The email has not been previously registered
					if (response.status) {

						// Create the user an account
						notes.user.create(email, password, function(response){

							// The user was successfully created
							if (response.status) {

								// Log the new user in
								notes.user.login(email, password, function(response){

									// Enable the form again
									formDisabled = false;

									// The user was successfully logged in
									if (response.status) {

										// Take the user to their notes list
										notes.route.setHash('user/notes');

									// There was an error logging them in, maybe the internet has died
									} else {
										errorLoggingIn();
									}

								});

							// There was an error creating the user
							} else {

								// Enable the form again
								formDisabled = false;

								var errorCreatingUser = new Dialogue();
								errorCreatingUser.setStyle('default error');
								errorCreatingUser.setHeader('Error Creating Account');
								errorCreatingUser.setMessage('There was an error creating your account, please check you have entered a valid email address and your password is at least 5 characters long.');
								errorCreatingUser.build();
								errorCreatingUser.show();

							}

						});

					// The email is registered
					} else {

						// Log the user in
						notes.user.login(email, password, function(response){

							// Enable the form again
							formDisabled = false;

							// The user was successfully logged in
							if (response.status) {

								// Take the user to their notes list
								notes.route.setHash('user/notes');

							// There was an error logging them in, maybe the internet has died
							} else {
								errorLoggingIn();
							}

						});

					}

				});

			}

		};

		// Load homepage view
		var homepageElement = this.build('homepage.ejs', {}, actions);

		// Set the view
		$('#notes').empty().append(homepageElement);

	},

	showNotes: function() {

		// Define actions
		var actions = {

			clickNote: function(event){

				// View the note
				notes.route.setHash('note/'+$(event.currentTarget).attr('data-noteId'));

			}

		}

		// Load notes list view
		var notesElement = this.build('notes.ejs', {
			notes_list: notes.user.getUser().notes || false
		}, actions);

		// Set the view
		$('#notes').empty().append(notesElement);

	},

	showNote: function(note_id) {

		var _this = this;

		// Read a note
		notes.note.read(note_id, function(response){

			// The note was successfully read
			if (response.status) {

				// Load note view
				var noteElement = _this.build('note.ejs', {
					note_details: {
						note_id: response.note_id,
						text: response.text,
						created_at: response.created_at,
						updated_at: response.updated_at
					}
				}, {});

				// Set the view
				$('#notes').empty().append(noteElement);

			// There was an error reading the note
			} else {
				history.back();
			}

		});

	}

}