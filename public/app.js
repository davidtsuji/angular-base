(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var modules = require( '../modules' );

module.exports = modules.klass( function () {
  console.log( 'model.class constructor' );

} ).methods( {

} );
},{"../modules":4}],2:[function(require,module,exports){
var modules = require( '../modules' );

module.exports = modules.klass( function () {
  console.log( 'service.class constructor' );

} ).methods( {

  init: function () {
    console.log( 'Service Class Init' );
  }

} );
},{"../modules":4}],3:[function(require,module,exports){
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
},{"./modules":4}],4:[function(require,module,exports){
/* modules */
exports = module.exports = {
  klass: require( 'klass' ),
  routes: require( './routes' )
};

/* classes */
exports.classes = {
  model: require( './classes/model.class' ),
  service: require( './classes/service.class' )
};

/* services */
exports.services = {
  main: {
    name: 'mainService',
    service: require( './services/main.service' )
  },
  person: {
    name: 'personService',
    service: require( './services/person.service' )
  }
};
},{"./classes/model.class":1,"./classes/service.class":2,"./routes":5,"./services/main.service":6,"./services/person.service":7,"klass":8}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
var modules = require( '../modules' );

exports = module.exports = function () {
  return new exports.Service();
};

exports.Service = modules.classes.service.extend( function () {
  console.log( 'mainService constructor' )

} ).methods( {

  init: function () {
    console.log( 'mainService class init' );
  },

  data: {
    item: {},
    items: [],
    new: {}
  }

} );
},{"../modules":4}],7:[function(require,module,exports){
var modules = require( '../modules' );

exports = module.exports = function () {
  return new exports.Service();
};

exports.Service = modules.classes.service.extend( function () {
  console.log( 'peopleService constructor' )

} ).methods( {

  init: function () {
    var self = this;

    console.log( 'peopleService class init' );

    switch ( self.scope.$routeParams.id ) {
    case '1':
      self.data.item.name = 'David';
      break;

    case '2':
      self.data.item.name = 'Glen';
      break;
    }

  },

  data: {
    item: {
      name: ''
    },
    items: [],
    new: {}
  }

} );
},{"../modules":4}],8:[function(require,module,exports){
/*!
  * klass: a classical JS OOP façade
  * https://github.com/ded/klass
  * License MIT (c) Dustin Diaz 2014
  */

!function (name, context, definition) {
  if (typeof define == 'function') define(definition)
  else if (typeof module != 'undefined') module.exports = definition()
  else context[name] = definition()
}('klass', this, function () {
  var context = this
    , f = 'function'
    , fnTest = /xyz/.test(function () {xyz}) ? /\bsupr\b/ : /.*/
    , proto = 'prototype'

  function klass(o) {
    return extend.call(isFn(o) ? o : function () {}, o, 1)
  }

  function isFn(o) {
    return typeof o === f
  }

  function wrap(k, fn, supr) {
    return function () {
      var tmp = this.supr
      this.supr = supr[proto][k]
      var undef = {}.fabricatedUndefined
      var ret = undef
      try {
        ret = fn.apply(this, arguments)
      } finally {
        this.supr = tmp
      }
      return ret
    }
  }

  function process(what, o, supr) {
    for (var k in o) {
      if (o.hasOwnProperty(k)) {
        what[k] = isFn(o[k])
          && isFn(supr[proto][k])
          && fnTest.test(o[k])
          ? wrap(k, o[k], supr) : o[k]
      }
    }
  }

  function extend(o, fromSub) {
    // must redefine noop each time so it doesn't inherit from previous arbitrary classes
    function noop() {}
    noop[proto] = this[proto]
    var supr = this
      , prototype = new noop()
      , isFunction = isFn(o)
      , _constructor = isFunction ? o : this
      , _methods = isFunction ? {} : o
    function fn() {
      if (this.initialize) this.initialize.apply(this, arguments)
      else {
        fromSub || isFunction && supr.apply(this, arguments)
        _constructor.apply(this, arguments)
      }
    }

    fn.methods = function (o) {
      process(prototype, o, supr)
      fn[proto] = prototype
      return this
    }

    fn.methods.call(fn, _methods).prototype.constructor = fn

    fn.extend = arguments.callee
    fn[proto].implement = fn.statics = function (o, optFn) {
      o = typeof o == 'string' ? (function () {
        var obj = {}
        obj[o] = optFn
        return obj
      }()) : o
      process(this, o, supr)
      return this
    }

    return fn
  }

  return klass
});

},{}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvaG9tZS9nbGVuL3NsL2FuZ3VsYXItYmFzZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvZ2xlbi9zbC9hbmd1bGFyLWJhc2UvYXBwL2NsaWVudC9zY3JpcHRzL2NsYXNzZXMvbW9kZWwuY2xhc3MuanMiLCIvaG9tZS9nbGVuL3NsL2FuZ3VsYXItYmFzZS9hcHAvY2xpZW50L3NjcmlwdHMvY2xhc3Nlcy9zZXJ2aWNlLmNsYXNzLmpzIiwiL2hvbWUvZ2xlbi9zbC9hbmd1bGFyLWJhc2UvYXBwL2NsaWVudC9zY3JpcHRzL2Zha2VfOTE2NTliZDUuanMiLCIvaG9tZS9nbGVuL3NsL2FuZ3VsYXItYmFzZS9hcHAvY2xpZW50L3NjcmlwdHMvbW9kdWxlcy5qcyIsIi9ob21lL2dsZW4vc2wvYW5ndWxhci1iYXNlL2FwcC9jbGllbnQvc2NyaXB0cy9yb3V0ZXMuanMiLCIvaG9tZS9nbGVuL3NsL2FuZ3VsYXItYmFzZS9hcHAvY2xpZW50L3NjcmlwdHMvc2VydmljZXMvbWFpbi5zZXJ2aWNlLmpzIiwiL2hvbWUvZ2xlbi9zbC9hbmd1bGFyLWJhc2UvYXBwL2NsaWVudC9zY3JpcHRzL3NlcnZpY2VzL3BlcnNvbi5zZXJ2aWNlLmpzIiwiL2hvbWUvZ2xlbi9zbC9hbmd1bGFyLWJhc2Uvbm9kZV9tb2R1bGVzL2tsYXNzL2tsYXNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIG1vZHVsZXMgPSByZXF1aXJlKCAnLi4vbW9kdWxlcycgKTtcblxubW9kdWxlLmV4cG9ydHMgPSBtb2R1bGVzLmtsYXNzKCBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUubG9nKCAnbW9kZWwuY2xhc3MgY29uc3RydWN0b3InICk7XG5cbn0gKS5tZXRob2RzKCB7XG5cbn0gKTsiLCJ2YXIgbW9kdWxlcyA9IHJlcXVpcmUoICcuLi9tb2R1bGVzJyApO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1vZHVsZXMua2xhc3MoIGZ1bmN0aW9uICgpIHtcbiAgY29uc29sZS5sb2coICdzZXJ2aWNlLmNsYXNzIGNvbnN0cnVjdG9yJyApO1xuXG59ICkubWV0aG9kcygge1xuXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZyggJ1NlcnZpY2UgQ2xhc3MgSW5pdCcgKTtcbiAgfVxuXG59ICk7IiwidmFyIG1vZHVsZXMgPSByZXF1aXJlKCAnLi9tb2R1bGVzJyApO1xuXG4vKiBNYWluIEFwcCAqL1xud2luZG93Lm15QXBwID0ge1xuXG4gIG1vZHVsZTogYW5ndWxhci5tb2R1bGUoICdteUFwcCcsIFsgJ25nUm91dGUnIF0gKS5jb25maWcoIG1vZHVsZXMucm91dGVzICksXG4gIHNjb3BlOiBudWxsLFxuICBjb250cm9sbGVyOiBmdW5jdGlvbiAoXG4gICAgJHNjb3BlLFxuICAgICRyb3V0ZSxcbiAgICAkcm91dGVQYXJhbXMsXG4gICAgJGxvY2F0aW9uLFxuICAgIG1haW5TZXJ2aWNlLFxuICAgIHBlcnNvblNlcnZpY2VcbiAgKSB7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvKiBDb3JlICovXG4gICAgc2VsZi5zY29wZSA9IHdpbmRvdy5teUFwcC5zY29wZSA9ICRzY29wZTtcbiAgICBzZWxmLnNjb3BlLiRyb3V0ZSA9ICRyb3V0ZTtcbiAgICBzZWxmLnNjb3BlLiRyb3V0ZVBhcmFtcyA9ICRyb3V0ZVBhcmFtcztcblxuICAgIC8qIFNlcnZpY2VzICovXG4gICAgc2VsZi5zY29wZS5tYWluU2VydmljZSA9IG1haW5TZXJ2aWNlO1xuICAgIHNlbGYuc2NvcGUucGVyc29uU2VydmljZSA9IHBlcnNvblNlcnZpY2U7XG5cbiAgfVxuXG59O1xuXG4vKiBTZXJ2aWNlcyAqL1xuT2JqZWN0LmtleXMoIG1vZHVsZXMuc2VydmljZXMgKS5mb3JFYWNoKCBmdW5jdGlvbiAoIF9rZXkgKSB7XG4gIG15QXBwLm1vZHVsZS5mYWN0b3J5KCBtb2R1bGVzLnNlcnZpY2VzWyBfa2V5IF0ubmFtZSwgbW9kdWxlcy5zZXJ2aWNlc1sgX2tleSBdLnNlcnZpY2UgKTtcbn0gKTsiLCIvKiBtb2R1bGVzICovXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIGtsYXNzOiByZXF1aXJlKCAna2xhc3MnICksXG4gIHJvdXRlczogcmVxdWlyZSggJy4vcm91dGVzJyApXG59O1xuXG4vKiBjbGFzc2VzICovXG5leHBvcnRzLmNsYXNzZXMgPSB7XG4gIG1vZGVsOiByZXF1aXJlKCAnLi9jbGFzc2VzL21vZGVsLmNsYXNzJyApLFxuICBzZXJ2aWNlOiByZXF1aXJlKCAnLi9jbGFzc2VzL3NlcnZpY2UuY2xhc3MnIClcbn07XG5cbi8qIHNlcnZpY2VzICovXG5leHBvcnRzLnNlcnZpY2VzID0ge1xuICBtYWluOiB7XG4gICAgbmFtZTogJ21haW5TZXJ2aWNlJyxcbiAgICBzZXJ2aWNlOiByZXF1aXJlKCAnLi9zZXJ2aWNlcy9tYWluLnNlcnZpY2UnIClcbiAgfSxcbiAgcGVyc29uOiB7XG4gICAgbmFtZTogJ3BlcnNvblNlcnZpY2UnLFxuICAgIHNlcnZpY2U6IHJlcXVpcmUoICcuL3NlcnZpY2VzL3BlcnNvbi5zZXJ2aWNlJyApXG4gIH1cbn07IiwidmFyIGNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoIF9zZXJ2aWNlICkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBteUFwcCA9IHdpbmRvdy5teUFwcCxcbiAgICAgIG1vZHVsZSA9IG15QXBwLnNjb3BlLm1vZHVsZSA9IG15QXBwLnNjb3BlWyBfc2VydmljZSBdO1xuXG4gICAgbW9kdWxlLm5hbWUgPSBfc2VydmljZTtcbiAgICBtb2R1bGUuc2NvcGUgPSBteUFwcC5zY29wZTtcbiAgICBtb2R1bGUuaW5pdCgpO1xuXG4gIH07XG59O1xuXG52YXIgcm91dGVzID0gZnVuY3Rpb24gKCAkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIgKSB7XG5cbiAgJHJvdXRlUHJvdmlkZXJcblxuICAud2hlbiggJy9wZXJzb24vOmlkJywge1xuICAgIHRlbXBsYXRlVXJsOiAnL3BhcnRpYWxzL3BlcnNvbi5odG1sJyxcbiAgICBjb250cm9sbGVyOiBjb250cm9sbGVyKCAncGVyc29uU2VydmljZScgKVxuICB9IClcblxuICAub3RoZXJ3aXNlKCB7XG4gICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9tYWluLmh0bWwnLFxuICAgIGNvbnRyb2xsZXI6IGNvbnRyb2xsZXIoICdtYWluU2VydmljZScgKVxuICB9ICk7XG5cbiAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKCB0cnVlICk7XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcm91dGVzOyIsInZhciBtb2R1bGVzID0gcmVxdWlyZSggJy4uL21vZHVsZXMnICk7XG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG5ldyBleHBvcnRzLlNlcnZpY2UoKTtcbn07XG5cbmV4cG9ydHMuU2VydmljZSA9IG1vZHVsZXMuY2xhc3Nlcy5zZXJ2aWNlLmV4dGVuZCggZnVuY3Rpb24gKCkge1xuICBjb25zb2xlLmxvZyggJ21haW5TZXJ2aWNlIGNvbnN0cnVjdG9yJyApXG5cbn0gKS5tZXRob2RzKCB7XG5cbiAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKCAnbWFpblNlcnZpY2UgY2xhc3MgaW5pdCcgKTtcbiAgfSxcblxuICBkYXRhOiB7XG4gICAgaXRlbToge30sXG4gICAgaXRlbXM6IFtdLFxuICAgIG5ldzoge31cbiAgfVxuXG59ICk7IiwidmFyIG1vZHVsZXMgPSByZXF1aXJlKCAnLi4vbW9kdWxlcycgKTtcblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gbmV3IGV4cG9ydHMuU2VydmljZSgpO1xufTtcblxuZXhwb3J0cy5TZXJ2aWNlID0gbW9kdWxlcy5jbGFzc2VzLnNlcnZpY2UuZXh0ZW5kKCBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUubG9nKCAncGVvcGxlU2VydmljZSBjb25zdHJ1Y3RvcicgKVxuXG59ICkubWV0aG9kcygge1xuXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBjb25zb2xlLmxvZyggJ3Blb3BsZVNlcnZpY2UgY2xhc3MgaW5pdCcgKTtcblxuICAgIHN3aXRjaCAoIHNlbGYuc2NvcGUuJHJvdXRlUGFyYW1zLmlkICkge1xuICAgIGNhc2UgJzEnOlxuICAgICAgc2VsZi5kYXRhLml0ZW0ubmFtZSA9ICdEYXZpZCc7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJzInOlxuICAgICAgc2VsZi5kYXRhLml0ZW0ubmFtZSA9ICdHbGVuJztcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICB9LFxuXG4gIGRhdGE6IHtcbiAgICBpdGVtOiB7XG4gICAgICBuYW1lOiAnJ1xuICAgIH0sXG4gICAgaXRlbXM6IFtdLFxuICAgIG5ldzoge31cbiAgfVxuXG59ICk7IiwiLyohXG4gICoga2xhc3M6IGEgY2xhc3NpY2FsIEpTIE9PUCBmYcOnYWRlXG4gICogaHR0cHM6Ly9naXRodWIuY29tL2RlZC9rbGFzc1xuICAqIExpY2Vuc2UgTUlUIChjKSBEdXN0aW4gRGlheiAyMDE0XG4gICovXG5cbiFmdW5jdGlvbiAobmFtZSwgY29udGV4dCwgZGVmaW5pdGlvbikge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nKSBkZWZpbmUoZGVmaW5pdGlvbilcbiAgZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKClcbiAgZWxzZSBjb250ZXh0W25hbWVdID0gZGVmaW5pdGlvbigpXG59KCdrbGFzcycsIHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIGNvbnRleHQgPSB0aGlzXG4gICAgLCBmID0gJ2Z1bmN0aW9uJ1xuICAgICwgZm5UZXN0ID0gL3h5ei8udGVzdChmdW5jdGlvbiAoKSB7eHl6fSkgPyAvXFxic3VwclxcYi8gOiAvLiovXG4gICAgLCBwcm90byA9ICdwcm90b3R5cGUnXG5cbiAgZnVuY3Rpb24ga2xhc3Mobykge1xuICAgIHJldHVybiBleHRlbmQuY2FsbChpc0ZuKG8pID8gbyA6IGZ1bmN0aW9uICgpIHt9LCBvLCAxKVxuICB9XG5cbiAgZnVuY3Rpb24gaXNGbihvKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvID09PSBmXG4gIH1cblxuICBmdW5jdGlvbiB3cmFwKGssIGZuLCBzdXByKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0bXAgPSB0aGlzLnN1cHJcbiAgICAgIHRoaXMuc3VwciA9IHN1cHJbcHJvdG9dW2tdXG4gICAgICB2YXIgdW5kZWYgPSB7fS5mYWJyaWNhdGVkVW5kZWZpbmVkXG4gICAgICB2YXIgcmV0ID0gdW5kZWZcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRoaXMuc3VwciA9IHRtcFxuICAgICAgfVxuICAgICAgcmV0dXJuIHJldFxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3Mod2hhdCwgbywgc3Vwcikge1xuICAgIGZvciAodmFyIGsgaW4gbykge1xuICAgICAgaWYgKG8uaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgd2hhdFtrXSA9IGlzRm4ob1trXSlcbiAgICAgICAgICAmJiBpc0ZuKHN1cHJbcHJvdG9dW2tdKVxuICAgICAgICAgICYmIGZuVGVzdC50ZXN0KG9ba10pXG4gICAgICAgICAgPyB3cmFwKGssIG9ba10sIHN1cHIpIDogb1trXVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dGVuZChvLCBmcm9tU3ViKSB7XG4gICAgLy8gbXVzdCByZWRlZmluZSBub29wIGVhY2ggdGltZSBzbyBpdCBkb2Vzbid0IGluaGVyaXQgZnJvbSBwcmV2aW91cyBhcmJpdHJhcnkgY2xhc3Nlc1xuICAgIGZ1bmN0aW9uIG5vb3AoKSB7fVxuICAgIG5vb3BbcHJvdG9dID0gdGhpc1twcm90b11cbiAgICB2YXIgc3VwciA9IHRoaXNcbiAgICAgICwgcHJvdG90eXBlID0gbmV3IG5vb3AoKVxuICAgICAgLCBpc0Z1bmN0aW9uID0gaXNGbihvKVxuICAgICAgLCBfY29uc3RydWN0b3IgPSBpc0Z1bmN0aW9uID8gbyA6IHRoaXNcbiAgICAgICwgX21ldGhvZHMgPSBpc0Z1bmN0aW9uID8ge30gOiBvXG4gICAgZnVuY3Rpb24gZm4oKSB7XG4gICAgICBpZiAodGhpcy5pbml0aWFsaXplKSB0aGlzLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgZWxzZSB7XG4gICAgICAgIGZyb21TdWIgfHwgaXNGdW5jdGlvbiAmJiBzdXByLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgX2NvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmbi5tZXRob2RzID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgIHByb2Nlc3MocHJvdG90eXBlLCBvLCBzdXByKVxuICAgICAgZm5bcHJvdG9dID0gcHJvdG90eXBlXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIGZuLm1ldGhvZHMuY2FsbChmbiwgX21ldGhvZHMpLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGZuXG5cbiAgICBmbi5leHRlbmQgPSBhcmd1bWVudHMuY2FsbGVlXG4gICAgZm5bcHJvdG9dLmltcGxlbWVudCA9IGZuLnN0YXRpY3MgPSBmdW5jdGlvbiAobywgb3B0Rm4pIHtcbiAgICAgIG8gPSB0eXBlb2YgbyA9PSAnc3RyaW5nJyA/IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmpbb10gPSBvcHRGblxuICAgICAgICByZXR1cm4gb2JqXG4gICAgICB9KCkpIDogb1xuICAgICAgcHJvY2Vzcyh0aGlzLCBvLCBzdXByKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICByZXR1cm4gZm5cbiAgfVxuXG4gIHJldHVybiBrbGFzc1xufSk7XG4iXX0=
