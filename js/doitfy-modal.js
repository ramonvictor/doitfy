// DoitfyModal
// ----------------
var DoitfyModal = (function(window, undefined) {
	'use strict';

	// @module: DoitfyModal
	// @class: receives `options` object.
	// @returns: {Object} `this` and its public methods
	function DoitfyModal(options) {
		this.init(options);

		return this;
	}

	// @public: inits application
	// @param: {Object} `options`
	DoitfyModal.prototype.init = function(options) {
		// {Object} `defaults` definition
		var defaults = {
			selector: '[data-doitfy-modal]',
			modalSelector: '.doitfy-modal',
			closeSelector: '.doitfy-modal-close',
			showModalClassName: 'doitfy-modal-is-open',
			showOverlay: true
		};
		var self = this;

		// {Object} `settings` - stores global options
		this.settings = extend(defaults, options);

		// {Array} of modal wrapper elements
		this.modalElements = docQSA(this.settings.modalSelector);

		// {Array} of modal trigger elements
		this.triggers = docQSA(this.settings.selector);

		// Checks overlay option
		if (this.settings.showOverlay) {
			setupOverlay(function() {
				// {Object} modal overlay element
				self.overlayElement = docQS('.doitfy-modal-overlay');
			});
		}
	};

	// @public: closes modal
	// @param: {Object} `targetElement`
	DoitfyModal.prototype.close = function(targetElement) {
		targetElement.classList.remove(this.settings.showModalClassName);

		if (this.settings.showOverlay) {
			this.overlayElement.classList.remove('is-shown');
		}
	};

	// @public: opens modal
	// @param: {Object} `targetElement`
	DoitfyModal.prototype.open = function(targetElement) {
		this.closeShownModal();

		targetElement.classList.add(this.settings.showModalClassName);

		if (this.settings.showOverlay) {
			this.overlayElement.classList.add('is-shown');
		}
	};

	// @public: loops through list of triggers and fires a callback
	// @returns: `callback`
	DoitfyModal.prototype.each = function(callback) {
		var array = [];
		array.forEach.call(this.triggers, function(element) {
			if (typeof callback === 'function') {
				callback(element);
			}
		});
	}

	// @public: closes modal if any is shown
	DoitfyModal.prototype.closeShownModal = function() {
		var array = [];
		var showModalClassName = this.settings.showModalClassName;
		array.forEach.call(this.modalElements, function(element) {
			if (element.classList.contains(showModalClassName)) {
				element.classList.remove(showModalClassName);
				return;
			}
		});
	}

	// @private: short version of querySelectorAll
	// @param: {string} `selector` - css-like
	// @returns: {Array|NodeList} selector list
	function docQSA(selector) {
		return document.querySelectorAll(selector);
	}

	// @private: short version of querySelector
	// @param: css-like `selector`
	// @returns: {Object} first DOM selector
	function docQS(selector) {
		return document.querySelector(selector);
	}

	// @private: merge defaults with user options
	// @param: `defaults` settings and user `options`
	// @returns: merged values of `defaults` and `options`
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

	// @private: creates overlay element
	// @param: `callback` - on finish
	// @returns: `callback`
	function setupOverlay(callback) {
		var div = document.createElement('div');
		div.classList.add('doitfy-modal-overlay');
		docQS('body').appendChild(div);
		if (typeof callback === 'function') {
			callback();
		}
	}

	return DoitfyModal;
})(window);
