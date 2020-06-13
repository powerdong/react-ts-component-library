import React, { createContext, useState, Children, cloneElement, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import Transition from '../Transition';
import useClickOutside from '../../hooks/useClickOutside';
export var SelectContext = createContext({ valueText: -1 });
/**
 * ## Select选择器
 * ---
 * 下拉选择器。
 *
 * ### 何时使用
 * ---
 * - 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 *
 * ### 使用方式
 * ```js
 * import { Select } from 'ts-com-ui'
 * const { Option } = Select
 * ```
 */
export var Select = function (props) {
    var children = props.children, allowClear = props.allowClear, autoFocus = props.autoFocus, showSearch = props.showSearch, defaultValue = props.defaultValue, disabled = props.disabled, dropdownClassName = props.dropdownClassName, style = props.style, dropdownStyle = props.dropdownStyle, listHeight = props.listHeight, maxTagCount = props.maxTagCount, notFoundContent = props.notFoundContent, _a = props.placeholder, placeholder = _a === void 0 ? '' : _a, showArrow = props.showArrow, size = props.size, value = props.value, onBlur = props.onBlur, onFocus = props.onFocus, onSelect = props.onSelect, onChange = props.onChange, onSearch = props.onSearch, filterOption = props.filterOption, _b = props.open, open = _b === void 0 ? false : _b, _c = props.loading, loading = _c === void 0 ? false : _c, className = props.className;
    var _d = useState(''), currentShowText = _d[0], setShowText = _d[1];
    var _e = useState(defaultValue || value || ''), currentActiveValue = _e[0], setActiveValue = _e[1];
    var _f = useState(open), isShowDropMenu = _f[0], setShowDropMenu = _f[1];
    var _g = useState(false), isFocus = _g[0], setFocus = _g[1];
    var selectContainer = useRef(null);
    var selectInp = useRef(null);
    useEffect(function () {
        var _a;
        if (((_a = children) === null || _a === void 0 ? void 0 : _a.toString()) !== currentActiveValue) {
            React.Children.map(children, function (child) {
                var childElemnt = child;
                if (currentActiveValue.toString() === childElemnt.props.value.toString()) {
                    setShowText(childElemnt.props.children);
                }
            });
        }
    }, [currentActiveValue, children]);
    useClickOutside(selectContainer, function () {
        setShowDropMenu(false);
        setFocus(false);
    });
    var selCls = classNames('viking-select', className, {
        'is-disabled': disabled,
        'select-large': size === 'large',
        'select-small': size === 'small',
        'is-opend': isShowDropMenu,
        'is-clear': allowClear
    });
    var handleSelectClick = function (value) {
        setActiveValue(value);
        onSelect && onSelect(value);
        setShowDropMenu(false);
    };
    var handleClearSelectorClick = function (e) {
        e.stopPropagation();
        setActiveValue('');
        setShowText('');
    };
    var handleFocus = function () {
        showSearch && setFocus(true);
        onFocus && onFocus();
    };
    var handleBlur = function () {
        showSearch && setFocus(false);
        onBlur && onBlur();
    };
    var handleChange = function (e) {
        setShowDropMenu(true);
        showSearch && setActiveValue(e.target.value);
        showSearch && setShowText(e.target.value);
        onChange && onChange(e.target.value);
    };
    var handleSearch = function (e) {
        if (e.keyCode === 13) {
            onSearch && onSearch(String(currentShowText));
        }
    };
    var selItemContext = {
        valueText: currentActiveValue,
        onSelect: handleSelectClick,
        defaultValue: defaultValue,
        dropdownStyle: dropdownStyle,
        dropdownClassName: dropdownClassName,
    };
    var renderChildren = function () {
        var _a, _b;
        var childrenComponent = Children.map(children, function (child) {
            var childElemnt = child;
            var displayName = childElemnt.type.displayName;
            if (displayName === 'SelectItem') {
                var isRenderItem = filterOption && childElemnt && filterOption(String(currentActiveValue), childElemnt.props);
                if (filterOption) {
                    if (isRenderItem) {
                        return cloneElement(childElemnt, { value: childElemnt.props.value, });
                    }
                    else {
                        return null;
                    }
                }
                else {
                    return cloneElement(childElemnt, { value: childElemnt.props.value, });
                }
            }
            else {
                console.error('Warning: Menu has a child which is nort a MenuItem');
                return null;
            }
        });
        return (React.createElement(Transition, { in: isShowDropMenu, timeout: 200, animation: "zoom-in-top" },
            React.createElement("div", { className: "viking-select-items", style: { maxHeight: listHeight + "px", overflow: 'auto' } }, (_a = childrenComponent) === null || _a === void 0 ? void 0 :
                _a.slice(0, maxTagCount),
                ((_b = childrenComponent) === null || _b === void 0 ? void 0 : _b.length) === 0 && React.createElement("span", { className: "not-found" }, notFoundContent))));
    };
    var renderSearchSelector = function () { return (React.createElement("div", { className: "viking-select-selection-search" },
        React.createElement("input", { type: "text", ref: selectInp, autoFocus: autoFocus, placeholder: placeholder, value: currentShowText, onFocus: handleFocus, onBlur: handleBlur, onChange: handleChange, className: "viking-select-selection-search-input" }))); };
    var isShowDownIcon = !loading && showArrow && !isFocus;
    return (React.createElement("div", { className: selCls, ref: selectContainer, style: style, "data-testid": "test-select" },
        React.createElement("div", { className: "viking-selector", onKeyDown: handleSearch, "data-testid": "test-selector", onClick: function () { var _a; !disabled && setShowDropMenu(!isShowDropMenu); (_a = selectInp.current) === null || _a === void 0 ? void 0 : _a.focus(); } },
            showSearch ? renderSearchSelector() : React.createElement("span", null, currentShowText),
            isShowDownIcon &&
                React.createElement(Icon, { icon: "angle-down", className: classNames({
                        "arrow-icon": isShowDownIcon && !showSearch
                    }), size: "sm" }),
            showSearch && isFocus && React.createElement(Icon, { icon: "search", size: "sm" }),
            allowClear && !showSearch &&
                React.createElement(Icon, { icon: "times-circle", className: "close-icon", size: "sm", onClick: function (e) { return handleClearSelectorClick(e); } }),
            !showSearch && loading && React.createElement(Icon, { icon: "spinner", size: "sm", spin: true, theme: "primary" })),
        React.createElement(SelectContext.Provider, { value: selItemContext }, renderChildren())));
};
Select.defaultProps = {
    allowClear: false,
    autoFocus: false,
    disabled: false,
    listHeight: 256,
    notFoundContent: 'Not Found',
    showArrow: true,
    loading: false,
    open: false,
    maxTagCount: 1000
};
export default Select;
