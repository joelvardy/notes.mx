function Analytics() {
	//
}

Analytics.prototype = {

	init: function() {
		//
	},

	triggerPageview: function(url) {
		_gaq.push(['_trackPageview', url]);
	},

	triggerUserAction: function(action, label) {
		_gaq.push(['_trackEvent', 'userActions', action, label, null, true]);
	}

}
