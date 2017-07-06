/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * author: akunzeng
 * 20170705
 *
 * notice!!!: JsonPathPick's prop - json, shouldn't have any key named "." or "[" or "]", otherwise the getTargetByJsonPath function (or other function you defined) will not work properlly.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var styles = __webpack_require__(2);
var JsonPathPicker = (function (_super) {
    __extends(JsonPathPicker, _super);
    function JsonPathPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.choose = function (e) {
            var target = e.target;
            if (target.hasAttribute('data-pathKey')) {
                var pathKey = target.getAttribute('data-pathKey');
                var choosenPath = void 0;
                if (target.hasAttribute('data-chooseArr')) {
                    choosenPath = _this.state.choosen;
                    var tmp = choosenPath.split(' ');
                    var idx = pathKey.split(' ').length;
                    tmp[idx] = '[*]';
                    choosenPath = tmp.join(' ');
                }
                else {
                    choosenPath = pathKey;
                }
                _this.setState({
                    choosen: choosenPath
                }, function () {
                    _this.props.onChoose && _this.props.onChoose(_this.state.choosen);
                });
            }
        };
        _this.state = {
            choosen: null
        };
        return _this;
    }
    JsonPathPicker.prototype.componentWillReceiveProps = function (nextp) {
        if (nextp.json !== this.props.json) {
            this.setState({
                choosen: null // reset choosen
            });
        }
    };
    JsonPathPicker.prototype.shouldComponentUpdate = function (nextp, nexts) {
        if (nextp.json !== this.props.json) {
            return true;
        }
        else if (nexts.choosen !== this.state.choosen) {
            return true;
        }
        else {
            return false;
        }
    };
    JsonPathPicker.prototype.render = function () {
        console.log('!!!!');
        var jsonObj;
        try {
            jsonObj = JSON.parse(this.props.json);
        }
        catch (error) {
            console.log(error);
            return React.createElement("div", null, "Wrong json string input");
        }
        // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        return (React.createElement("div", { onClick: this.choose }, json2Jsx(this.state.choosen, jsonObj)));
    };
    return JsonPathPicker;
}(React.Component));
exports.JsonPathPicker = JsonPathPicker;
/**
 * get the target object of a json by path
 */
// export function getTargetByJsonPath(json: string, path: string) :any {
//     let obj = JSON.parse(json)
//     if (path == '') {
//         return obj
//     } else {
//         let attrs = path.split(' ')
//         attrs.shift() // shift the first "" in attrs
//         let target = obj
//         for (let attr of attrs) {
//             if (attr[0] === '.') {
//                 target = target[attr.slice(1)]
//             } else if (attr === '[*]') {
//                 //td
//             } else { // [x]
//                 attr = attr.slice(1)
//                 attr = attr.slice(0, attr.length-1)
//                 target = target[parseInt(attr)]
//             }
//         }
//         return target
//     }
// }
/**
 * Check if a string represents a valid url
 * @return boolean
 */
function isUrl(str) {
    var regexp = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(str);
}
function escape(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
/**
 * recursively generate jsxs by json data
 * @param choosenPath
 * @param jsonObj
 * @param isLast :is the last child or not
 * @param pathKey :now json path from root
 * @return reactElements
 */
function json2Jsx(choosenPath, jsonObj, isLast, pathKey) {
    if (isLast === void 0) { isLast = true; }
    if (pathKey === void 0) { pathKey = ''; }
    if (jsonObj === null) {
        return renderNull(choosenPath, isLast, pathKey);
    }
    else if (jsonObj === undefined) {
        return renderUndefined(choosenPath, isLast, pathKey);
    }
    else if (Array.isArray(jsonObj)) {
        return renderArray(choosenPath, isLast, pathKey, jsonObj);
    }
    else if (typeof jsonObj == 'string') {
        return renderString(choosenPath, isLast, pathKey, jsonObj);
    }
    else if (typeof jsonObj == 'number') {
        return renderNumber(choosenPath, isLast, pathKey, jsonObj);
    }
    else if (typeof jsonObj == 'boolean') {
        return renderBoolean(choosenPath, isLast, pathKey, jsonObj);
    }
    else if (typeof jsonObj == 'object') {
        return renderObject(choosenPath, isLast, pathKey, jsonObj);
    }
    else {
        return null;
    }
}
// various types' render
function renderNull(choosenPath, isLast, pathKey) {
    return (React.createElement("span", { className: styles.json_literal },
        React.createElement("i", { "data-pathKey": pathKey, className: getPickerStyle(getRelationship(choosenPath, pathKey)) }, "\uD83D\uDCCB"),
        React.createElement("span", null,
            'null',
            " ",
            isLast ? '' : ',')));
}
function renderUndefined(choosenPath, isLast, pathKey) {
    return (React.createElement("span", { className: styles.json_literal },
        React.createElement("i", { "data-pathKey": pathKey, className: getPickerStyle(getRelationship(choosenPath, pathKey)) }, "\uD83D\uDCCB"),
        React.createElement("span", null,
            'undefined',
            " ",
            isLast ? '' : ',')));
}
function renderString(choosenPath, isLast, pathKey, str) {
    str = escape(str);
    if (isUrl(str)) {
        return (React.createElement("span", null,
            React.createElement("i", { "data-pathKey": pathKey, className: getPickerStyle(getRelationship(choosenPath, pathKey)) }, "\uD83D\uDCCB"),
            React.createElement("a", { target: "_blank", href: str, className: styles.json_string },
                React.createElement("span", null,
                    "\"",
                    str,
                    "\" ",
                    isLast ? '' : ','))));
    }
    else {
        return (React.createElement("span", { className: styles.json_string },
            React.createElement("i", { "data-pathKey": pathKey, className: getPickerStyle(getRelationship(choosenPath, pathKey)) }, "\uD83D\uDCCB"),
            React.createElement("span", null,
                "\"",
                str,
                "\" ",
                isLast ? '' : ',')));
    }
}
function renderNumber(choosenPath, isLast, pathKey, num) {
    return (React.createElement("span", { className: styles.json_literal },
        React.createElement("i", { "data-pathKey": pathKey, className: getPickerStyle(getRelationship(choosenPath, pathKey)) }, "\uD83D\uDCCB"),
        React.createElement("span", null,
            num,
            " ",
            isLast ? '' : ',')));
}
function renderBoolean(choosenPath, isLast, pathKey, bool) {
    return (React.createElement("span", { className: styles.json_literal },
        React.createElement("i", { "data-pathKey": pathKey, className: getPickerStyle(getRelationship(choosenPath, pathKey)) }, "\uD83D\uDCCB"),
        React.createElement("span", null,
            bool,
            " ",
            isLast ? '' : ',')));
}
function renderObject(choosenPath, isLast, pathKey, obj) {
    var relation = getRelationship(choosenPath, pathKey);
    var keys = Object.keys(obj);
    var length = keys.length;
    if (length > 0) {
        return (React.createElement("div", { className: relation == 1 ? styles.picked_tree : '' },
            React.createElement("div", null,
                React.createElement("span", null, '{'),
                React.createElement("i", { "data-pathKey": pathKey, className: getPickerStyle(relation) }, "\uD83D\uDCCB")),
            React.createElement("ul", { className: styles.json_dict }, keys.map(function (key, idx) {
                var nextPathKey = pathKey + " ." + key;
                return (React.createElement("li", { key: nextPathKey },
                    React.createElement("span", { className: styles.json_string + " " + styles.json_key }, key),
                    React.createElement("span", null, " : "),
                    json2Jsx(choosenPath, obj[key], idx == length - 1 ? true : false, nextPathKey)));
            })),
            React.createElement("div", null,
                '}',
                " ",
                isLast ? '' : ',')));
    }
    else {
        return (React.createElement("span", null,
            React.createElement("i", { "data-pathKey": pathKey, className: getPickerStyle(relation) }, "\uD83D\uDCCB"),
            React.createElement("span", null,
                "{ }",
                " ",
                isLast ? '' : ',')));
    }
}
function renderArray(choosenPath, isLast, pathKey, arr) {
    var relation = getRelationship(choosenPath, pathKey);
    var length = arr.length;
    if (length > 0) {
        return (React.createElement("div", { className: relation == 1 ? styles.picked_tree : '' },
            React.createElement("div", null,
                relation == 2 ? React.createElement("i", { "data-pathKey": pathKey, "data-chooseArr": "1", className: getPickArrStyle(choosenPath, pathKey) }, "[\u271A]") : null,
                React.createElement("span", null, '['),
                React.createElement("i", { "data-pathKey": pathKey, className: getPickerStyle(relation) }, "\uD83D\uDCCB")),
            React.createElement("ol", { className: styles.json_array }, arr.map(function (value, idx) {
                var nextPathKey = pathKey + " [" + idx + "]";
                return (React.createElement("li", { key: nextPathKey }, json2Jsx(choosenPath, value, idx == length - 1 ? true : false, nextPathKey)));
            })),
            React.createElement("div", null,
                ']',
                " ",
                isLast ? '' : ',')));
    }
    else {
        return (React.createElement("span", null,
            React.createElement("i", { "data-pathKey": pathKey, className: getPickerStyle(relation) }, "\uD83D\uDCCB"),
            React.createElement("span", null,
                "[ ]",
                " ",
                isLast ? '' : ',')));
    }
}
/**
 * get the relationship between now path and the choosenPath
 * 0 other
 * 1 self
 * 2 ancestor
 */
function getRelationship(choosenPath, path) {
    if (choosenPath === null)
        return 0;
    var choosenAttrs = choosenPath.split(' ');
    choosenAttrs.shift();
    var choosenLen = choosenAttrs.length;
    var nowAttrs = path.split(' ');
    nowAttrs.shift();
    var nowLen = nowAttrs.length;
    if (nowLen > choosenLen)
        return 0;
    for (var i = 0; i < nowLen; i++) {
        var ok = void 0;
        if (nowAttrs[i] === choosenAttrs[i]) {
            ok = true;
        }
        else if (nowAttrs[i][0] === '[' && choosenAttrs[i][0] === '[' && choosenAttrs[i][1] === '*') {
            ok = true;
        }
        else {
            ok = false;
        }
        if (!ok)
            return 0;
    }
    return nowLen == choosenLen ? 1 : 2;
}
/**
 * get picker's className, for ditinguishing picked or not or ancestor of picked entity
 */
function getPickerStyle(relation) {
    if (relation == 0) {
        return styles.pick_path;
    }
    else if (relation == 1) {
        return styles.pick_path + ' ' + styles.picked;
    }
    else {
        return styles.pick_path + ' ' + styles.pick_path_ancestor;
    }
}
function getPickArrStyle(choosenPath, nowPath) {
    var csp = choosenPath.split(' ');
    var np = nowPath.split(' ');
    if (csp[np.length] == '[*]') {
        return styles.pick_arr + ' ' + styles.picked_arr;
    }
    else {
        return styles.pick_arr;
    }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]-[hash:base64:5]!./style.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]-[hash:base64:5]!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "/* Syntax highlighting for JSON objects */\r\nul.style_json_dict-1c95z, ol.style_json_array-1uuRZ {\r\n  list-style-type: none;\r\n  margin: 0 0 0 1px;\r\n  border-left: 1px dotted #ccc;\r\n  padding-left: 2em;\r\n}\r\n.style_json_string-1ILqc, .style_json_literal-2AZpV {\r\n  color: #777;\r\n}\r\n.style_json_key-3lIfy {\r\n  font-weight: bold;\r\n  color: #108ee9;\r\n}\r\n\r\n/* Copy path icon */\r\n.style_pick_path-1SHFp {\r\n  color: #ccc;\r\n  cursor: pointer;\r\n  margin-right: 12px;\r\n  margin-left: 5px;\r\n  font-style: normal;\r\n}\r\n\r\n.style_pick_path_ancestor-tbVVV {\r\n  color: #7f3dc5;\r\n}\r\n\r\n.style_pick_path-1SHFp:hover, .style_picked-z7n_M {\r\n  color: #f04134;\r\n}\r\n\r\n.style_picked_tree-1nO5w {\r\n  background: #eee;\r\n}\r\n\r\n.style_pick_arr-NkdHU {\r\n  position: relative;\r\n  right: 2px;\r\n  color: #ccc;\r\n  cursor: pointer;\r\n  font-style: normal;\r\n  font-weight: bold;\r\n  margin-left: -20px;\r\n}\r\n\r\n.style_pick_arr-NkdHU:hover, .style_picked_arr-x3Rq1 {\r\n  color: #f04134;\r\n}", ""]);

// exports
exports.locals = {
	"json_dict": "style_json_dict-1c95z",
	"json_array": "style_json_array-1uuRZ",
	"json_string": "style_json_string-1ILqc",
	"json_literal": "style_json_literal-2AZpV",
	"json_key": "style_json_key-3lIfy",
	"pick_path": "style_pick_path-1SHFp",
	"pick_path_ancestor": "style_pick_path_ancestor-tbVVV",
	"picked": "style_picked-z7n_M",
	"picked_tree": "style_picked_tree-1nO5w",
	"pick_arr": "style_pick_arr-NkdHU",
	"picked_arr": "style_picked_arr-x3Rq1"
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
//# sourceMappingURL=react-json-path-picker.js.map