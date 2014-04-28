var app = process.app;

exports = module.exports = function ($routeProvider, $locationProvider) {
	var services = app.services.services;

	app.once('initialised', function () {
		app.scope.$routeProvider = $routeProvider;
		app.scope.$locationProvider = $locationProvider;
	});

	Object.keys(services).forEach(function (_key) {
		var service = services[_key];

		$routeProvider.when(service.route, {
			templateUrl: service.templateUrl,
			controller: exports.controller(_key)
		});

	});

	$locationProvider.html5Mode(true);

	app.emit('ngroutes.initialised');
};

exports.controller = function (_service) {
	return function () {
		app.scope.self = app.scope[_service];
		app.emit('route', app.scope.self);
	};
};