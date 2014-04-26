module.exports = require('./base.class').extend({

	initialise: function ($routeProvider, $locationProvider) {
		var self = this,
			services = self.app.services.services;

		self.app.once('initialised', function () {
			self.scope.$routeProvider = $routeProvider;
			self.scope.$locationProvider = $locationProvider;
		});

		Object.keys(services).forEach(function (_key) {
			var service = services[_key];

			$routeProvider.when(service.route, {
				templateUrl: service.templateUrl,
				controller: self.controller(_key)
			});

		});

		$locationProvider.html5Mode(true);
	},

	proxy: function (_self) {
		return function ($routeProvider, $locationProvider) {
			_self.initialise.apply(_self, [$routeProvider, $locationProvider]);
		}
	},

	controller: function (_service) {
		var self = this;

		return function () {
			var args = Array.prototype.slice.call(arguments);

			self.scope.self = self.scope[_service];
			args.unshift('route');
			args.push(self.scope.self);
			self.routeChanged(self.scope.self);
			self.app.emit.apply(self.app, args);
		};
	},

	routeChanged: function (_service) {
		_service.initialise();
	}

});