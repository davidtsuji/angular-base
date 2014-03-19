var controller = function ( _service ) {
  return function () {
    var myApp = window.myApp,
      module = myApp.scope.module = myApp.scope[ _service ];

    module.name = _service;
    module.scope = myApp.scope;
    module.init();

  };
};

var routes = function ( $routeProvider, $locationProvider ) {

  $routeProvider

  .when( '/person/:id', {
    templateUrl: '/partials/person.html',
    controller: controller( 'personService' )
  } )

  .otherwise( {
    templateUrl: 'partials/main.html',
    controller: controller( 'mainService' )
  } );

  $locationProvider.html5Mode( true );

};

module.exports = routes;