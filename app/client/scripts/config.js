var Config = process.app.system.classes.config.extend({

	initialise: function () {

		/* Require all configs */
		require('./config/moldy.config');

		/* Initialised */
		this.app.emit('config.initialised', this);
	},

	eventsToWaitFor: [

		/* Core */
		'events.initialised',
		'helpers.initialised',
		'models.initialised',
		'services.initialised',

		/* Custom */
		'ngcontroller.initialised',
		'ngroutes.initialised'

	]

});

module.exports = new Config();