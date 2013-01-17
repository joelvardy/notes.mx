function User() {
	this.email = '';
	this.apiKey = '';
}

User.prototype = {

	init: function(){
		//
	},

	getEmail: function(){
		return this.email;
	},

	setEmail: function(email){
		this.email = email;
	},

	getApiKey: function(){
		return this.apiKey;
	},

	setApiKey: function(apiKey){
		this.apiKey = apiKey;
	},

	create: function(email, password, callback){

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

				// Set the user email
				_this.setEmail(email);

				// Run the passed callback
				if (typeof callback == 'function') {
					callback(response);
				}

			}
		});

	},

	login: function(email, password, callback){

		var _this = this;

		// Attempt to create the user account
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
					alert('here');
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

	}

}