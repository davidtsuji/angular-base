var Person = Grailed.models.person;

module.exports = Grailed.classes.controller.extend({

	data: {
		people: [],
		new: {
			person: Person.create()
		}
	},

	get: function () {
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

		Person.$find(function (_error, _people) {
			if (!_error) self.data.people = _people;
			_callback && _callback(_error);
		});
	},

	personCreate: function () {
		var self = this;

		if (!self.data.new.person.$isValid()) return Grailed.emit('error', 'A name is required');

		self.data.new.person.$save(function (_error) {
			if (_error) return Grailed.emit('error', _error);
			self.data.new.person = Person.create();
			self.getAllPeople();
		});

	}

});