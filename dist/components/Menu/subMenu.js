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
import React, { useContext, cloneElement, Children, useState, useRef } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import Transition from '../Transition/transition';
import Icon from '../Icon/icon';
import useClickOutside from '../../hooks/useClickOutside';
/**
 * 二级菜单项
 */
export var SubMenu = function (props) {
    var index = props.index, title = props.title, children = props.children, className = props.className;
    var context = useContext(MenuContext);
    var subMenuContainer = useRef(null);
    var openSubMenus = context.defaultOpenSubMenus;
    var isOpend = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false;
    var _a = useState(isOpend), menuOpen = _a[0], setOpen = _a[1];
    useClickOutside(subMenuContainer, function () { return setOpen(false); });
    var classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    });
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    var hoverEvents = context.mode === 'horizontal' ? {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); }
    } : {};
    var renderChildren = function () {
        var subMenuClasses = classNames('viking-submenu', {
            'menu-opened': menuOpen
        });
        var childrenComponent = Children.map(children, function (child, subindex) {
            var childElement = child;
            if (childElement.type.displayName === 'MenuItem') {
                return cloneElement(childElement, {
                    index: index + "-" + subindex
                });
            }
            else {
                console.error('Warning: Menu has a child which is nort a MenuItem');
                return null;
            }
        });
        return (React.createElement(Transition, { in: menuOpen, timeout: 300, animation: "zoom-in-bottom" },
            React.createElement("ul", { className: subMenuClasses }, childrenComponent)));
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvents, { ref: subMenuContainer }),
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvents),
            title,
            React.createElement(Icon, { icon: "angle-down", className: "arrow-icon" })),
        renderChildren()));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
