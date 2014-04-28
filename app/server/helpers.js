var Helpers = process.app.system.classes.helpers.extend({

	initialise: function () {

		/* Initialised */
		this.app.emit('helpers.initialised', this);
	}

});

module.exports = new Helpers();