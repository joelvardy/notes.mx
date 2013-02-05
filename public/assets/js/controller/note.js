function showNote(note_id) {

	var previousNoteText = null;

	var setStatusMessage = function(message) {
		$('#note-edit date').html(message);
	}

	var updateLastSavedMessage = function() {
		var time = $('#note-edit date').attr('datetime');
		if (time != '') {
			setStatusMessage('Last saved: '+notes.utility.relativeDate(time));
		}
	}

	// Define actions
	var actions = {

		save: function(event) {

			event.preventDefault();

			// Read the note ID and text
			var noteId = $('#note-edit textarea').attr('data-noteId'),
				noteText = $('#note-edit textarea').val();

			// If the save button has been pressed
			if (typeof event != 'undefined') {
				notes.analytics.triggerUserAction('Save Note', 'Save Note ('+noteId+')');
			}

			// Ensure a note has been written and has changed since being changed last
			if (noteText != '' && noteText != previousNoteText) {

				// If the save button has been pressed
				if (typeof event != 'undefined') {
					$('#notes > div > header a.button.save').addClass('active');
				}

				// Show loading spinner
				notes.loading.show();

				// If this a new note set the note ID to null
				noteId = (noteId != '' ? noteId : null);

				// Save the note
				notes.note.save(noteId, noteText, function(response) {

					$('#notes > div > header a.button.save').removeClass('active');

					notes.loading.hide();

					if (response.status) {

						previousNoteText = noteText;

						// Save the note ID
						$('#note-edit textarea').attr('data-noteId', response.note_id);

						// Update the last saved time
						$('#note-edit date').attr('datetime', Math.floor(new Date() / 1000));

						// Tell the user this note has been saved
						setStatusMessage('Last saved: just now!');

					}

				});

			// The note hasn't changed
			} else if(noteText != '') {
				// If the save button has been pressed
				if (typeof event != 'undefined') {
					setStatusMessage($('<span>').css('color', '#c7007d').html('The note has already been saved'));
				}
			}

			return false;

		},

		delete: function(event) {

			event.preventDefault();

			// Read the note ID
			var noteId = $('#note-edit textarea').attr('data-noteId');

			if (noteId == '') {
				return false;
			}

			var confirmNoteDeletion = new Dialogue();
			confirmNoteDeletion.setStyle('default error');
			confirmNoteDeletion.setHeader('Note Deletion');
			confirmNoteDeletion.setMessage('Press the button below to confirm you would like to delete this note.');
			confirmNoteDeletion.setButtons([
				{
					label: 'Cancel'
				},
				{
					label: 'Delete Note',
					callback: function () {

						// Show loading spinner
						notes.loading.show();

						// If the delete button has been pressed
						if (typeof event != 'undefined') {
							notes.analytics.triggerUserAction('Delete Note', 'Delete Note ('+noteId+')');
						}

						// Delete the note
						notes.note.delete(noteId, function(response) {

							notes.loading.hide();

							if (response.status) {

								// Send the user to the notes listing page
								notes.route.setHash('user/notes');

							}

						});

					},
					colour: 'red'
				}
			]);
			confirmNoteDeletion.build();
			confirmNoteDeletion.show();

		}

	}

	// If we are editing an existing note
	if (note_id) {

		// Read a note
		notes.note.read(note_id, function(response) {

			// The note was successfully read
			if (response) {

				previousNoteText = response.text;

				// Load note view
				var noteElement = notes.template.build('note.ejs', {
					note_details: {
						note_id: response.note_id,
						text: response.text,
						created_at: response.created_at,
						updated_at: response.updated_at
					}
				}, actions);

				// Finished loading
				notes.loading.hide();

				// Set the view
				$('#notes').empty().append(noteElement);

				// Set the textarea height
				$('#note-edit textarea').css('height', $(window).height() - ($('#note-edit header').height() + parseInt($('#note-edit div.note').css('margin-top')) + parseInt($('#notes').css('padding-bottom')))+'px');				

				// Show last saved message
				updateLastSavedMessage();

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
		var noteElement = notes.template.build('note.ejs', {
			note_details: false
		}, actions);

		// Finished loading
		notes.loading.hide();

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
	var updateTimeOperationId = setInterval(updateLastSavedMessage, 5000);

	// Remove setInterval call after navigationg away from this page
	notes.route.addTaskBeforeChange(function() {
		clearInterval(updateTimeOperationId);
	});

}