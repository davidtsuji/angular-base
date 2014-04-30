global.Grailed = require('../../../../grailed').create();

Grailed
	.set('modules', require('./modules'))
	.config('express', require('./config/express.config'))
	.config('moldy', require('./config/moldy.config'))
	.class('base', require('./classes/base.class'))
	.class('controller', require('./classes/controller.class'))
	.engine(require('../../../../grailed-express-engine'))
	.model('person', Grailed.modules.moldy.extend('person', require('../../schemas/person.schema')))
	.controller('person', new(require('./controllers/person.controller'))())
	.route('/person/:id', {
		get: Grailed.controllers.person.html
	})
	.route('/api/person', {
		get: Grailed.controllers.person.find,
		post: Grailed.controllers.person.post
	})
	.route('/api/person/:id', {
		del: Grailed.controllers.person.destroy,
		get: Grailed.controllers.person.getById,
		put: Grailed.controllers.person.put
	})
	.end();

module.exports = Grailed;