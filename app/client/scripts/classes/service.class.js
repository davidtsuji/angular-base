module.exports = process.app.system.classes.service.extend({

	init: function () {
		var self = this;

		this._super();

		self.app.on('route', function (_class) {
			if (_class.__name === self.__name) self.execute();
		});
	}

});