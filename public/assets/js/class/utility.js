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

	}

}