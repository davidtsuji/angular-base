var app = require('../app');

module.exports = app.class.base.extend({

	init: function () {
		var self = this;

		self.model = new app.modules.moldy(self.name, {
			baseUrl: app.config.api.base
		});

	}

});