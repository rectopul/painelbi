"use strict";
var _this = this;
exports.__esModule = true;
exports.CustomHelper = void 0;
exports.CustomHelper = {
    json: function (context) {
        function toList(obj, indent) {
            var res = "";
            for (var k in obj) {
                if (obj[k] instanceof Object) {
                    res = res + k + "\n" + toList(obj[k], ("   " + indent));
                }
                else {
                    res = res + indent + k + " : " + obj[k] + "\n";
                }
            }
            return res;
        }
        return toList(context, "");
    },
    ifCond: function (v1, v2, options) {
        if (v1 === v2) {
            return options.fn(_this);
        }
        return options.inverse(_this);
    },
    first: function (list, index, options) {
        if (list.length) {
            if (list[0][index])
                return list[0][index];
        }
        return options.inverse(_this);
    },
    contains: function (list, string, options) {
        if (list === string) {
            return options.fn(_this);
        }
        return options.inverse(_this);
    },
    check: function (v1, options) {
        if (v1 === true) {
            return options.fn(_this);
        }
        return options.inverse(_this);
    }
};
