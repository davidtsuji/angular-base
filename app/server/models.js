var Moldy = process.app.modules.moldy;

var Models = process.app.system.classes.models.extend({

	init: function () {
		Moldy.use(require('moldy-file-adapter'));
	},

	'person': Moldy.extend('person', require('../schemas/person.schema'))

});

module.exports = new Models();