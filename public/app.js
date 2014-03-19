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