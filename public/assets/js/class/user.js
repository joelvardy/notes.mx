function User() {
	var user,
		isAuthenticated;
}

User.prototype = {

	init: function() {
		this.user = {};
	},

	getUserId: function() {
		return notes.storage.localRetrieve('userId');
	},

	setUserId: function(userId) {
		notes.storage.localStore('userId', userId);
	},

	getApiKey: function() {
		return notes.storage.localRetrieve('apiKey');
	},

	setApiKey: function(apiKey) {
		notes.storage.localStore('apiKey', apiKey);
	},

	getUser: function() {
		return this.user;
	},

	setUser: function(user) {
		delete user['status'];
		this.user = user;
	},

	available: function(email, callback) {

		// Query the API to see whether the email is already associated with an account
		$.ajax({
			type: 'POST',
			url: '/user/available',
			data: {
				email: email
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

	create: function(email, password, callback) {

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
					// Set the user ID and API key
					_this.setUserId(response.user_id);
					_this.setApiKey(response.api_key);
				}

				// Update profile
				_this.read(function() {

					// Run the passed callback
					if (typeof callback == 'function') {
						callback(response);
					}

				});

			}
		});

	},

	read: function(callback) {

		var _this = this;

		// Attempt to read the user current user details
		$.ajax({
			type: 'GET',
			url: '/user',
			beforeSend: function(request) {
				request.setRequestHeader('user-id', _this.getUserId());
				request.setRequestHeader('user-api-key', _this.getApiKey());
			},
			dataType: 'json',
			success: function(response) {

				// Set the user authentication
				_this.isAuthenticated = (typeof response.authenticated == 'undefined' ? true : false);

				if (response.status) {

					// Set the user object
					_this.setUser(response);

				}

				// Run the passed callback
				if (typeof callback == 'function') {
					callback(response);
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
			beforeSend: function(request) {
				request.setRequestHeader('user-id', _this.getUserId());
				request.setRequestHeader('user-api-key', _this.getApiKey());
			},
			data: {
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

	logout: function(callback) {

		// Note that this method will not remove the API keys which are generated upon login

		// Clear local storage (containing the user ID and API key)
		notes.storage.localClear();

		// Set the user authentication
		this.isAuthenticated = false;

		// Run the passed callback
		if (typeof callback == 'function') {
			callback();
		}

	}

}