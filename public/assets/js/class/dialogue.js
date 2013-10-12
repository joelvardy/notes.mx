function Dialogue() {

	this._id = new Date().getTime().toString();
	this._elementOverlay = false;
	this._elementBox = false;
	this._style = 'default';
	this._header = false;
	this._message = false;
	this._buttons = [];

}

Dialogue.prototype = {

	_buildOverlay: function() {

		var _this = this;

		if ( ! this._elementOverlay) {

			this._elementOverlay = $('<div id="dialogue-overlay-'+this._id+'">').addClass(this._style).hide().appendTo('body');

			// Allow clicking the overlay to close the dialogue
			this._elementOverlay.bind('click', function() {
				_this.hide();
			});

		}

	},

	_showOverlay: function(callback) {

		callback = (typeof callback != 'undefined' ? callback : null);

		this._elementOverlay.fadeIn(250, callback);

	},

	_hideOverlay: function(callback) {

		callback = (typeof callback != 'undefined' ? callback : null);

		this._elementOverlay.fadeOut(250, callback);

	},

	_buildBox: function() {

		var _this = this;

		if ( ! this._elementBox) {

			this._elementBox = $('<div id="dialogue-box-'+this._id+'">').appendTo('body');
			var originalDisplay = 'none',
				originalVisibility = 'visible';

		} else {

			var originalDisplay = this._elementBox.css('display'),
				originalVisibility = this._elementBox.css('visibility');

		}

		// Set box style
		this._elementBox.removeClass().addClass(this._style);

		// Hide the box, but allow us to define it's height
		this._elementBox.css({
			'display': 'block',
			'visibility': 'hidden'
		});

		// Define actions
		var actions = {

			close: function(event) {
				_this.hide();
			},

			buttonClicked: function(event) {

				// Read the button ID
				var buttonId = $(event.target).attr('data-ButtonId');

				// Close the dialogue and execute the callback (if available)
				if (typeof _this._buttons[buttonId].callback == 'function') {
					_this.hide(_this._buttons[buttonId].callback);
				} else {
					_this.hide();
				}

			}

		}

		// Render box
		var content = notes.template.build('dialogue.ejs', {
			header: this._header,
			message: this._message,
			buttons: this._buttons
		}, actions);

		// Add element
		this._elementBox.empty().append(content);

		// Get box height
		var boxHeight = this._elementBox.outerHeight();

		// Centre box within window
		this._elementBox.css({
			'display': originalDisplay,
			'margin-top': (((window.innerHeight ? window.innerHeight : $(window).height()) - boxHeight) / 2),
			'visibility': originalVisibility
		});

	},

	_showBox: function(callback) {

		callback = (typeof callback != 'undefined' ? callback : null);

		this._elementBox.fadeIn(250, callback);

	},

	_hideBox: function(callback) {

		callback = (typeof callback != 'undefined' ? callback : null);

		this._elementBox.fadeOut(250, callback);

	},

	setStyle: function(data) {
		this._style = data;
	},

	setHeader: function(data) {
		this._header = data;
	},

	setMessage: function(data) {
		this._message = data;
	},

	setButtons: function(data) {
		this._buttons = data;
	},

	build: function() {
		this._buildOverlay();
		this._buildBox();
	},

	show: function(callback) {

		var _this = this;

		$(document).on('keyup', function(event) {
			if (event.keyCode == 27) {
				_this.hide();
			}
		});

		// Show overlay
		this._showOverlay(function() {
			_this._showBox(callback);
		});

	},

	hide: function(callback) {

		var _this = this;

		$(document).off('keyup');

		// Hide box
		this._hideBox(function() {
			_this._hideOverlay(callback);
		});

	},

	destroy: function() {
		this._elementBox.remove();
		this._elementOverlay.remove();
	}

}