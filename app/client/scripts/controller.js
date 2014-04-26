var Controller = process.app.system.classes.controller.extend({

	initialise: function ($scope, $route, $routeParams, $location) {
		this._super.apply(self, arguments);

		self.app.emit('initialised');
	}

});

module.exports = new Controller();