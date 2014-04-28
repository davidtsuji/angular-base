var Config = process.app.system.classes.config.extend({

	initialise: function () {

		/* Require all configs */
		require('./config/moldy.config');

		/* Initialised */
		this.app.emit('config.initialised', this);
	},

	eventsToWaitFor: [

		/* Core */
		'environment.initialised',
		'helpers.initialised',
		'models.initialised',
		'routes.initialised'

	]

});

module.exports = new Config();