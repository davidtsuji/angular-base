var debounce = Grailed.modules.debounce,
	Moldy = Grailed.modules.moldy,
	hasKey = Grailed.modules.hasKey;

Moldy.use(require('moldy-ajax-adapter'));
Moldy.defaults.baseUrl = '/api';

Grailed.once('initialised', function () {
	Object.getOwnPropertyNames(Grailed.models).forEach(function (_model) {
		if (!hasKey(Grailed.models[_model], '__moldy', 'boolean')) return;
		['findOne', 'find', 'save', 'destroy'].forEach(function (_event) {
			Grailed.models[_model].on(_event, debounce(function () {
				Grailed.angular.scope.$apply();
			}));
		});
	});
});