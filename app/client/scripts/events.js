var debounce = process.app.modules.debounce;

var Events = process.app.system.classes.events.extend({

	/* Class initialiser */
	initialise: function () {

		/* Initialised */
		this.app.emit('events.initialised', this);
	},

	/* When an error occurs */
	error: function (_error) {
		console.error(_error);
	},

	/* When the app is initialised */
	initialised: function () {
		// console.log('app.event.initialised');
	},

	/* When a route changes */
	route: function () {
		// console.log('route', arguments);
	}

});

module.exports = new Events();