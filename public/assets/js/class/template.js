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

			submitForm: function(event) {

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
				notes.user.available(email, function(response) {

					// The email has not been previously registered
					if (response.status) {

						// Create the user an account
						notes.user.create(email, password, function(response) {

							// The user was successfully created
							if (response.status) {

								// Log the new user in
								notes.user.login(email, password, function(response) {

									// Enable the form again
									formDisabled = false;

									// The user was successfully logged in
									if (response.status) {

										// Take the user to their notes list
										notes.analytics.triggerPageview('/user/login/successful');
										notes.route.setHash('user/notes');

									// There was an error logging them in, maybe the internet has died
									} else {
										notes.analytics.triggerPageview('/user/login/failure');
										errorLoggingIn();
									}

								});

							// There was an error creating the user
							} else {

								// Enable the form again
								formDisabled = false;

								// This migth be a server error
								notes.analytics.triggerPageview('/user/login/account-creation-failure');

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
						notes.user.login(email, password, function(response) {

							// Enable the form again
							formDisabled = false;

							// The user was successfully logged in
							if (response.status) {

								// Take the user to their notes list
								notes.analytics.triggerPageview('/user/login/successful');
								notes.route.setHash('user/notes');

							// There was an error logging them in, maybe the internet has died
							} else {
								notes.analytics.triggerPageview('/user/login/failure');
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

			clickNote: function(event) {

				// Define the note ID
				var noteId = $(event.currentTarget).attr('data-noteId');

				// View the note
				notes.analytics.triggerUserAction('Click Note', 'Click Note ('+noteId+')');
				notes.route.setHash('note/'+noteId);

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

		var previousNoteText = null;

		// Define actions
		var actions = {

			save: function(event) {

				// Read the note ID and text
				var noteId = $('#note-edit textarea').attr('data-noteId'),
					noteText = $('#note-edit textarea').val();

				// If the save button has been pressed
				if (typeof event != 'undefined') {
					notes.analytics.triggerUserAction('Save Note', 'Save Note ('+noteId+')');
				}

				// Ensure a note has been written and has changed since being changed last
				if (noteText != '' && noteText != previousNoteText) {

					// If this a new note set the note ID to null
					noteId = (noteId != '' ? noteId : null);

					// Save the note
					notes.note.save(noteId, noteText, function(response) {

						if (response.status) {

							previousNoteText = noteText;

							// Save the note ID
							$('#note-edit textarea').attr('data-noteId', response.note_id);

							// Update the last saved time
							$('#note-edit date').attr('datetime', Math.floor(new Date() / 1000));

						}

					});

				}

				return false;

			},

			delete: function(event) {

				// Read the note ID
				var noteId = $('#note-edit textarea').attr('data-noteId');

				// If the delete button has been pressed
				if (typeof event != 'undefined') {
					notes.analytics.triggerUserAction('Delete Note', 'Delete Note ('+noteId+')');
				}

				// Delete the note
				notes.note.delete(noteId, function(response) {

					if (response.status) {

						// Send the user to the notes listing page
						notes.route.setHash('user/notes');

					}

				});

			}

		}

		// If we are editing an existing note
		if (note_id) {

			// Read a note
			notes.note.read(note_id, function(response) {

				// The note was successfully read
				if (response.status) {

					previousNoteText = response.text;

					// Load note view
					var noteElement = _this.build('note.ejs', {
						note_details: {
							note_id: response.note_id,
							text: response.text,
							created_at: response.created_at,
							updated_at: response.updated_at
						}
					}, actions);

					// Set the view
					$('#notes').empty().append(noteElement);

					// Set the textarea height
					$('#note-edit textarea').css('height', $(window).height() - ($('#note-edit header').height() + parseInt($('#note-edit div.note').css('margin-top')) + parseInt($('#notes').css('padding-bottom')))+'px');

					// Save the note every 2 minutes
					var saveOperationId = setInterval(actions.save, (1000 * 60 * 2));

					// Remove setInterval call after navigationg away from this page
					notes.route.addTaskBeforeChange(function() {
						clearInterval(saveOperationId);
					});

				// There was an error reading the note
				} else {
					history.back();
				}

			});

		// This is a new note
		} else {

			// Load note view
			var noteElement = _this.build('note.ejs', {
				note_details: false
			}, actions);

			// Set the view
			$('#notes').empty().append(noteElement);

			// Set the textarea height
			$('#note-edit textarea').css('height', $(window).height() - ($('#note-edit header').height() + parseInt($('#note-edit div.note').css('margin-top')) + parseInt($('#notes').css('padding-bottom')))+'px');

			// Save the note every 2 minutes
			var saveOperationId = setInterval(actions.save, (1000 * 60 * 2));

			// Remove setInterval call after navigationg away from this page
			notes.route.addTaskBeforeChange(function() {
				clearInterval(saveOperationId);
			});

		}

		// Update the 'last saved' time
		var updateTimeOperationId = setInterval(function() {
			var time = $('#note-edit date').attr('datetime');
			if (time != '') {
				$('#note-edit date').html('Last saved: '+notes.utility.relativeDate(time));
			}
		}, 5000);

		// Remove setInterval call after navigationg away from this page
		notes.route.addTaskBeforeChange(function() {
			clearInterval(updateTimeOperationId);
		});

	}

}