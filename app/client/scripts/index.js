var app = require('../../../system/client/scripts');

/* Core */
app.modules = require('./modules');
app.config = require('./config');
app.environment = require('./environment');

/* App */
app.events = require('./events');
app.helpers = require('./helpers');
app.models = require('./models');
app.services = require('./services');

/* Initialise Angular */
angular.module('app', ['ngRoute']).config(app.helpers.ngroutes);
app.helpers.ngroutes.$inject = ['$routeProvider', '$locationProvider'];
app.helpers.ngcontroller.$inject = ['$scope', '$route', '$routeParams', '$location'];

exports = module.exports = app;