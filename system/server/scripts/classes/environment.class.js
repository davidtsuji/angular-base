module.exports = require('./base.class').extend({
	init: function () {
		this._super.apply(this, arguments);
		this.initialise();
	}
});