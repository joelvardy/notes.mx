function Loading() {
	var loadingElement;
}

Loading.prototype = {

	init: function() {
		this.loadingElement = $('<span class="loading"></span>');
		$('body').append(this.loadingElement);
	},

	show: function() {
		this.loadingElement.show();
	},

	hide: function() {
		this.loadingElement.hide();
	}

}