var _ = process.app.modules.underscore,
	async = process.app.modules.async,
	Person = process.app.models.person;

module.exports = require('../classes/service.class').extend({

	data: {
		people: [],
		person: {}
	},

	execute: function () {
		var self = this,
			personId = self.scope.$routeParams.id;

		async.waterfall([

			function (_callback) {
				self.getAllPeople(_callback);
			},

			function (_callback) {
				self.getPersonById(personId, _callback);
			}

		], function (_error) {
			if (_error) return;

		});
	},

	destroy: function (_person) {
		var self = this;

		if (!confirm('Are you sure you want to delete `' + _person.name + '`?')) return;

		_person.destroying = true;

		_person.$destroy(function (_error) {
			if (_error) return _person.destroying = false;
			self.data.people.splice(_.indexOf(self.data.people, _person), 1);
		});
	},

	getAllPeople: function (_callback) {
		var self = this;

		Person.$find(function (_error, _people) {
			if (!_error) self.data.people = _people;
			_callback && _callback(_error);
		});
	},

	getPersonById: function (_id, _callback) {
		var self = this;

		Person.$findOne({
			id: _id
		}, function (_error, _person) {
			self.data.person = _person;
			_callback && _callback(_error);
		});
	},

	savePerson: function () {
		var self = this;

		self.data.person.$save(function (_error) {
			if (_error) return;
			self.getAllPeople();
		});
	}

});