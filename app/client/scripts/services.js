var Services = process.app.system.classes.services.extend({

	services: {

		'mainService': {
			route: '/',
			templateUrl: '/partials/main.html',
			controller: require('./services/main.service.js')
		},

		'personService': {
			route: '/person/:id',
			templateUrl: '/partials/person.html',
			controller: require('./services/person.service.js')
		}

	}

});

module.exports = new Services();