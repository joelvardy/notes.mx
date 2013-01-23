function Note() {
	//
}

Note.prototype = {

	init: function() {
		//
	},

	save: function(note_id, text, callback) {

		var _this = this;

		// Attempt to save the note
		$.ajax({
			type: 'PUT',
			url: '/note',
			data: {
				user_id: notes.user.getUserId(),
				api_key: notes.user.getApiKey(),
				note_id: note_id,
				text: text
			},
			dataType: 'json',
			success: function(response) {

				// Update the user data (will add the new note to their profile)
				notes.user.read(function(data){

					// Run the passed callback
					if (typeof callback == 'function') {
						callback(response);
					}

				});

			}
		});

	}

}