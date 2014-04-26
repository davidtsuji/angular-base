var Person = process.app.models.person;

module.exports = process.app.system.classes.route.extend({

	init: function () {
		this._super();
		this.name = 'person';
	},

	collection: function (_req, _res) {
		var id = _req.params.id || 0;

		Person.$collection(function (_error, _people) {
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
		var id = _req.params.id || 0;

		Person.$get({
			id: _req.params.id
		}, function (_error, _person) {
			_res.json(_error || _person.length > 0 ? _person[0].$json() : {});
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