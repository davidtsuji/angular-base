var Routes = process.app.system.classes.routes.extend({

	routeChanged: function (_service) {
		this._super.apply(this, arguments);
	}

});

module.exports = new Routes();