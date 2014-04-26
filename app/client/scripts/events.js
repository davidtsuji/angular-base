var debounce = process.app.modules.debounce;

var Events = process.app.system.classes.events.extend({

	data: debounce(function () {
		this.app.scope.$apply();
	}),

	error: function (_error) {
		console.error(_error);
	},

	initialised: function () {},

	route: function () {}

});

module.exports = new Events();