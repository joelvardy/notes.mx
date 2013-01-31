function showNotes() {

	// Define actions
	var actions = {

		clickNote: function(event) {

			// Show loading spinner
			notes.loading.show();

			// Define the note ID
			var noteId = $(event.currentTarget).attr('data-noteId');

			// View the note
			notes.analytics.triggerUserAction('Click Note', 'Click Note ('+noteId+')');
			notes.route.setHash('note/'+noteId);

		}

	}

	// Load notes list view
	var notesElement = notes.template.build('notes.ejs', {
		notes_list: notes.note.read() || false
	}, actions);

	// Finished loading
	notes.loading.hide();

	// Set the view
	$('#notes').empty().append(notesElement);

}