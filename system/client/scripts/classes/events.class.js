module.exports = require('./base.class').extend({
	init: function () {
		this._super.apply(this, arguments);

		this.app.on('error', this.error.bind(this));
		this.app.on('initialised', this.initialised.bind(this));
		this.app.on('route', this.route.bind(this));

		this.initialise();
	},

	error: function () {},
	initialised: function () {},
	route: function () {}

});