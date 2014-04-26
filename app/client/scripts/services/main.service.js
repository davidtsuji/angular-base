var async = process.app.modules.async,
	Person = process.app.models.person;

module.exports = process.app.system.classes.service.extend({

	data: {
		people: [],
		new: {
			person: Person.create()
		}
	},

	initialise: function () {
		var self = this;

		async.waterfall([

			function (_callback) {
				self.getAllPeople(_callback);
			}

		], function (_error) {
			if (_error) return;
		});

	},

	getAllPeople: function (_callback) {
		var self = this;

		Person.$collection(function (_error, _people) {
			if (!_error) self.data.people = _people;
			_callback && _callback(_error);
		});
	},

	personCreate: function () {
		var self = this;

		if (!self.data.new.person.$isValid()) return app.emit('error', 'A name is required');

		self.data.new.person.$save(function (_error) {
			if (_error) return app.emit('error', _error);
			self.data.new.person = Person.create();
			self.getAllPeople();
		});

	}

});