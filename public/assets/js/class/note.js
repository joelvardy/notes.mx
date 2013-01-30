function Note() {
	var userNotes;
}

Note.prototype = {

	init: function() {
		//
	},

	decryptNotes: function() {

		this.userNotes = [];

		// Ensure there are notes for this user
		if (notes.user.getUser().notes) {
			// Iterate through notes
			for (var i=0; i<notes.user.getUser().notes.length; i++) {
				var note = notes.user.getUser().notes[i];
				try {
					// Decrypt the note
					note.text = notes.cryptography.decrypt(note.text);
					this.userNotes.push(note);
				} catch(error) {
					// The encryption passphrase is wrong
				}
			}
		}

	},

	save: function(note_id, text, callback) {

		// Attempt to save the note
		$.ajax({
			type: 'PUT',
			url: '/note',
			beforeSend: function(request) {
				request.setRequestHeader('user-id', notes.user.getUserId());
				request.setRequestHeader('user-api-key', notes.user.getApiKey());
			},
			data: {
				note_id: note_id,
				text: notes.cryptography.encrypt(text)
			},
			dataType: 'json',
			success: function(response) {

				// Update the user data (will add the new note to their profile)
				notes.user.read(function(data) {

					// Run the passed callback
					if (typeof callback == 'function') {
						callback(response);
					}

				});

			}
		});

	},

	read: function(note_id, callback) {

		// If no note ID is passed
		if ( ! note_id) {

			// If there is a callback
			if (typeof callback == 'function') {
				callback(this.userNotes);
				return;
			}

			return this.userNotes;

		}

		// Find the note within the users notes
		for (var i=0; i<this.userNotes.length; i++) {
			if (this.userNotes[i].note_id == note_id) {

				// Run the passed callback
				if (typeof callback == 'function') {
					callback(this.userNotes[i]);
					return;
				}

				return this.userNotes[i];

			}
		}

		// If the note hasn't been found, return false
		return false;

	},

	delete: function(note_id, callback) {

		// Attempt to delete a note
		$.ajax({
			type: 'DELETE',
			url: '/note/'+note_id,
			beforeSend: function(request) {
				request.setRequestHeader('user-id', notes.user.getUserId());
				request.setRequestHeader('user-api-key', notes.user.getApiKey());
			},
			dataType: 'json',
			success: function(response) {

				// Update the user data (will remove the note from their profile)
				notes.user.read(function(data) {

					// Run the passed callback
					if (typeof callback == 'function') {
						callback(response);
					}

				});

			}
		});

	}

}