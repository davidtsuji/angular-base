var emitter = require('emitter-component'),
	app = process.app = exports = module.exports,
	processes = [];

emitter(app);

/* Core */
app.system = {};
app.system.classes = {};
app.system.classes.config = require('./classes/config.class');
app.system.classes.environment = require('./classes/environment.class');
app.system.classes.helpers = require('./classes/helpers.class');
app.system.classes.models = require('./classes/models.class');
app.system.classes.route = require('./classes/route.class');
app.system.classes.routes = require('./classes/routes.class');

app.once('config.initialised', function (_config) {
	var config = _config,
		app = config.app,
		async = app.modules.async;

	config.eventsToWaitFor.forEach(function (_processEvent) {
		processes.push(function (_callback) {
			app.once(_processEvent, function () {
				_callback();
			});
		});
	});

	async.parallel(processes, function () {
		process.nextTick(function () {
			app.emit('initialised');
		});
	});
});