module.exports = require('sc-extendify')({

	init: function () {
		var self = this;

		Object.defineProperties(self, {
			app: {
				get: function () {
					return process.app;
				}
			},
			scope: {
				get: function () {
					return process.app.scope
				}
			}
		});

	}

});