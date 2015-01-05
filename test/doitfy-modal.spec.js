/* jshint ignore:start */
describe('Modal', function() {
	beforeEach(function() {
		var modal = new DoitfyModal({
			showOverlay: true
		});
	});
	it('should init modal module', function() {
		var modalEl = document.querySelector('.doitfy-modal-overlay');
		expect(modalEl).not.toBe(null);
	});
});
