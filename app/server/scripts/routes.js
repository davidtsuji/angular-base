var Routes = process.app.system.classes.routes.extend({

	initialise: function () {},

	define: function () {
		var self = this,
			express = self.app.express;

		var person = new(require('./routes/person.route'))();

		express.get('/person/:id', person.html.bind(person));
		express.get('/api/person', person.find.bind(person));
		express.get('/api/person/:id', person.getById.bind(person));
		express.put('/api/person/:id', person.put.bind(person));
		express.post('/api/person', person.post.bind(person));
		express.del('/api/person/:id', person.destroy.bind(person));

		/* Initialised */
		this.app.emit('routes.initialised', this);
	}

});

module.exports = new Routes();