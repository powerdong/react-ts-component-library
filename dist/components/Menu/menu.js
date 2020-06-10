import React, { useState, Children, cloneElement, createContext } from 'react';
import classNames from 'classnames';
export var MenuContext = createContext({ index: '0' });
/**
 * ## Menu导航菜单
 * ---
 * 为页面和功能提供导航的菜单列表。
 *
 * ### 何时使用
 * ---
 * - 导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。
 * - 一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。
 *
 * ### 使用方式
 * ```js
 * import { Menu, MenuItem } from 'ts-comp-ui'
 * ```
 */
export var Menu = function (props) {
    var className = props.className, mode = props.mode, style = props.style, children = props.children, defaultIndex = props.defaultIndex, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    });
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    var renderChildren = function () {
        return Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // 克隆一个元素，我们把想要克隆的元素放在第一个位置，想要传递的属性以对象的形式放在第二个位置
                return cloneElement(childElement, { index: index.toString() });
            }
            else {
                console.error('Warning: Menu has a child which is nort a MenuItem');
                return null;
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
};
export default Menu;
