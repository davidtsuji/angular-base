var async = require('async'),
	Browser = require('zombie');

describe('test', function () {

	it('should load zombie', function (_done) {

		var browser = new Browser();

		async.series([

			function (cb) {
				browser.visit('http://localhost:3000', cb);
			},

			function (cb) {
				browser.wait(function () {
					return browser.window.document.querySelector('form');
				}, cb);
			},

			function (cb) {
				browser.fill('name', 'david', cb);
			}


		], function (_error) {
			_done(_error);
		});

		// .then(function () {
		// 	browser.wait(function () {
		// 		return browser.window.document.querySelector('form');
		// 	});
		// })
		// .then(function () {
		// 	browser.fill('name', 'david');
		// })
		// .then(function () {
		// 	return browser.pressButton('create person');
		// })
		// .then(function (f) {
		// 	console.log(1);
		// })
		// .then(function () {
		// 	console.log(2);
		// })
		// .then(function () {
		// 	browser.wait(function () {
		// 		return browser.window.document.querySelector('nav > ul > li > a:contains("david")');
		// 	});
		// })
		// .then(function () {
		// 	_done();
		// });

	});
});