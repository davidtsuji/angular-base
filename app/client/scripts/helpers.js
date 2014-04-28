var Helpers = process.app.system.classes.helpers.extend({

	initialise: function () {

		/* Initialised */
		this.app.emit('helpers.initialised', this);
	},

	ngcontroller: require('./helpers/ngcontroller.helper'),
	ngroutes: require('./helpers/ngroutes.helper')

});

module.exports = new Helpers();