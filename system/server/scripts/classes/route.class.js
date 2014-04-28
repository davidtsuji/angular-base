module.exports = require('./base.class').extend({

	init: function () {
		this._super.apply(this, arguments);
		this.initialise();
	},

	get: function () {},
	put: function () {},
	post: function () {},
	delete: function () {},
	html: function (_req, _res) {
		_res.sendfile('./public/index.html');
	}

});