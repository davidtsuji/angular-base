var app = process.app,
	debounce = app.modules.debounce,
	Moldy = app.modules.moldy,
	hasKey = app.modules.hasKey;

Moldy.use(require('moldy-ajax-adapter'));
Moldy.defaults.baseUrl = '/api';

app.once('models.initialised', function (_models) {
	var models = _models;

	Object.getOwnPropertyNames(models).forEach(function (_model) {
		if (!hasKey(models[_model], '__moldy', 'boolean')) return;
		['findOne', 'find', 'save', 'destroy'].forEach(function (_event) {
			models[_model].on(_event, debounce(function () {
				app.scope.$apply();
			}));
		});
	});

});