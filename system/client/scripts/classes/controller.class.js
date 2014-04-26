module.exports = require('./base.class').extend({

	initialise: function ($scope, $route, $routeParams, $location) {
		var self = this,
			app = process.app,
			scope = app.scope = $scope;

		scope.$location = $location;
		scope.$route = $route;
		scope.$routeParams = $routeParams;
		scope.helpers = app.helpers;
	}

});