(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-highlights"] = factory();
	else
		root["vue-highlights"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "1985":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("62e4")(module), __webpack_require__("c8ba")))

/***/ }),

/***/ "62e4":
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./src/utils/regex/_regexSupplant.js

/* harmony default export */ var _regexSupplant = (function (regex, map, flags) {
  flags = flags || ''
  if (typeof regex !== 'string') {
    if (regex.global && flags.indexOf('g') < 0) {
      flags += 'g'
    }
    if (regex.ignoreCase && flags.indexOf('i') < 0) {
      flags += 'i'
    }
    if (regex.multiline && flags.indexOf('m') < 0) {
      flags += 'm'
    }
    regex = regex.source
  }

  return new RegExp(
    regex.replace(/#\{(\w+)\}/g, function (match, name) {
      let newRegex = map[name] || ''
      if (typeof newRegex !== 'string') {
        newRegex = newRegex.source
      }
      return newRegex
    }),
    flags
  )
});

// CONCATENATED MODULE: ./src/utils/regex/_validCCTLD.js


const validCCTLD = _regexSupplant(
  RegExp(
    '(?:(?:' +
      '한국|香港|澳門|新加坡|台灣|台湾|中國|中国|გე|ไทย|ලංකා|ഭാരതം|ಭಾರತ|భారత్|சிங்கப்பூர்|இலங்கை|இந்தியா|ଭାରତ|ભારત|' +
      'ਭਾਰਤ|ভাৰত|ভারত|বাংলা|भारोत|भारतम्|भारत|ڀارت|پاکستان|موريتانيا|مليسيا|مصر|قطر|فلسطين|عمان|عراق|' +
      'سورية|سودان|تونس|بھارت|بارت|ایران|امارات|المغرب|السعودية|الجزائر|الاردن|հայ|қаз|укр|срб|рф|' +
      'мон|мкд|ею|бел|бг|ελ|zw|zm|za|yt|ye|ws|wf|vu|vn|vi|vg|ve|vc|va|uz|uy|us|um|uk|ug|ua|tz|tw|tv|' +
      'tt|tr|tp|to|tn|tm|tl|tk|tj|th|tg|tf|td|tc|sz|sy|sx|sv|su|st|ss|sr|so|sn|sm|sl|sk|sj|si|sh|sg|' +
      'se|sd|sc|sb|sa|rw|ru|rs|ro|re|qa|py|pw|pt|ps|pr|pn|pm|pl|pk|ph|pg|pf|pe|pa|om|nz|nu|nr|np|no|' +
      'nl|ni|ng|nf|ne|nc|na|mz|my|mx|mw|mv|mu|mt|ms|mr|mq|mp|mo|mn|mm|ml|mk|mh|mg|mf|me|md|mc|ma|ly|' +
      'lv|lu|lt|ls|lr|lk|li|lc|lb|la|kz|ky|kw|kr|kp|kn|km|ki|kh|kg|ke|jp|jo|jm|je|it|is|ir|iq|io|in|' +
      'im|il|ie|id|hu|ht|hr|hn|hm|hk|gy|gw|gu|gt|gs|gr|gq|gp|gn|gm|gl|gi|gh|gg|gf|ge|gd|gb|ga|fr|fo|' +
      'fm|fk|fj|fi|eu|et|es|er|eh|eg|ee|ec|dz|do|dm|dk|dj|de|cz|cy|cx|cw|cv|cu|cr|co|cn|cm|cl|ck|ci|' +
      'ch|cg|cf|cd|cc|ca|bz|by|bw|bv|bt|bs|br|bq|bo|bn|bm|bl|bj|bi|bh|bg|bf|be|bd|bb|ba|az|ax|aw|au|' +
      'at|as|ar|aq|ao|an|am|al|ai|ag|af|ae|ad|ac' +
      ')(?=[^0-9a-zA-Z@]|$))'
  )
)

/* harmony default export */ var _validCCTLD = (validCCTLD);

// CONCATENATED MODULE: ./src/utils/regex/_validGTLD.js


const validGTLD = _regexSupplant(
  RegExp(
    '(?:(?:' +
      '삼성|닷컴|닷넷|香格里拉|餐厅|食品|飞利浦|電訊盈科|集团|通販|购物|谷歌|诺基亚|联通|网络|网站|网店|网址|组织机构|移动|珠宝|点看|游戏|淡马锡|机构|書籍|时尚|新闻|' +
      '政府|政务|招聘|手表|手机|我爱你|慈善|微博|广东|工行|家電|娱乐|天主教|大拿|大众汽车|在线|嘉里大酒店|嘉里|商标|商店|商城|公益|公司|八卦|健康|信息|佛山|企业|' +
      '中文网|中信|世界|ポイント|ファッション|セール|ストア|コム|グーグル|クラウド|みんな|คอม|संगठन|नेट|कॉम|همراه|موقع|موبايلي|كوم|' +
      'كاثوليك|عرب|شبكة|بيتك|بازار|العليان|ارامكو|اتصالات|ابوظبي|קום|сайт|рус|орг|онлайн|москва|ком|' +
      'католик|дети|zuerich|zone|zippo|zip|zero|zara|zappos|yun|youtube|you|yokohama|yoga|yodobashi|' +
      'yandex|yamaxun|yahoo|yachts|xyz|xxx|xperia|xin|xihuan|xfinity|xerox|xbox|wtf|wtc|wow|world|' +
      'works|work|woodside|wolterskluwer|wme|winners|wine|windows|win|williamhill|wiki|wien|whoswho|' +
      'weir|weibo|wedding|wed|website|weber|webcam|weatherchannel|weather|watches|watch|warman|' +
      'wanggou|wang|walter|walmart|wales|vuelos|voyage|voto|voting|vote|volvo|volkswagen|vodka|' +
      'vlaanderen|vivo|viva|vistaprint|vista|vision|visa|virgin|vip|vin|villas|viking|vig|video|' +
      'viajes|vet|versicherung|vermögensberatung|vermögensberater|verisign|ventures|vegas|vanguard|' +
      'vana|vacations|ups|uol|uno|university|unicom|uconnect|ubs|ubank|tvs|tushu|tunes|tui|tube|trv|' +
      'trust|travelersinsurance|travelers|travelchannel|travel|training|trading|trade|toys|toyota|' +
      'town|tours|total|toshiba|toray|top|tools|tokyo|today|tmall|tkmaxx|tjx|tjmaxx|tirol|tires|tips|' +
      'tiffany|tienda|tickets|tiaa|theatre|theater|thd|teva|tennis|temasek|telefonica|telecity|tel|' +
      'technology|tech|team|tdk|tci|taxi|tax|tattoo|tatar|tatamotors|target|taobao|talk|taipei|tab|' +
      'systems|symantec|sydney|swiss|swiftcover|swatch|suzuki|surgery|surf|support|supply|supplies|' +
      'sucks|style|study|studio|stream|store|storage|stockholm|stcgroup|stc|statoil|statefarm|' +
      'statebank|starhub|star|staples|stada|srt|srl|spreadbetting|spot|sport|spiegel|space|soy|sony|' +
      'song|solutions|solar|sohu|software|softbank|social|soccer|sncf|smile|smart|sling|skype|sky|' +
      'skin|ski|site|singles|sina|silk|shriram|showtime|show|shouji|shopping|shop|shoes|shiksha|shia|' +
      'shell|shaw|sharp|shangrila|sfr|sexy|sex|sew|seven|ses|services|sener|select|seek|security|' +
      'secure|seat|search|scot|scor|scjohnson|science|schwarz|schule|school|scholarships|schmidt|' +
      'schaeffler|scb|sca|sbs|sbi|saxo|save|sas|sarl|sapo|sap|sanofi|sandvikcoromant|sandvik|samsung|' +
      'samsclub|salon|sale|sakura|safety|safe|saarland|ryukyu|rwe|run|ruhr|rugby|rsvp|room|rogers|' +
      'rodeo|rocks|rocher|rmit|rip|rio|ril|rightathome|ricoh|richardli|rich|rexroth|reviews|review|' +
      'restaurant|rest|republican|report|repair|rentals|rent|ren|reliance|reit|reisen|reise|rehab|' +
      'redumbrella|redstone|red|recipes|realty|realtor|realestate|read|raid|radio|racing|qvc|quest|' +
      'quebec|qpon|pwc|pub|prudential|pru|protection|property|properties|promo|progressive|prof|' +
      'productions|prod|pro|prime|press|praxi|pramerica|post|porn|politie|poker|pohl|pnc|plus|' +
      'plumbing|playstation|play|place|pizza|pioneer|pink|ping|pin|pid|pictures|pictet|pics|piaget|' +
      'physio|photos|photography|photo|phone|philips|phd|pharmacy|pfizer|pet|pccw|pay|passagens|' +
      'party|parts|partners|pars|paris|panerai|panasonic|pamperedchef|page|ovh|ott|otsuka|osaka|' +
      'origins|orientexpress|organic|org|orange|oracle|open|ooo|onyourside|online|onl|ong|one|omega|' +
      'ollo|oldnavy|olayangroup|olayan|okinawa|office|off|observer|obi|nyc|ntt|nrw|nra|nowtv|nowruz|' +
      'now|norton|northwesternmutual|nokia|nissay|nissan|ninja|nikon|nike|nico|nhk|ngo|nfl|nexus|' +
      'nextdirect|next|news|newholland|new|neustar|network|netflix|netbank|net|nec|nba|navy|natura|' +
      'nationwide|name|nagoya|nadex|nab|mutuelle|mutual|museum|mtr|mtpc|mtn|msd|movistar|movie|mov|' +
      'motorcycles|moto|moscow|mortgage|mormon|mopar|montblanc|monster|money|monash|mom|moi|moe|moda|' +
      'mobily|mobile|mobi|mma|mls|mlb|mitsubishi|mit|mint|mini|mil|microsoft|miami|metlife|merckmsd|' +
      'meo|menu|men|memorial|meme|melbourne|meet|media|med|mckinsey|mcdonalds|mcd|mba|mattel|' +
      'maserati|marshalls|marriott|markets|marketing|market|map|mango|management|man|makeup|maison|' +
      'maif|madrid|macys|luxury|luxe|lupin|lundbeck|ltda|ltd|lplfinancial|lpl|love|lotto|lotte|' +
      'london|lol|loft|locus|locker|loans|loan|llc|lixil|living|live|lipsy|link|linde|lincoln|limo|' +
      'limited|lilly|like|lighting|lifestyle|lifeinsurance|life|lidl|liaison|lgbt|lexus|lego|legal|' +
      'lefrak|leclerc|lease|lds|lawyer|law|latrobe|latino|lat|lasalle|lanxess|landrover|land|lancome|' +
      'lancia|lancaster|lamer|lamborghini|ladbrokes|lacaixa|kyoto|kuokgroup|kred|krd|kpn|kpmg|kosher|' +
      'komatsu|koeln|kiwi|kitchen|kindle|kinder|kim|kia|kfh|kerryproperties|kerrylogistics|' +
      'kerryhotels|kddi|kaufen|juniper|juegos|jprs|jpmorgan|joy|jot|joburg|jobs|jnj|jmp|jll|jlc|jio|' +
      'jewelry|jetzt|jeep|jcp|jcb|java|jaguar|iwc|iveco|itv|itau|istanbul|ist|ismaili|iselect|irish|' +
      'ipiranga|investments|intuit|international|intel|int|insure|insurance|institute|ink|ing|info|' +
      'infiniti|industries|inc|immobilien|immo|imdb|imamat|ikano|iinet|ifm|ieee|icu|ice|icbc|ibm|' +
      'hyundai|hyatt|hughes|htc|hsbc|how|house|hotmail|hotels|hoteles|hot|hosting|host|hospital|' +
      'horse|honeywell|honda|homesense|homes|homegoods|homedepot|holiday|holdings|hockey|hkt|hiv|' +
      'hitachi|hisamitsu|hiphop|hgtv|hermes|here|helsinki|help|healthcare|health|hdfcbank|hdfc|hbo|' +
      'haus|hangout|hamburg|hair|guru|guitars|guide|guge|gucci|guardian|group|grocery|gripe|green|' +
      'gratis|graphics|grainger|gov|got|gop|google|goog|goodyear|goodhands|goo|golf|goldpoint|gold|' +
      'godaddy|gmx|gmo|gmbh|gmail|globo|global|gle|glass|glade|giving|gives|gifts|gift|ggee|george|' +
      'genting|gent|gea|gdn|gbiz|garden|gap|games|game|gallup|gallo|gallery|gal|fyi|futbol|furniture|' +
      'fund|fun|fujixerox|fujitsu|ftr|frontier|frontdoor|frogans|frl|fresenius|free|fox|foundation|' +
      'forum|forsale|forex|ford|football|foodnetwork|food|foo|fly|flsmidth|flowers|florist|flir|' +
      'flights|flickr|fitness|fit|fishing|fish|firmdale|firestone|fire|financial|finance|final|film|' +
      'fido|fidelity|fiat|ferrero|ferrari|feedback|fedex|fast|fashion|farmers|farm|fans|fan|family|' +
      'faith|fairwinds|fail|fage|extraspace|express|exposed|expert|exchange|everbank|events|eus|' +
      'eurovision|etisalat|esurance|estate|esq|erni|ericsson|equipment|epson|epost|enterprises|' +
      'engineering|engineer|energy|emerck|email|education|edu|edeka|eco|eat|earth|dvr|dvag|durban|' +
      'dupont|duns|dunlop|duck|dubai|dtv|drive|download|dot|doosan|domains|doha|dog|dodge|doctor|' +
      'docs|dnp|diy|dish|discover|discount|directory|direct|digital|diet|diamonds|dhl|dev|design|' +
      'desi|dentist|dental|democrat|delta|deloitte|dell|delivery|degree|deals|dealer|deal|dds|dclk|' +
      'day|datsun|dating|date|data|dance|dad|dabur|cyou|cymru|cuisinella|csc|cruises|cruise|crs|' +
      'crown|cricket|creditunion|creditcard|credit|courses|coupons|coupon|country|corsica|coop|cool|' +
      'cookingchannel|cooking|contractors|contact|consulting|construction|condos|comsec|computer|' +
      'compare|company|community|commbank|comcast|com|cologne|college|coffee|codes|coach|clubmed|' +
      'club|cloud|clothing|clinique|clinic|click|cleaning|claims|cityeats|city|citic|citi|citadel|' +
      'cisco|circle|cipriani|church|chrysler|chrome|christmas|chloe|chintai|cheap|chat|chase|charity|' +
      'channel|chanel|cfd|cfa|cern|ceo|center|ceb|cbs|cbre|cbn|cba|catholic|catering|cat|casino|cash|' +
      'caseih|case|casa|cartier|cars|careers|career|care|cards|caravan|car|capitalone|capital|' +
      'capetown|canon|cancerresearch|camp|camera|cam|calvinklein|call|cal|cafe|cab|bzh|buzz|buy|' +
      'business|builders|build|bugatti|budapest|brussels|brother|broker|broadway|bridgestone|' +
      'bradesco|box|boutique|bot|boston|bostik|bosch|boots|booking|book|boo|bond|bom|bofa|boehringer|' +
      'boats|bnpparibas|bnl|bmw|bms|blue|bloomberg|blog|blockbuster|blanco|blackfriday|black|biz|bio|' +
      'bingo|bing|bike|bid|bible|bharti|bet|bestbuy|best|berlin|bentley|beer|beauty|beats|bcn|bcg|' +
      'bbva|bbt|bbc|bayern|bauhaus|basketball|baseball|bargains|barefoot|barclays|barclaycard|' +
      'barcelona|bar|bank|band|bananarepublic|banamex|baidu|baby|azure|axa|aws|avianca|autos|auto|' +
      'author|auspost|audio|audible|audi|auction|attorney|athleta|associates|asia|asda|arte|art|arpa|' +
      'army|archi|aramco|arab|aquarelle|apple|app|apartments|aol|anz|anquan|android|analytics|' +
      'amsterdam|amica|amfam|amex|americanfamily|americanexpress|alstom|alsace|ally|allstate|' +
      'allfinanz|alipay|alibaba|alfaromeo|akdn|airtel|airforce|airbus|aigo|aig|agency|agakhan|africa|' +
      'afl|afamilycompany|aetna|aero|aeg|adult|ads|adac|actor|active|aco|accountants|accountant|' +
      'accenture|academy|abudhabi|abogado|able|abc|abbvie|abbott|abb|abarth|aarp|aaa|onion' +
      ')(?=[^0-9a-zA-Z@]|$))'
  )
)

/* harmony default export */ var _validGTLD = (validGTLD);

// CONCATENATED MODULE: ./src/utils/regex/index.js




function _stringSupplant (str, map) {
  return str.replace(/#\{(\w+)\}/g, function (match, name) {
    return map[name] || ''
  })
}

/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */

// Special types
const astralLetterAndMarks = /\ud800[\udc00-\udc0b\udc0d-\udc26\udc28-\udc3a\udc3c\udc3d\udc3f-\udc4d\udc50-\udc5d\udc80-\udcfa\uddfd\ude80-\ude9c\udea0-\uded0\udee0\udf00-\udf1f\udf30-\udf40\udf42-\udf49\udf50-\udf7a\udf80-\udf9d\udfa0-\udfc3\udfc8-\udfcf]|\ud801[\udc00-\udc9d\udd00-\udd27\udd30-\udd63\ude00-\udf36\udf40-\udf55\udf60-\udf67]|\ud802[\udc00-\udc05\udc08\udc0a-\udc35\udc37\udc38\udc3c\udc3f-\udc55\udc60-\udc76\udc80-\udc9e\udd00-\udd15\udd20-\udd39\udd80-\uddb7\uddbe\uddbf\ude00-\ude03\ude05\ude06\ude0c-\ude13\ude15-\ude17\ude19-\ude33\ude38-\ude3a\ude3f\ude60-\ude7c\ude80-\ude9c\udec0-\udec7\udec9-\udee6\udf00-\udf35\udf40-\udf55\udf60-\udf72\udf80-\udf91]|\ud803[\udc00-\udc48]|\ud804[\udc00-\udc46\udc7f-\udcba\udcd0-\udce8\udd00-\udd34\udd50-\udd73\udd76\udd80-\uddc4\uddda\ude00-\ude11\ude13-\ude37\udeb0-\udeea\udf01-\udf03\udf05-\udf0c\udf0f\udf10\udf13-\udf28\udf2a-\udf30\udf32\udf33\udf35-\udf39\udf3c-\udf44\udf47\udf48\udf4b-\udf4d\udf57\udf5d-\udf63\udf66-\udf6c\udf70-\udf74]|\ud805[\udc80-\udcc5\udcc7\udd80-\uddb5\uddb8-\uddc0\ude00-\ude40\ude44\ude80-\udeb7]|\ud806[\udca0-\udcdf\udcff\udec0-\udef8]|\ud808[\udc00-\udf98]|\ud80c[\udc00-\udfff]|\ud80d[\udc00-\udc2e]|\ud81a[\udc00-\ude38\ude40-\ude5e\uded0-\udeed\udef0-\udef4\udf00-\udf36\udf40-\udf43\udf63-\udf77\udf7d-\udf8f]|\ud81b[\udf00-\udf44\udf50-\udf7e\udf8f-\udf9f]|\ud82c[\udc00\udc01]|\ud82f[\udc00-\udc6a\udc70-\udc7c\udc80-\udc88\udc90-\udc99\udc9d\udc9e]|\ud834[\udd65-\udd69\udd6d-\udd72\udd7b-\udd82\udd85-\udd8b\uddaa-\uddad\ude42-\ude44]|\ud835[\udc00-\udc54\udc56-\udc9c\udc9e\udc9f\udca2\udca5\udca6\udca9-\udcac\udcae-\udcb9\udcbb\udcbd-\udcc3\udcc5-\udd05\udd07-\udd0a\udd0d-\udd14\udd16-\udd1c\udd1e-\udd39\udd3b-\udd3e\udd40-\udd44\udd46\udd4a-\udd50\udd52-\udea5\udea8-\udec0\udec2-\udeda\udedc-\udefa\udefc-\udf14\udf16-\udf34\udf36-\udf4e\udf50-\udf6e\udf70-\udf88\udf8a-\udfa8\udfaa-\udfc2\udfc4-\udfcb]|\ud83a[\udc00-\udcc4\udcd0-\udcd6]|\ud83b[\ude00-\ude03\ude05-\ude1f\ude21\ude22\ude24\ude27\ude29-\ude32\ude34-\ude37\ude39\ude3b\ude42\ude47\ude49\ude4b\ude4d-\ude4f\ude51\ude52\ude54\ude57\ude59\ude5b\ude5d\ude5f\ude61\ude62\ude64\ude67-\ude6a\ude6c-\ude72\ude74-\ude77\ude79-\ude7c\ude7e\ude80-\ude89\ude8b-\ude9b\udea1-\udea3\udea5-\udea9\udeab-\udebb]|\ud840[\udc00-\udfff]|\ud841[\udc00-\udfff]|\ud842[\udc00-\udfff]|\ud843[\udc00-\udfff]|\ud844[\udc00-\udfff]|\ud845[\udc00-\udfff]|\ud846[\udc00-\udfff]|\ud847[\udc00-\udfff]|\ud848[\udc00-\udfff]|\ud849[\udc00-\udfff]|\ud84a[\udc00-\udfff]|\ud84b[\udc00-\udfff]|\ud84c[\udc00-\udfff]|\ud84d[\udc00-\udfff]|\ud84e[\udc00-\udfff]|\ud84f[\udc00-\udfff]|\ud850[\udc00-\udfff]|\ud851[\udc00-\udfff]|\ud852[\udc00-\udfff]|\ud853[\udc00-\udfff]|\ud854[\udc00-\udfff]|\ud855[\udc00-\udfff]|\ud856[\udc00-\udfff]|\ud857[\udc00-\udfff]|\ud858[\udc00-\udfff]|\ud859[\udc00-\udfff]|\ud85a[\udc00-\udfff]|\ud85b[\udc00-\udfff]|\ud85c[\udc00-\udfff]|\ud85d[\udc00-\udfff]|\ud85e[\udc00-\udfff]|\ud85f[\udc00-\udfff]|\ud860[\udc00-\udfff]|\ud861[\udc00-\udfff]|\ud862[\udc00-\udfff]|\ud863[\udc00-\udfff]|\ud864[\udc00-\udfff]|\ud865[\udc00-\udfff]|\ud866[\udc00-\udfff]|\ud867[\udc00-\udfff]|\ud868[\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|\ud86a[\udc00-\udfff]|\ud86b[\udc00-\udfff]|\ud86c[\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]|\ud87e[\udc00-\ude1d]|\udb40[\udd00-\uddef]/
const astralNumerals = /\ud801[\udca0-\udca9]|\ud804[\udc66-\udc6f\udcf0-\udcf9\udd36-\udd3f\uddd0-\uddd9\udef0-\udef9]|\ud805[\udcd0-\udcd9\ude50-\ude59\udec0-\udec9]|\ud806[\udce0-\udce9]|\ud81a[\ude60-\ude69\udf50-\udf59]|\ud835[\udfce-\udfff]/
const bmpLetterAndMarks = /A-Za-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u052f\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u065f\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06ef\u06fa-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07ca-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0-\u08b2\u08e4-\u0963\u0971-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09f0\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a70-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0c00-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c81-\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0cf1\u0cf2\u0d01-\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u103f\u1050-\u108f\u109a-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16f1-\u16f8\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u180b-\u180d\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191e\u1920-\u192b\u1930-\u193b\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f\u1aa7\u1ab0-\u1abe\u1b00-\u1b4b\u1b6b-\u1b73\u1b80-\u1baf\u1bba-\u1bf3\u1c00-\u1c37\u1c4d-\u1c4f\u1c5a-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1cf8\u1cf9\u1d00-\u1df5\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u20d0-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2183\u2184\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005\u3006\u302a-\u302f\u3031-\u3035\u303b\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua672\ua674-\ua67d\ua67f-\ua69d\ua69f-\ua6e5\ua6f0\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua7ad\ua7b0\ua7b1\ua7f7-\ua827\ua840-\ua873\ua880-\ua8c4\ua8e0-\ua8f7\ua8fb\ua90a-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf\ua9e0-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa36\uaa40-\uaa4d\uaa60-\uaa76\uaa7a-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab5f\uab64\uab65\uabc0-\uabea\uabec\uabed\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf870-\uf87f\uf882\uf884-\uf89f\uf8b8\uf8c1-\uf8d6\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe2d\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc/
const bmpNumerals = /0-9\u0660-\u0669\u06f0-\u06f9\u07c0-\u07c9\u0966-\u096f\u09e6-\u09ef\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be6-\u0bef\u0c66-\u0c6f\u0ce6-\u0cef\u0d66-\u0d6f\u0de6-\u0def\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29\u1040-\u1049\u1090-\u1099\u17e0-\u17e9\u1810-\u1819\u1946-\u194f\u19d0-\u19d9\u1a80-\u1a89\u1a90-\u1a99\u1b50-\u1b59\u1bb0-\u1bb9\u1c40-\u1c49\u1c50-\u1c59\ua620-\ua629\ua8d0-\ua8d9\ua900-\ua909\ua9d0-\ua9d9\ua9f0-\ua9f9\uaa50-\uaa59\uabf0-\uabf9\uff10-\uff19/
const codePoint = /(?:[^\uD800-\uDFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF])/
const cyrillicLettersAndMarks = /\u0400-\u04FF/
const directionalMarkersGroup = /\u202A-\u202E\u061C\u200E\u200F\u2066\u2067\u2068\u2069/
const hashtagSpecialChars = /_\u200c\u200d\ua67e\u05be\u05f3\u05f4\uff5e\u301c\u309b\u309c\u30a0\u30fb\u3003\u0f0b\u0f0c\xb7/
const invalidCharsGroup = /\uFFFE\uFEFF\uFFFF/
const latinAccentChars = /\xC0-\xD6\xD8-\xF6\xF8-\xFF\u0100-\u024F\u0253\u0254\u0256\u0257\u0259\u025B\u0263\u0268\u026F\u0272\u0289\u028B\u02BB\u0300-\u036F\u1E00-\u1EFF/
const nonBmpCodePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/gm
const punct = /\!'#%&'\(\)*\+,\\\-\.\/:;<=>\?@\[\]\^_{|}~\$/
const spacesGroup = /\x09-\x0D\x20\x85\xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000/
const validPortNumber = /[0-9]+/
const validPunycode = /(?:xn--[\-0-9a-z]+)/
const validUrlQueryChars = /[a-z0-9!?\*'@\(\);:&=\+\$\/%#\[\]\-_\.,~|]/i
const validUrlQueryEndingChars = /[a-z0-9\-_&=#\/]/i

// URLs

const validGeneralUrlPathChars = _regexSupplant(
  /[a-z#{cyrillicLettersAndMarks}0-9!*';:=+,.$/%#[\]\-\u2013_~@|&#{latinAccentChars}]/i,
  { cyrillicLettersAndMarks, latinAccentChars }
)

const validUrlBalancedParens = _regexSupplant(
  '\\(' +
    '(?:' +
    '#{validGeneralUrlPathChars}+' +
    '|' +
    // allow one nested level of balanced parentheses
    '(?:' +
    '#{validGeneralUrlPathChars}*' +
    '\\(' +
    '#{validGeneralUrlPathChars}+' +
    '\\)' +
    '#{validGeneralUrlPathChars}*' +
    ')' +
    ')' +
    '\\)',
  { validGeneralUrlPathChars },
  'i'
)

const validUrlPathEndingChars = _regexSupplant(
  /[+\-a-z#{cyrillicLettersAndMarks}0-9=_#/#{latinAccentChars}]|(?:#{validUrlBalancedParens})/i,
  { cyrillicLettersAndMarks, latinAccentChars, validUrlBalancedParens }
)

const validUrlPrecedingChars = _regexSupplant(
  /(?:[^A-Za-z0-9@＠$#＃#{invalidCharsGroup}]|[#{directionalMarkersGroup}]|^)/,
  { invalidCharsGroup, directionalMarkersGroup }
)

const invalidDomainChars = _stringSupplant(
  '#{punct}#{spacesGroup}#{invalidCharsGroup}#{directionalMarkersGroup}',
  { punct, spacesGroup, invalidCharsGroup, directionalMarkersGroup }
)

const validDomainChars = _regexSupplant(/[^#{invalidDomainChars}]/, {
  invalidDomainChars
})

const validDomainName = _regexSupplant(
  /(?:(?:#{validDomainChars}(?:-|#{validDomainChars})*)?#{validDomainChars}\.)/,
  { validDomainChars }
)

const validSubdomain = _regexSupplant(
  /(?:(?:#{validDomainChars}(?:[_-]|#{validDomainChars})*)?#{validDomainChars}\.)/,
  { validDomainChars }
)

const validDomain = _regexSupplant(
  /(?:#{validSubdomain}*#{validDomainName}(?:#{validGTLD}|#{validCCTLD}|#{validPunycode}))/,
  { validDomainName, validSubdomain, validGTLD: _validGTLD, validCCTLD: _validCCTLD, validPunycode }
)

const validUrlPath = _regexSupplant(
  '(?:' +
    '(?:' +
    '#{validGeneralUrlPathChars}*' +
    '(?:#{validUrlBalancedParens}#{validGeneralUrlPathChars}*)*' +
    '#{validUrlPathEndingChars}' +
    ')|(?:@#{validGeneralUrlPathChars}+/)' +
    ')',
  {
    validGeneralUrlPathChars,
    validUrlBalancedParens,
    validUrlPathEndingChars
  },
  'i'
)

// Hashtags

const hashtagAlpha = _regexSupplant(/(?:[#{bmpLetterAndMarks}]|(?=#{nonBmpCodePairs})(?:#{astralLetterAndMarks}))/, {
  bmpLetterAndMarks,
  nonBmpCodePairs,
  astralLetterAndMarks
})

const hashtagAlphaNumeric = _regexSupplant(
  /(?:[#{bmpLetterAndMarks}#{bmpNumerals}#{hashtagSpecialChars}]|(?=#{nonBmpCodePairs})(?:#{astralLetterAndMarks}|#{astralNumerals}))/,
  {
    bmpLetterAndMarks,
    bmpNumerals,
    hashtagSpecialChars,
    nonBmpCodePairs,
    astralLetterAndMarks,
    astralNumerals
  }
)

const hashtagBoundary = _regexSupplant(/(?:^|\uFE0E|\uFE0F|$|(?!#{hashtagAlphaNumeric}|&)#{codePoint})/, {
  codePoint,
  hashtagAlphaNumeric
})

// Mentions

const validMentionPrecedingChars = /(?:^|[^a-zA-Z0-9_!#$%&*@＠]|(?:^|[^a-zA-Z0-9_+~.-])(?:rt|RT|rT|Rt):?)/

// =======
// Exports
// =======

// URLs
const extractUrl = _regexSupplant(
  '(' + // $1 total match
  '(#{validUrlPrecedingChars})' + // $2 Preceeding chracter
  '(' + // $3 URL
  '(https?:\\/\\/)?' + // $4 Protocol (optional)
  '(#{validDomain})' + // $5 Domain(s)
  '(?::(#{validPortNumber}))?' + // $6 Port number (optional)
  '(\\/#{validUrlPath}*)?' + // $7 URL Path
  '(\\?#{validUrlQueryChars}*#{validUrlQueryEndingChars})?' + // $8 Query String
    ')' +
    ')',
  {
    validUrlPrecedingChars,
    validDomain,
    validPortNumber,
    validUrlPath,
    validUrlQueryChars,
    validUrlQueryEndingChars
  },
  'gi'
)

const validAsciiDomain = _regexSupplant(
  /(?:(?:[-a-z0-9#{latinAccentChars}]+)\.)+(?:#{validGTLD}|#{validCCTLD}|#{validPunycode})/gi,
  { latinAccentChars, validGTLD: _validGTLD, validCCTLD: _validCCTLD, validPunycode }
)

const validTcoUrl = _regexSupplant(
  /^https?:\/\/t\.co\/([a-z0-9]+)(?:\?#{validUrlQueryChars}*#{validUrlQueryEndingChars})?/,
  { validUrlQueryChars, validUrlQueryEndingChars },
  'i'
)

// Hashtags

const hashSigns = /[#＃]/
const endHashtagMatch = _regexSupplant(/^(?:#{hashSigns}|:\/\/)/, { hashSigns })
const validHashtag = _regexSupplant(
  /(#{hashtagBoundary})(#{hashSigns})(?!\uFE0F|\u20E3)(#{hashtagAlphaNumeric}*#{hashtagAlpha}#{hashtagAlphaNumeric}*)/gi,
  { hashtagBoundary, hashSigns, hashtagAlphaNumeric, hashtagAlpha }
)

// Mentions

const atSigns = /[@＠]/
const endMentionMatch = _regexSupplant(/^(?:#{atSigns}|[#{latinAccentChars}]|:\/\/)/, { atSigns, latinAccentChars })
const validMention = _regexSupplant(
  '(#{validMentionPrecedingChars})' + // $1: Preceding character
  '(#{atSigns})' + // $2: At mark
  '([a-zA-Z0-9_]{1,20})', // $3: Screen name
  // '(/[a-zA-Z][a-zA-Z0-9_-]{0,24})?', // $4: List (optional)
  { validMentionPrecedingChars, atSigns },
  'g'
)

// CONCATENATED MODULE: ./src/utils/extractMentions.js
// Extracts mentions from text.



/* harmony default export */ var extractMentions = (function (text) {
  if (!text || !text.match(atSigns)) {
    return []
  }

  const mentions = []

  text.replace(validMention, function (match, before, atSign, mentionText, offset, chunk) {
    const after = chunk.slice(offset + match.length)
    if (!after.match(endMentionMatch)) {
      const startPosition = offset + before.length
      const endPosition = startPosition + mentionText.length + 1
      mentions.push({
        username: mentionText,
        indices: [startPosition, endPosition]
      })
    }
  })

  return mentions
});

// CONCATENATED MODULE: ./src/utils/extractHashtags.js
// Extracts Hashtags from text.



/* harmony default export */ var extractHashtags = (function (text) {
  if (!text || !text.match(hashSigns)) {
    return []
  }

  let tags = []

  text.replace(validHashtag, function (match, before, hash, hashText, offset, chunk) {
    const after = chunk.slice(offset + match.length)
    if (after.match(endHashtagMatch)) {
      return
    }
    const startPosition = offset + before.length
    const endPosition = startPosition + hashText.length + 1
    tags.push({
      hashtag: hashText,
      indices: [startPosition, endPosition]
    })
  })

  return tags
});

// EXTERNAL MODULE: ./node_modules/node-libs-browser/node_modules/punycode/punycode.js
var punycode = __webpack_require__("1985");
var punycode_default = /*#__PURE__*/__webpack_require__.n(punycode);

// CONCATENATED MODULE: ./src/utils/idna.js




const MAX_DOMAIN_LABEL_LENGTH = 63
const PUNYCODE_ENCODED_DOMAIN_PREFIX = 'xn--'
// This is an extremely lightweight implementation of domain name validation according to RFC 3490
// Our regexes handle most of the cases well enough
// See https://tools.ietf.org/html/rfc3490#section-4.1 for details
const idna = {
  toAscii: function (domain) {
    if (domain.substring(0, 4) === PUNYCODE_ENCODED_DOMAIN_PREFIX && !domain.match(validAsciiDomain)) {
      // Punycode encoded url cannot contain non ASCII characters
      return
    }

    const labels = domain.split('.')
    for (let i = 0; i < labels.length; i++) {
      const label = labels[i]
      const punycodeEncodedLabel = punycode_default.a.toASCII(label)
      if (punycodeEncodedLabel.length < 1 || punycodeEncodedLabel.length > MAX_DOMAIN_LABEL_LENGTH) {
        // DNS label has invalid length
        return
      }
    }
    return labels.join('.')
  }
}

/* harmony default export */ var utils_idna = (idna);

// CONCATENATED MODULE: ./src/utils/extractUrls.js
// Extracts URLs from text




const DEFAULT_PROTOCOL = 'https://'
const DEFAULT_PROTOCOL_OPTIONS = { extractUrlsWithoutProtocol: true }
const MAX_URL_LENGTH = 4096

const invalidUrlWithoutProtocolPrecedingChars = /[-_./]$/

function isValidUrl (url, protocol, domain) {
  let urlLength = url.length
  const punycodeEncodedDomain = utils_idna.toAscii(domain)
  if (!punycodeEncodedDomain || !punycodeEncodedDomain.length) {
    return false
  }

  urlLength = urlLength + punycodeEncodedDomain.length - domain.length
  return protocol.length + urlLength <= MAX_URL_LENGTH
}

const extractUrlsWithIndices = function (text, options = DEFAULT_PROTOCOL_OPTIONS) {
  if (!text || (options.extractUrlsWithoutProtocol ? !text.match(/\./) : !text.match(/:/))) {
    return []
  }

  const urls = []

  while (extractUrl.exec(text)) {
    const before = RegExp.$2
    let url = RegExp.$3
    const protocol = RegExp.$4
    const domain = RegExp.$5
    const path = RegExp.$7
    let endPosition = extractUrl.lastIndex
    const startPosition = endPosition - url.length

    if (!isValidUrl(url, protocol || DEFAULT_PROTOCOL, domain)) {
      continue
    }
    // extract ASCII-only domains.
    if (!protocol) {
      if (!options.extractUrlsWithoutProtocol || before.match(invalidUrlWithoutProtocolPrecedingChars)) {
        continue
      }

      let lastUrl = null
      let asciiEndPosition = 0
      domain.replace(validAsciiDomain, function (asciiDomain) {
        const asciiStartPosition = domain.indexOf(asciiDomain, asciiEndPosition)
        asciiEndPosition = asciiStartPosition + asciiDomain.length
        lastUrl = {
          url: asciiDomain,
          indices: [startPosition + asciiStartPosition, startPosition + asciiEndPosition]
        }
        urls.push(lastUrl)
      })

      // no ASCII-only domain found. Skip the entire URL.
      if (lastUrl == null) {
        continue
      }

      // lastUrl only contains domain. Need to add path and query if they exist.
      if (path) {
        lastUrl.url = url.replace(domain, lastUrl.url)
        lastUrl.indices[1] = endPosition
      }
    } else {
      urls.push({
        url: url,
        indices: [startPosition, endPosition]
      })
    }
  }

  return urls
}

/* harmony default export */ var extractUrls = (extractUrlsWithIndices);

// CONCATENATED MODULE: ./src/utils/removeOverlappingEntities.js
/* harmony default export */ var removeOverlappingEntities = (function (entities) {
  entities.sort(function (a, b) {
    return a.indices[0] - b.indices[0]
  })

  let prev = entities[0]
  for (let i = 1; i < entities.length; i++) {
    if (prev.indices[1] > entities[i].indices[0]) {
      entities.splice(i, 1)
      i--
    } else {
      prev = entities[i]
    }
  }
});

// CONCATENATED MODULE: ./src/utils/extract.js
// Returns an Indexed Array with URL, mention and hashtag
// entities found in text.






/* harmony default export */ var extract = (function (text, options) {
  const entities = extractUrls(text, options)
    .concat(extractMentions(text))
    .concat(extractHashtags(text))

  if (entities.length === 0) {
    return []
  }

  removeOverlappingEntities(entities)
  return entities
});

// CONCATENATED MODULE: ./src/utils/helpers.js
const HTML_ENTITIES = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  "'": '&#39;'
}

function htmlEscape (text) {
  return (
    text &&
    text.replace(/[&"'><]/g, function (character) {
      return HTML_ENTITIES[character]
    })
  )
}

function clone (o) {
  const r = {}
  for (const k in o) {
    if (o.hasOwnProperty(k)) {
      r[k] = o[k]
    }
  }
  return r
}

function stringSupplant (str, map) {
  return str.replace(/#\{(\w+)\}/g, function (match, name) {
    return map[name] || ''
  })
}

// CONCATENATED MODULE: ./src/utils/extractHtmlAttrs.js
const BOOLEAN_ATTRIBUTES = {
  disabled: true,
  readonly: true,
  multiple: true,
  checked: true
}

// Options which should not be passed as HTML attributes
const OPTIONS_NOT_ATTRIBUTES = {
  urlClass: true,
  usernameClass: true,
  hashtagClass: true,
  usernameUrlBase: true,
  hashtagUrlBase: true,
  targetBlank: true,
  urlTarget: true,
  invisibleTagAttrs: true,
  linkAttributeBlock: true,
  htmlEscapeNonEntities: true,
  extractUrlsWithoutProtocol: true
}

/* harmony default export */ var extractHtmlAttrs = (function (options) {
  const htmlAttrs = {}
  for (const k in options) {
    let v = options[k]
    if (OPTIONS_NOT_ATTRIBUTES[k]) {
      continue
    }
    if (BOOLEAN_ATTRIBUTES[k]) {
      v = v ? k : null
    }
    if (v == null) {
      continue
    }
    htmlAttrs[k] = v
  }
  return htmlAttrs
});

// CONCATENATED MODULE: ./src/utils/linkToText.js
// Returns html as text with given



const linkToText_BOOLEAN_ATTRIBUTES = {
  disabled: true,
  readonly: true,
  multiple: true,
  checked: true
}

function _tagAttrs (attributes) {
  let htmlAttrs = ''
  for (const k in attributes) {
    let v = attributes[k]
    if (linkToText_BOOLEAN_ATTRIBUTES[k]) {
      v = v ? k : null
    }
    if (v == null) {
      continue
    }
    htmlAttrs += ` ${htmlEscape(k)}="${htmlEscape(v.toString())}"`
  }
  return htmlAttrs
}

/* eslint-disable-next-line no-unused-vars */
/* harmony default export */ var linkToText = (function (entity, text, attributes, options) {
  const opts = {
    text: text,
    attr: _tagAttrs(attributes)
  }
  return stringSupplant('<a #{attr}>#{text}</a>', opts)
});

// CONCATENATED MODULE: ./src/utils/linkToUrl.js
// Converts URL entity to an html anchor tag.




const urlHasProtocol = /^https?:\/\//i

/* harmony default export */ var linkToUrl = (function (entity, text, options) {
  let url = entity.url
  const displayUrl = url
  let linkText = htmlEscape(displayUrl)

  const attrs = clone(options.htmlAttrs || {})

  if (!url.match(urlHasProtocol)) {
    url = `http://${url}`
  }
  attrs.href = url

  if (options.targetBlank) {
    attrs.target = '_blank'
  }

  // set class only if urlClass is specified.
  if (options.urlClass) {
    attrs['class'] = options.urlClass
  }

  // set target only if urlTarget is specified.
  if (options.urlTarget) {
    attrs.target = options.urlTarget
  }

  return linkToText(entity, linkText, attrs, options)
});

// CONCATENATED MODULE: ./src/utils/linkToMention.js
// Converts mention entity to an html anchor tag.




/* harmony default export */ var linkToMention = (function (entity, text, options) {
  const at = text.substring(entity.indices[0], entity.indices[0] + 1)
  const user = htmlEscape(entity.username)
  const attrs = clone(options.htmlAttrs || {})

  attrs.href = options.usernameUrlBase + user
  attrs.title = `@${user}`
  attrs['class'] = options.usernameClass
  attrs['data-username'] = user

  return linkToText(entity, `${at}${user}`, attrs, options)
});

// CONCATENATED MODULE: ./src/utils/linkToHashtag.js
// Converts hashtag entity to an html anchor tag.




const rtlChars = /[\u0600-\u06FF]|[\u0750-\u077F]|[\u0590-\u05FF]|[\uFE70-\uFEFF]/gm

/* harmony default export */ var linkToHashtag = (function (entity, text, options) {
  const hash = text.substring(entity.indices[0], entity.indices[0] + 1)
  const hashtag = htmlEscape(entity.hashtag)
  const attrs = clone(options.htmlAttrs || {})

  attrs.href = options.hashtagUrlBase + hashtag
  attrs.title = `#${hashtag}`
  attrs['class'] = options.hashtagClass
  attrs['data-hashtag'] = hashtag
  if (hashtag.charAt(0).match(rtlChars)) {
    attrs['class'] += ' rtl'
  }

  return linkToText(entity, `${hash}${hashtag}`, attrs, options)
});

// CONCATENATED MODULE: ./src/utils/autoLink.js
// Inserts an <a> or <router-link> tag with given css classes around
// matched url, mentions or hashtags in text.







const DEFAULT_USERNAME_CLASS = 'highlights username'
const DEFAULT_HASHTAG_CLASS = 'highlights hashtag'
const DEFAULT_URL_CLASS = 'highlights url'

/* harmony default export */ var autoLink = (function (text, entities, opts) {
  let options = clone(opts || {})
  options.usernameClass = options.usernameClass || DEFAULT_USERNAME_CLASS
  options.usernameUrlBase = options.usernameUrlBase || '/'
  options.hashtagClass = options.hashtagClass || DEFAULT_HASHTAG_CLASS
  options.hashtagUrlBase = options.hashtagUrlBase || '/hashtag/'
  options.urlClass = options.urlClass || DEFAULT_URL_CLASS
  options.htmlAttrs = extractHtmlAttrs(options)
  options.invisibleTagAttrs = options.invisibleTagAttrs || "style='position:absolute;left:-9999px;'"

  let result = ''
  let beginIndex = 0

  // sort entities by start index
  entities.sort(function (a, b) {
    return a.indices[0] - b.indices[0]
  })

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i]
    result += htmlEscape(text.substring(beginIndex, entity.indices[0]))

    if (entity.url) {
      result += linkToUrl(entity, text, options)
    } else if (entity.username) {
      result += linkToMention(entity, text, options)
    } else if (entity.hashtag) {
      result += linkToHashtag(entity, text, options)
    }
    beginIndex = entity.indices[1]
  }
  result += htmlEscape(text.substring(beginIndex, text.length))
  return result
});

// CONCATENATED MODULE: ./src/utils/autoHighlight.js
// Inserts a <span> tag with given css classes around matched url,
// mentions or hashtags in text.



const autoHighlight_DEFAULT_USERNAME_CLASS = 'highlights username'
const autoHighlight_DEFAULT_HASHTAG_CLASS = 'highlights hashtag'
const autoHighlight_DEFAULT_URL_CLASS = 'highlights url'

/* harmony default export */ var autoHighlight = (function (text, entities, opts) {
  let result = ''
  let beginIndex = 0
  const options = clone(opts || {})
  const usernameClass = options.usernameClass || autoHighlight_DEFAULT_USERNAME_CLASS
  const hashtagClass = options.hashtagClass || autoHighlight_DEFAULT_HASHTAG_CLASS
  const urlClass = options.urlClass || autoHighlight_DEFAULT_URL_CLASS

  // sort entities by start index
  entities.sort(function (a, b) {
    return a.indices[0] - b.indices[0]
  })

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i]
    result += htmlEscape(text.substring(beginIndex, entity.indices[0]))

    if (entity.url) {
      let url = htmlEscape(entity.url)
      result += _insertTag(url, urlClass)
    } else if (entity.username) {
      const at = text.substring(entity.indices[0], entity.indices[0] + 1)
      const user = htmlEscape(entity.username)
      result += _insertTag(`${at}${user}`, usernameClass)
    } else if (entity.hashtag) {
      const hash = text.substring(entity.indices[0], entity.indices[0] + 1)
      const tag = htmlEscape(entity.hashtag)
      result += _insertTag(`${hash}${tag}`, hashtagClass)
    }
    beginIndex = entity.indices[1]
  }
  result += htmlEscape(text.substring(beginIndex, text.length))
  return result
});

// =================
// Private Functions
// =================

function _insertTag (text, classes = '') {
  const opts = {
    text: text,
    attr: `class="${classes}"`
  }
  return stringSupplant('<span #{attr}>#{text}</span>', opts)
}

// CONCATENATED MODULE: ./src/utils/index.js




const defaultOptions = {
  targetBlank: true,
  extractUrlsWithoutProtocol: true
}

function utils_link (text, options = defaultOptions) {
  const entities = extract(text, options)
  return autoLink(text, entities, options)
}

function highlight (text, options = defaultOptions) {
  const entities = extract(text, options)
  return autoHighlight(text, entities, options)
}

function createRange (node, chars, range) {
  if (!range) {
    range = document.createRange()
    range.selectNode(node)
    range.setStart(node, 0)
  }
  if (chars.count === 0) {
    range.setEnd(node, chars.count)
  } else if (node && chars.count > 0) {
    if (node.nodeType === 3) {
      if (node.textContent.length < chars.count) {
        chars.count -= node.textContent.length
      } else {
        range.setEnd(node, chars.count)
        chars.count = 0
      }
    } else {
      for (let i = 0; i < node.childNodes.length; i++) {
        range = createRange(node.childNodes[i], chars, range)
        if (chars.count === 0) break
      }
    }
  }
  return range
}

function setCaretPosition (node, caretPosition) {
  if (caretPosition >= 0) {
    const range = createRange(node, { count: caretPosition })
    const selection = window.getSelection()
    if (range) {
      range.collapse(false)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }
}

// CONCATENATED MODULE: ./src/index.js


function src_autoHighlight (text, options) {
  return highlight(text, options)
}

function src_autoLink (text, options) {
  return utils_link(text, options)
}

/* harmony default export */ var src = ({
  name: 'VueHighlights',
  props: {
    extractUrlsWithoutProtocol: {
      type: Boolean,
      default: true
    },
    caretColor: {
      type: String,
      default: '#ccc'
    },
    placeholder: {
      type: String,
      default: `What's Happening?`
    },
    value: String
  },
  data () {
    return {
      focused: false,
      body: ''
    }
  },
  computed: {
    showPlaceholder () {
      return !this.body.replace(/^\s*\n/gm, '').length
    },
    computedBody () {
      return highlight(this.body, {
        extractUrlsWithoutProtocol: this.extractUrlsWithoutProtocol
      })
    }
  },
  methods: {
    getCaretPos () {
      const parent = this.$refs.mbody
      const selection = window.getSelection()
      let node = selection.focusNode
      let charCount = selection.focusOffset
      while (node) {
        if (node === parent) break
        if (node.previousSibling) {
          node = node.previousSibling
          charCount += node.textContent.length
        } else {
          node = node.parentNode
          if (node === null) break
        }
      }
      return charCount
    },
    setCaretPos (caretPosition) {
      setCaretPosition(this.$refs.mbody, caretPosition)
    },
    clear () {
      this.$refs.mbody.innerText = ''
      this.body = ''
    },
    onKeyUp (e) {
      let caretPosition = this.getCaretPos()
      if (e.keyCode === 13) { // Enter key
        caretPosition++
      }
      this.body = e.target.innerText
      this.$emit('input', this.body)
      this.$nextTick(() => {
        this.setCaretPos(caretPosition)
      })
    },
    onFocus (e) {
      this.focused = true
      this.$emit('focus', e)
    },
    onBlur (e) {
      this.focused = false
      this.$emit('blur', e)
    }
  },
  render (h) {
    const placeHolder = this.showPlaceholder ? h('div', {
      attrs: {
        id: 'mplaceholder'
      },
      staticClass: 'highlights__placeholder'
    }, this.placeholder) : null

    const input = {
      ref: 'mbody',
      staticClass: 'highlights__body',
      style: {
        'text-align': 'initial',
        outline: 'currentcolor none medium',
        'user-select': 'text',
        'white-space': 'pre-wrap',
        'overflow-wrap': 'break-word',
        'caret-color': `${this.caretColor}`
      },
      attrs: {
        'aria-label': this.placeHolder,
        'aria-autocomplete': 'list',
        'aria-describedby': 'mplaceholder',
        'aria-multiline': 'true',
        contenteditable: true,
        role: 'textbox',
        spellCheck: true,
        tabindex: 0
      },
      domProps: {
        innerHTML: this.computedBody
      },
      on: {
        focus: this.onFocus,
        blur: this.onBlur,
        keyup: this.onKeyUp
      }
    }

    return h('div', {
      staticClass: 'highlights__container',
      style: {
        position: 'relative'
      }
    }, [
      h('div', {
        staticClass: 'highlights__content'
      }, [
        placeHolder,
        h('div', {
          staticClass: 'highlights__body-container'
        }, [
          h('div', input)
        ])
      ])
    ])
  }
});

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport autoHighlight */__webpack_require__.d(__webpack_exports__, "autoHighlight", function() { return src_autoHighlight; });
/* concated harmony reexport autoLink */__webpack_require__.d(__webpack_exports__, "autoLink", function() { return src_autoLink; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ })

/******/ });
});
//# sourceMappingURL=vue-highlights.umd.js.map