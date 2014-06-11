function showHomepage() {

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

			// Define the email, password, and passphrase
			var email = $('form #email').val();
			var password = $('form #password').val();
			var passphrase = $('form #passphrase').val();

			// Don't allow a blank passphrase
			if (passphrase == '') {

				var errorBlankPassphrase = new Dialogue();
				errorBlankPassphrase.setStyle('default error');
				errorBlankPassphrase.setHeader('Blank Passphrase');
				errorBlankPassphrase.setMessage('You must enter a passphrase, make it something you will remember!<br />However someone who has access to your browser could read it, so do not use a password!');
				errorBlankPassphrase.build();
				errorBlankPassphrase.show();

				formDisabled = false;
				return;

			}

			// Show loading spinner
			notes.loading.show();

			// Store the email and passphrase in local storage
			notes.storage.localStore('last-login-email', email);
			notes.storage.localStore('cryptography-passphrase', passphrase);

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

								notes.loading.hide();

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

							notes.loading.hide();

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

						notes.loading.hide();

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

	}

	// Load homepage view
	var homepageElement = notes.template.build('homepage.ejs', {
		email: notes.storage.localRetrieve('last-login-email') || false,
		passphrase: notes.cryptography.getPassphrase()
	}, actions);

	// Finished loading
	notes.loading.hide();

	// Set the view
	$('#notes').empty().append(homepageElement);

}
