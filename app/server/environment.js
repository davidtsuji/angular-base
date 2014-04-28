var Environment = process.app.system.classes.environment.extend({

	initialise: function () {

		/* Initialised */
		this.app.emit('environment.initialised', this);
	}

});

module.exports = new Environment();