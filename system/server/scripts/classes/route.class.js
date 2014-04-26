module.exports = require('./base.class').extend({

	get: function () {},
	put: function () {},
	post: function () {},
	delete: function () {},
	html: function (_req, _res) {
		_res.sendfile('./public/index.html');
	}

});