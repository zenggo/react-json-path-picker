"use strict";
/**
 * author: akunzeng
 * 20170705
 *
 * notice!!!: JsonPathPick's prop - json, shouldn't have any key name including " ", otherwise the getTargetByJsonPath function (or other function you defined) will not work properlly.
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
var React = require("react");
require("./style.css");
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
                    var pathText = _this.state.choosen;
                    pathText = pathText.replace(/ /g, '');
                    _this.props.onChoose && _this.props.onChoose(pathText);
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
        if (nextp.path !== undefined) {
            var nextPath = void 0;
            if (!nextp.path) {
                nextPath = nextp.path;
            }
            else {
                nextPath = nextp.path.replace(/\./g, ' .');
                nextPath = nextPath.replace(/\[/g, ' [');
            }
            this.setState({
                choosen: nextPath
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
        var jsonObj;
        try {
            jsonObj = JSON.parse(this.props.json);
        }
        catch (error) {
            console.log(error);
            return React.createElement("div", null, "Wrong json string input");
        }
        return (React.createElement("div", { onClick: this.props.showOnly ? null : this.choose }, this.props.showOnly
            ? json2Jsx_onlyForShow(jsonObj)
            : json2Jsx(this.state.choosen, jsonObj)));
    };
    return JsonPathPicker;
}(React.Component));
exports.JsonPathPicker = JsonPathPicker;
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
    return (React.createElement("span", { className: "json-literal" },
        React.createElement("i", { "data-pathKey": pathKey, className: getPickerStyle(getRelationship(choosenPath, pathKey)) }, "\uD83D\uDCCB"),
        React.createElement("span", null,
            'null',
            " ",
            isLast ? '' : ',')));
}
function renderUndefined(choosenPath, isLast, pathKey) {
    return (React.createElement("span", { className: "json-literal" },
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
            React.createElement("a", { target: "_blank", href: str, className: "json-literal" },
                React.createElement("span", null,
                    "\"",
                    str,
                    "\" ",
                    isLast ? '' : ','))));
    }
    else {
        return (React.createElement("span", { className: "json-literal" },
            React.createElement("i", { "data-pathKey": pathKey, className: getPickerStyle(getRelationship(choosenPath, pathKey)) }, "\uD83D\uDCCB"),
            React.createElement("span", null,
                "\"",
                str,
                "\" ",
                isLast ? '' : ',')));
    }
}
function renderNumber(choosenPath, isLast, pathKey, num) {
    return (React.createElement("span", { className: "json-literal" },
        React.createElement("i", { "data-pathKey": pathKey, className: getPickerStyle(getRelationship(choosenPath, pathKey)) }, "\uD83D\uDCCB"),
        React.createElement("span", null,
            num,
            " ",
            isLast ? '' : ',')));
}
function renderBoolean(choosenPath, isLast, pathKey, bool) {
    return (React.createElement("span", { className: "json-literal" },
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
        return (React.createElement("div", { className: relation == 1 ? "json-picked_tree" : '' },
            React.createElement("div", null,
                React.createElement("span", null, '{'),
                React.createElement("i", { "data-pathKey": pathKey, className: getPickerStyle(relation) }, "\uD83D\uDCCB")),
            React.createElement("ul", { className: "json-dict" }, keys.map(function (key, idx) {
                var nextPathKey = pathKey + " ." + key;
                return (React.createElement("li", { key: nextPathKey },
                    React.createElement("span", { className: "json-literal json-key" }, key),
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
        return (React.createElement("div", { className: relation == 1 ? "json-picked_tree" : '' },
            React.createElement("div", null,
                relation == 2 ? React.createElement("i", { "data-pathKey": pathKey, "data-chooseArr": "1", className: getPickArrStyle(choosenPath, pathKey) }, "[\u271A]") : null,
                React.createElement("span", null, '['),
                React.createElement("i", { "data-pathKey": pathKey, className: getPickerStyle(relation) }, "\uD83D\uDCCB")),
            React.createElement("ol", { className: "json-array" }, arr.map(function (value, idx) {
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
        return "json-pick_path";
    }
    else if (relation == 1) {
        return "json-pick_path json-picked";
    }
    else {
        return "json-pick_path json-pick_path_ancestor";
    }
}
function getPickArrStyle(choosenPath, nowPath) {
    var csp = choosenPath.split(' ');
    var np = nowPath.split(' ');
    if (csp[np.length] == '[*]') {
        return "json-pick_arr json-picked_arr";
    }
    else {
        return "json-pick_arr";
    }
}
/**
 * only for show json data
 */
function json2Jsx_onlyForShow(jsonObj, isLast) {
    if (isLast === void 0) { isLast = true; }
    if (jsonObj === null) {
        return (React.createElement("span", { className: "json-literal" },
            React.createElement("span", null,
                'null',
                " ",
                isLast ? '' : ',')));
    }
    else if (jsonObj === undefined) {
        return (React.createElement("span", { className: "json-literal" },
            React.createElement("span", null,
                'undefined',
                " ",
                isLast ? '' : ',')));
    }
    else if (Array.isArray(jsonObj)) {
        var arr = jsonObj;
        var length_1 = arr.length;
        return (React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("span", null, '[')),
            React.createElement("ol", { className: "json-array" }, arr.map(function (value, idx) {
                return (React.createElement("li", { key: idx }, json2Jsx_onlyForShow(value, idx == length_1 - 1 ? true : false)));
            })),
            React.createElement("div", null,
                ']',
                " ",
                isLast ? '' : ',')));
    }
    else if (typeof jsonObj == 'string') {
        var str = escape(jsonObj);
        if (isUrl(str)) {
            return (React.createElement("span", null,
                React.createElement("a", { target: "_blank", href: str, className: "json-literal" },
                    React.createElement("span", null,
                        "\"",
                        str,
                        "\" ",
                        isLast ? '' : ','))));
        }
        else {
            return (React.createElement("span", { className: "json-literal" },
                React.createElement("span", null,
                    "\"",
                    str,
                    "\" ",
                    isLast ? '' : ',')));
        }
    }
    else if (typeof jsonObj == 'number') {
        return (React.createElement("span", { className: "json-literal" },
            React.createElement("span", null,
                jsonObj,
                " ",
                isLast ? '' : ',')));
    }
    else if (typeof jsonObj == 'boolean') {
        return (React.createElement("span", { className: "json-literal" },
            React.createElement("span", null,
                jsonObj,
                " ",
                isLast ? '' : ',')));
    }
    else if (typeof jsonObj == 'object') {
        var keys = Object.keys(jsonObj);
        var length_2 = keys.length;
        if (length_2 > 0) {
            return (React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement("span", null, '{')),
                React.createElement("ul", { className: "json-dict" }, keys.map(function (key, idx) {
                    return (React.createElement("li", { key: idx },
                        React.createElement("span", { className: "json-literal json-key" }, key),
                        React.createElement("span", null, " : "),
                        json2Jsx_onlyForShow(jsonObj[key], idx == length_2 - 1 ? true : false)));
                })),
                React.createElement("div", null,
                    '}',
                    " ",
                    isLast ? '' : ',')));
        }
        else {
            return (React.createElement("span", null,
                React.createElement("span", null,
                    "{ }",
                    " ",
                    isLast ? '' : ',')));
        }
    }
    else {
        return null;
    }
}
