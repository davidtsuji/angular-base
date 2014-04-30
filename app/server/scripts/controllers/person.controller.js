var Person = Grailed.models.person;

module.exports = Grailed.classes.controller.extend({

	find: function (_req, _res) {
		Person.$find(function (_error, _people) {
			if (_error) return _res.json(_error);

			var people = [];

			_people.forEach(function (_person) {
				people.push(_person.$json());
			});

			_res.json(people);
		});
	},

	destroy: function (_req, _res) {
		var person = Person.create(_req.body);
		person.$destroy(function (_error, _person) {
			_res.json(_error || _person.$json());
		});
	},

	getById: function (_req, _res) {
		Person.$findOne({
			id: _req.params.id
		}, function (_error, _person) {
			_res.json(_error || _person.$json());
		});
	},

	put: function (_req, _res) {
		var person = Person.create(_req.body);
		person.$save(function (_error, _person) {
			_res.json(_error || _person.$json());
		});
	},

	post: function (_req, _res) {
		var person = Person.create(_req.body);
		person.$save(function (_error, _person) {
			_res.json(_error || _person.$json());
		});
	}

});