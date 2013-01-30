function Cryptography() {
	//
}

Cryptography.prototype = {

	init: function(passphrase) {
		//
	},

	getPassphrase: function() {
		return notes.storage.localRetrieve('cryptography-passphrase') || false;
	},

	available: function() {
		return !!this.getPassphrase();
	},

	encrypt: function(string) {
		return sjcl.encrypt(this.getPassphrase(), string);
	},

	decrypt: function(string) {
		return sjcl.decrypt(this.getPassphrase(), string);
	}

}