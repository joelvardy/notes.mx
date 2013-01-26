function Note() {
	//
}

Note.prototype = {

	init: function() {
		//
	},

	save: function(note_id, text, callback) {

		// Attempt to save the note
		$.ajax({
			type: 'PUT',
			url: '/note',
			beforeSend: function(request){
				request.setRequestHeader('user-id', notes.user.getUserId());
				request.setRequestHeader('user-api-key', notes.user.getApiKey());
			},
			data: {
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

	},

	read: function(note_id, callback) {

		// First lets see whether the note is within the users profile
		// This should always be the case, so the API call is a little redundant
		for (var i=0; i<notes.user.getUser().notes.length; i++) {
			if (notes.user.getUser().notes[i].note_id == note_id) {
				var fake_response = notes.user.getUser().notes[i];
				fake_response.status = true;
				// Run the passed callback
				if (typeof callback == 'function') {
					callback(fake_response);
					return;
				}
			}
		}

		// Attempt to read a note
		$.ajax({
			type: 'GET',
			url: '/note/'+note_id,
			beforeSend: function(request){
				request.setRequestHeader('user-id', notes.user.getUserId());
				request.setRequestHeader('user-api-key', notes.user.getApiKey());
			},
			dataType: 'json',
			success: function(response) {

				// Run the passed callback
				if (typeof callback == 'function') {
					callback(response);
				}

			}
		});

	}

}