var emitter = require('emitter-component'),
	app = process.app = exports = module.exports;

emitter(app);

/* Core */
app.system = {};
app.system.classes = {};
app.system.classes.config = require('./classes/config.class');
app.system.classes.controller = require('./classes/controller.class');
app.system.classes.environment = require('./classes/environment.class');
app.system.classes.events = require('./classes/events.class');
app.system.classes.helpers = require('./classes/helpers.class');
app.system.classes.model = require('./classes/model.class');
app.system.classes.models = require('./classes/models.class');
app.system.classes.routes = require('./classes/routes.class');
app.system.classes.service = require('./classes/service.class');
app.system.classes.services = require('./classes/services.class');