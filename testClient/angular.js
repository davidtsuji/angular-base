describe('angular', function () {

	var $body;

	before(function (_done) {
		this.timeout(10000);
		this.slow(10000);
		$(function () {
			var $iframe = $('iframe');
			$iframe.on('load', function () {
				$body = $iframe.contents().find('body');
				_done();
			});
		});
	});

	it('angular should exist', function () {
		Should.exist(angular);
	});

});