module.exports = require('./base.class').extend({
	init: function () {
		this._super();

		this.app.on('data', this.data.bind(this));
		this.app.on('error', this.error.bind(this));
		this.app.on('initialised', this.initialised.bind(this));
		this.app.on('route', this.route.bind(this));
	},

	data: function () {},
	error: function () {},
	initialised: function () {},
	route: function () {}

});