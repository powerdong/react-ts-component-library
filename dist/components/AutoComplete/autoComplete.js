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
import React, { useState, useEffect, useRef } from 'react';
import Input from '../Input/input';
import Icon from '../Icon/icon';
import classNames from 'classnames';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
/**
 * ## AutoComplete 自动完成
 * ---
 * 输入框自动完成功能。
 *
 * ### 何时使用
 * ---
 * 需要自动完成时。
 *
 * ### 使用方式
 * ```js
 * import { AutoComplete } from 'ts-com-ui'
 * ```
 */
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOptions = props.renderOptions, restProps = __rest(props
    // 保存状态即可，不需要引起组件的渲染
    , ["fetchSuggestions", "onSelect", "value", "renderOptions"]);
    // 保存状态即可，不需要引起组件的渲染
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    var _c = useState(-1), highLightIndex = _c[0], setHighLightIndex = _c[1];
    var debounceValue = useDebounce(inputValue, 500);
    useClickOutside(componentRef, function () { return setSuggstions([]); });
    useEffect(function () {
        if (debounceValue && triggerSearch.current) {
            var results = fetchSuggestions(debounceValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (data) {
                    setSuggstions(data);
                    setLoading(false);
                });
            }
            else {
                setSuggstions(results);
            }
        }
        else {
            setSuggstions([]);
        }
        setHighLightIndex(-1);
    }, [debounceValue, fetchSuggestions]);
    var _d = useState([]), suggestions = _d[0], setSuggstions = _d[1];
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSuggstions([]);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOptions ? renderOptions(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement("ul", null, suggestions.map(function (item, index) {
            var classes = classNames('suggestion-item', {
                'item-highlighted': index === highLightIndex
            });
            return (React.createElement("li", { onClick: function () { return handleSelect(item); }, key: index, className: classes }, renderTemplate(item)));
        })));
    };
    var highLight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighLightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13:
                if (suggestions[highLightIndex]) {
                    handleSelect(suggestions[highLightIndex]);
                }
                break;
            case 38:
                highLight(highLightIndex - 1);
                break;
            case 40:
                highLight(highLightIndex + 1);
                break;
            case 27:
                setSuggstions([]);
                break;
            default:
                break;
        }
    };
    return (React.createElement("div", { className: "viking-auto-complete", ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)),
        loading && React.createElement("ul", null,
            React.createElement(Icon, { icon: "spinner", spin: true })),
        suggestions.length > 0 && generateDropdown()));
};
export default AutoComplete;
