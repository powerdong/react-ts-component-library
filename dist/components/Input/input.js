var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
/**
 * ## Input 输入框
 * ---
 * 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ### 何时使用
 * ---
 * - 需要用户输入表单域内容时。
 * - 提供组合型输入框，带搜索的输入框，还可以进行大小选择。
 *
 * ### 使用方式
 * ```js
 * import { Input } from 'ts-com-ui'
 * ```
 */
export var Input = function (props) {
    var _a;
    var children = props.children, disabled = props.disabled, size = props.size, icon = props.icon, prepend = props.prepend, append = props.append, style = props.style, restprops = __rest(props, ["children", "disabled", "size", "icon", "prepend", "append", "style"]);
    var classes = classNames('viking-input-wrapper', (_a = {},
        _a["input-size-" + size] = size,
        _a['is-disabled'] = disabled,
        _a['input-group'] = prepend || append,
        _a['input-group-append'] = !!append,
        _a['input-group-prepend'] = !!prepend,
        _a));
    var fixControlledValue = function (value) {
        if (value == null) {
            return '';
        }
        return value;
    };
    if ('value' in props) {
        delete restprops.defaultValue;
        restprops.value = fixControlledValue(props.value);
    }
    return (React.createElement("div", { className: classes, style: style },
        prepend && React.createElement("div", { className: "viking-input-group-prepend" }, prepend),
        icon && React.createElement("div", { className: "icon-wrapper" },
            React.createElement(Icon, { icon: icon, title: "title-" + icon })),
        React.createElement("input", __assign({ className: "viking-input-inner", disabled: disabled }, restprops)),
        append && React.createElement("div", { className: "viking-input-group-append" }, append)));
};
export default Input;
