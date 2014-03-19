var modules = require( './modules' );

/* Main App */
window.myApp = {

  module: angular.module( 'myApp', [ 'ngRoute' ] ).config( modules.routes ),
  scope: null,
  controller: function (
    $scope,
    $route,
    $routeParams,
    $location,
    mainService,
    personService
  ) {

    var self = this;

    /* Core */
    self.scope = window.myApp.scope = $scope;
    self.scope.$route = $route;
    self.scope.$routeParams = $routeParams;

    /* Services */
    self.scope.mainService = mainService;
    self.scope.personService = personService;

  }

};

/* Services */
Object.keys( modules.services ).forEach( function ( _key ) {
  myApp.module.factory( modules.services[ _key ].name, modules.services[ _key ].service );
} );