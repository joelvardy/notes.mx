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

		// Set the units we will display the date in
		var units = [
			['format', 2592000000],
			['day', 86400000],
			['hour', 3600000],
			['minute', 60000],
			['second', 1000]
		];

		// Go through units until we hit a match
		for (var i = 0; i < units.length; i++) {
			var result = Math.floor(difference / units[i][1]);
			if (result >= 1) {
				// If the matched unit is 'format' then we'll return a formatted date
				if (units[i][0] == 'format') {
					return this.formatDate(date / 1000, 'longMonth ordinalNumber year');
				}
				// Return the number of units (if more than one, make it a plural)
				return result+' '+units[i][0]+(result >= 2 ? 's' : '')+' ago';
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