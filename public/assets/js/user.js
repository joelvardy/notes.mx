function User() {
	this.email = '';
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

	}

}