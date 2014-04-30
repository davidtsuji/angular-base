global.Grailed = require('../../../../grailed').create();

Grailed
	.set('modules', require('./modules'))
	.module('_', require('underscore'))
	.module('async', require('async'))
	.config('moldy', require('./config/moldy.config'))
	.config('environment', require('./config/environment.config'))
	.class('base', require('./classes/base.class'))
	.class('controller', require('./classes/controller.class'))
	.engine(require('../../../../grailed-angular-engine'))
	.model('person', Grailed.modules.moldy.extend('person', require('../../schemas/person.schema')))
	.controller('main', new(require('./controllers/main.controller'))())
	.controller('person', new(require('./controllers/person.controller'))())
	.route('/', {
		template: '/partials/main.html',
		controller: Grailed.controllers.main
	})
	.route('/person/:id', {
		template: '/partials/person.html',
		controller: Grailed.controllers.person
	})
	.end();

module.exports = Grailed;