var app = require('../../../system/client/scripts');

app.config = require('./config');
app.controller = require('./controller');
app.environment = require('./environment');
app.events = require('./events');
app.helpers = require('./helpers');
app.models = require('./models');
app.routes = require('./routes');
app.services = require('./services');

angular.module('app', ['ngRoute']).config(app.routes.proxy(app.routes));
app.controller.initialise.$inject = ['$scope', '$route', '$routeParams', '$location'];

exports = module.exports = app;