module.exports = Grailed.classes.base.extend({
	html: function (_req, _res) {
		_res.sendfile(process.cwd() + '/public/index.html');
	}
});