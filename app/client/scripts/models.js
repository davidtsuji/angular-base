var Models = process.app.system.classes.models.extend({

	models: {

		'person': {
			model: require('./models/person.model'),
			schema: require('../../schemas/person.schema')
		}

	}

});

module.exports = new Models();