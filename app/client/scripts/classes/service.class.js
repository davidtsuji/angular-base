module.exports = process.app.system.classes.service.extend({

	initModels: function (_models, _callback) {
		_callback();
		// var self = this,
		// 	q = async.queue(function (_modelName, _qCallback) {
		// 		var model = self.data[_modelName] = new app.model[_modelName]().model;
		// 		model.once('__schema', function (_error) {
		// 			if (_error) {
		// 				return _qCallback(_error);
		// 			}
		// 			Object.keys(model.__schema.properties).forEach(function (_key) {
		// 				model.$property(_key, model.__schema[_key]);
		// 			});
		// 			_qCallback();
		// 		});
		// 	}, 3);
		// q.drain = _callback;
		// q.push(_models);
	}

});