function User() {
	var email = '';
	var apiKey = '';
	var user;
}

User.prototype = {

	init: function() {
		//
	},

	getEmail: function() {
		return this.email;
	},

	setEmail: function(email) {
		this.email = email;
	},

	getApiKey: function() {
		return this.apiKey;
	},

	setApiKey: function(apiKey) {
		this.apiKey = apiKey;
	},

	getUser: function() {
		return this.user;
	},

	setUser: function(user) {
		delete user['status'];
		this.user = user;
	},

	create: function(email, password, callback) {

		var _this = this;

		// Attempt to create the user account
		$.ajax({
			type: 'POST',
			url: '/user',
			data: {
				email: email,
				password: password
			},
			dataType: 'json',
			success: function(response) {

				// Run the passed callback
				if (typeof callback == 'function') {
					callback(response);
				}

			}
		});

	},

	login: function(email, password, callback) {

		var _this = this;

		// Attempt to login to an account
		$.ajax({
			type: 'POST',
			url: '/user/login',
			data: {
				email: email,
				password: password
			},
			dataType: 'json',
			success: function(response) {

				if (response.status) {
					// Set the email and API key
					_this.setEmail(email);
					_this.setApiKey(response.api_key);
				}

				// Run the passed callback
				if (typeof callback == 'function') {
					callback(response);
				}

			}
		});

	},

	read: function(callback) {

		var _this = this;

		// Attempt to read the user current user details
		$.ajax({
			type: 'GET',
			url: '/user',
			data: {
				email: this.getEmail(),
				api_key: this.getApiKey()
			},
			dataType: 'json',
			success: function(response) {

				if (response.status) {
					// Set the user object
					_this.setUser(response);
				}

				// Run the passed callback
				if (typeof callback == 'function') {
					callback();
				}

			}
		});

	},

	update: function(password, callback) {

		var _this = this;

		// Attempt to update the user account
		$.ajax({
			type: 'PUT',
			url: '/user',
			data: {
				email: this.getEmail(),
				api_key: this.getApiKey(),
				password: password
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