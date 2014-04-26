var Routes = process.app.system.classes.routes.extend({

	initialise: function () {
		var self = this,
			express = self.app.express;

		var person = new(require('./routes/person.route'))();

		express.get('/person/:id', person.html.bind(person));
		express.get('/api/person', person.collection.bind(person));
		express.get('/api/person/:id', person.getById.bind(person));
		express.put('/api/person/:id', person.put.bind(person));
		express.post('/api/person', person.post.bind(person));
		express.del('/api/person/:id', person.destroy.bind(person));

	}

});

module.exports = new Routes();