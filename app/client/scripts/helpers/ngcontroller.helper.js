var app = process.app;

module.exports = function ($scope, $route, $routeParams, $location) {
	var scope = app.scope = $scope;

	scope.$location = $location;
	scope.$route = $route;
	scope.$routeParams = $routeParams;
	scope.helpers = app.helpers;

	app.emit('ngcontroller.initialised');
}