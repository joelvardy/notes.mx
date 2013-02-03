function showAccount() {

	var formDisabled = false;

	// Define actions
	var actions = {

		changePassword: function(event) {

			event.preventDefault();

			if (formDisabled) {
				return;
			} else {
				formDisabled = true;
			}

			// Reset button text
			$('form.change-password button').html('Change Password');

			// Define the password
			var password = $('form.change-password #password').val();

			// Show loading spinner
			notes.loading.show();

			// Change user password
			notes.user.update(password, function(response) {

				// Enable the form again
				formDisabled = false;

				notes.loading.hide();

				// The user was successfully updated
				if (response.status) {

					$('form.change-password button').html('Password Saved');

				// There was an error updating the user
				} else {

					var errorUpdatingUser = new Dialogue();
					errorUpdatingUser.setStyle('default error');
					errorUpdatingUser.setHeader('Error updating user');
					errorUpdatingUser.setMessage('Your account was not updated, you can try again, if it continues to fail, get in touch :)');
					errorUpdatingUser.build();
					errorUpdatingUser.show();

				}

			});

		},

		deleteAccount: function(event) {

			var confirmAccountDeletion = new Dialogue();
			confirmAccountDeletion.setStyle('default error');
			confirmAccountDeletion.setHeader('Are You Sure?!');
			confirmAccountDeletion.setMessage('By deleting you account all of your notes will be removed from our servers, please click below to confirm.');
			confirmAccountDeletion.setButtons([
				{
					label: 'Cancel'
				},
				{
					label: 'Delete My Account',
					callback: function () {
						notes.user.delete();
					},
					colour: 'red'
				}
			]);
			confirmAccountDeletion.build();
			confirmAccountDeletion.show();

		}

	}

	// Load ccount view
	var accountElement = notes.template.build('account.ejs', {}, actions);

	// Finished loading
	notes.loading.hide();

	// Set the view
	$('#notes').empty().append(accountElement);

}