/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var app = require('../../system/server/scripts');

app.express = express();
app.routes = require('./routes');

// all environments
app.express.set('port', process.env.PORT || 3000);
app.express.use(express.logger('dev'));
app.express.use(express.json());
app.express.use(express.urlencoded());
app.express.use(express.methodOverride());
app.express.use(app.express.router);
app.express.use(express.static(path.join(__dirname, '../../public')));

// development only
if ('development' === app.express.get('env')) {
	app.express.use(express.errorHandler());
}

app.routes.initialise();

http.createServer(app.express).listen(app.express.get('port'), function () {
	console.log('Express server listening on port ' + app.express.get('port'));
	console.log('Current directory: ' + process.cwd());
	console.log('Current __dirname: ' + __dirname);
});