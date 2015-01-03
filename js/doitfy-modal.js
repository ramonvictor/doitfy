/* global document */
// DoitfyModal
// ----------------

// Class that receives `options` object.
function DoitfyModal(options) {
	'use strict';
	// init application
	this.init(options);

	// return object
	return this;
}

DoitfyModal.prototype.init = function(options) {
	'use strict';
	var defaults = {
		selector: '[data-open-modal]',
		modalSelector: '.doitfy-modal',
		closeSelector: '.doitfy-modal-close',
		overlay: true,
		autoOpen: false,
		onOpen: null,
		onClose: null
	};
	var self = this;

	// property `settings` stores global options
	this.settings = extend(defaults, options);

	// stores reference to modal wrapper HTML element
	this.modalElement = document.querySelector(this.settings.modalSelector);
	// stores reference to modal close button element
	this.closeButton = document.querySelector(this.settings.closeSelector);

	// register all event listerners
	this.closeButton.addEventListener('click', function() {
		self.close();
	});
};

DoitfyModal.prototype.close = function() {
	'use strict';
	var onClose = this.settings.onClose;
	if (typeof onClose === 'function') {
		onClose();
	}
};

DoitfyModal.prototype.open = function() {
	'use strict';
	var onOpen = this.settings.onOpen;
	if (typeof onOpen === 'function') {
		onOpen();
	}
};

// Merge defaults with user options
// receives `defaults` settings and User `options`
// returns merged values of `defaults` and `options`
function extend(defaults, options) {
	'use strict';
	var extended = {};
	var prop;
	for (prop in defaults) {
		if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
			extended[prop] = defaults[prop];
		}
	}
	for (prop in options) {
		if (Object.prototype.hasOwnProperty.call(options, prop)) {
			extended[prop] = options[prop];
		}
	}
	return extended;
}
