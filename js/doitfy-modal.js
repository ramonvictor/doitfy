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

(function(app) {
	'use strict';
	app.prototype.init = function(options) {
		var defaults = {
			selector: '[data-doitfy-modal]',
			modalSelector: '.doitfy-modal',
			closeSelector: '.doitfy-modal-close',
			showModalClassName: 'doitfy-modal-is-open',
			showOverlay: true
		};
		var self = this;

		// property `settings` stores global options
		this.settings = extend(defaults, options);

		// array of modal elements
		this.modalElements = docQSA(this.settings.modalSelector);

		// array of modal trigger elements
		this.triggers = docQSA(this.settings.selector);

		// overlay setup
		if (this.settings.showOverlay) {
			setupOverlay(function() {
				self.overlayElement = docQS('.doitfy-modal-overlay');
			});
		}
	};

	// closes modal
	app.prototype.close = function(targetElement) {
		targetElement.classList.remove(this.settings.showModalClassName);

		if (this.settings.showOverlay) {
			this.overlayElement.classList.remove('is-shown');
		}
	};

	// open modal
	app.prototype.open = function(targetElement) {
		this.closeShownModal();

		targetElement.classList.add(this.settings.showModalClassName);

		if (this.settings.showOverlay) {
			this.overlayElement.classList.add('is-shown');
		}
	};

	// loops through list of triggers and fires a callback for each of them
	// `callback` returns `element` reference
	app.prototype.each = function(callback) {
		forEach(this.triggers, function(element) {
			if (typeof callback === 'function') {
				callback(element);
			}
		})
	}

	// closes modal if shown
	app.prototype.closeShownModal = function() {
		var showModalClassName = this.settings.showModalClassName;
		forEach(this.modalElements, function(element) {
			if (element.classList.contains(showModalClassName)) {
				element.classList.remove(showModalClassName);
				return;
			}
		});
	}

	// return querySelectorAll
	function docQSA(selector) {
		return document.querySelectorAll(selector);
	}

	// return querySelector
	function docQS(selector) {
		return document.querySelector(selector);
	}

	// Merge defaults with user options
	// receives `defaults` settings and User `options`
	// returns merged values of `defaults` and `options`
	function extend(defaults, options) {
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

	// loops through list of elements and fires a callback for each of them
	function forEach(elements, callback) {
		if (!isNodeList(elements)) {
			return;
		}

		for (var i = 0; i < elements.length; i = i + 1) {
			if (typeof callback === 'function') {
				callback(elements[i]);
			}
		}
	}

	// setupOverlay function
	function setupOverlay(callback) {
		var div = document.createElement('div');
		div.classList.add('doitfy-modal-overlay');
		docQS('body').appendChild(div);
		if (typeof callback === 'function') {
			callback();
		}
	}

	// receive `arrayVar` and returns boolean
	function isNodeList(arrayVar) {
		return Object.prototype.toString.call(arrayVar) === '[object NodeList]';
	}
})(DoitfyModal);
