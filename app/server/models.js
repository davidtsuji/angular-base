var Moldy = process.app.modules.moldy;

var Models = process.app.system.classes.models.extend({

	initialise: function () {

		/* Init Models */
		this.person = Moldy.extend('person', require('../schemas/person.schema'));

		/* Initialised */
		this.app.emit('models.initialised', this);
	}

});

module.exports = new Models();