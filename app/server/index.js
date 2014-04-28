/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'),
	path = require('path'),
	app = require('../../system/server/scripts');

/* Core */
app.express = express();
app.modules = require('./modules');
app.config = require('./config');
app.environment = require('./environment');

/* App */
app.helpers = require('./helpers');
app.models = require('./models');
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

app.routes.define();

http.createServer(app.express).listen(app.express.get('port'), function () {
	console.log('Express server listening on port ' + app.express.get('port'));
	console.log('Current directory: ' + process.cwd());
	console.log('Current __dirname: ' + __dirname);
});

app.once('initialised', function () {
	console.log('initialised');
});