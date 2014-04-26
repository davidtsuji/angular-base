var Moldy = process.app.modules.moldy;

var Models = process.app.system.classes.models.extend({

	init: function () {
		this._super();

		var self = this;

		Moldy.use(require('moldy-ajax-adapter'));
		Moldy.defaults.baseUrl = '/api';

		self.person.on('get', self.app.emit.bind(self.app, ['data']));
		self.person.on('collection', self.app.emit.bind(self.app, ['data']));
		self.person.on('save', self.app.emit.bind(self.app, ['data']));
		self.person.on('destroy', self.app.emit.bind(self.app, ['data']));

	},

	'person': Moldy.extend('person', require('../../schemas/person.schema'))

});

module.exports = new Models();