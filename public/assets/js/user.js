function User() {
	this.username = '';
}

User.prototype = {

	init: function(){
		//
	},

	getUsername: function(){
		return this.username;
	},

	setUsername: function(username){
		this.username = username;
	}

}