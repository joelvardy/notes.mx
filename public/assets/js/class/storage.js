function Storage() {
	//
}

Storage.prototype = {

	init: function() {
		//
	},

	localAvailable: function() {
		return typeof window.localStorage != 'undefined';
	},

	localStore: function(key, value) {
		return localStorage.setItem(key, value);
	},

	localRetrieve: function(key) {
		return localStorage.getItem(key);
	},

	localClear: function() {
		return localStorage.clear();
	}

}