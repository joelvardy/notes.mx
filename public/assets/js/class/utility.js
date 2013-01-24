function Utility() {
	//
}

Utility.prototype = {

	init: function() {
		//
	},

	getOrdinal: function(number) {

		number = number.toString();
		var	range = parseInt(number.substring(number.length-2, number.length));
		return ((range < 11 || range > 19) && (number % 10) < 4) ? ['th','st','nd','rd'][(number % 10)] : 'th';

	},

	formatDate: function(date, string) {

		// Load the date
		date = new Date(date * 1000);

		// Define the months
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		string = string.replace('longMonth', months[date.getMonth()]);
		string = string.replace('ordinalNumber', date.getDate()+this.getOrdinal(date.getDate()));
		string = string.replace('year', date.getFullYear());

		return string;

	},

	relativeDate: function(date) {

		// Load the date
		date = new Date(date * 1000);

		var difference = new Date() - date;

		var conversions = [
			['format', 2592000000],
			['days', 86400000],
			['hours', 3600000],
			['minutes', 60000],
			['seconds', 1000]
		];

		// Go through conversions until we hit a match
		for (var i = 0; i < conversions.length; i++) {
			var result = Math.floor(difference / conversions[i][1]);
			if (result >= 2) {
				if (conversions[i][0] == 'format') {
					return this.formatDate(date / 1000, 'longMonth ordinalNumber year');
				}
				return result+' '+conversions[i][0]+' ago';
			}
		}

		// If none of the above matched, then no time could have passed
		return '1 second ago';

	},

	cutString: function(string, characters) {

		string = string.match(/[^\r\n]+/g)[0];

		if (string.length > characters) {
			string = string.substr(0, characters - 1);
			string = string.substr(0, string.lastIndexOf(' '));
		}

		return string;

	}

}