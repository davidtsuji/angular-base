module.exports = require('./base.class').extend({

	init: function () {
		this._super.apply(this, arguments);

		var self = this;

		self.app.once('initialised', function () {
			var scope = self.scope,
				services = self.services || {};

			Object.keys(services).forEach(function (_key) {
				var Service = typeof services[_key].controller === 'function' ? services[_key].controller : function () {},
					service = new Service();

				Object.defineProperties(service, {
					__route: {
						value: services[_key]
					},
					__name: {
						value: _key
					}
				});

				scope[_key] = service;
			});
		});

		self.initialise();
	}

});