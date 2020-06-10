/**
 * 不同的 Button Type
 * 不同的 BUtton Size
 * Disable 状态
 */
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
/**
 * ## Button按钮
 * ---
 * 按钮用于开始一个即时操作。
 *
 * ### 何时使用
 * ---
 * 标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
 *
 * - 主按钮：用于主行动点，一个操作区域只能有一个主按钮。
 * - 默认按钮：用于没有主次之分的一组行动点。
 * - 文本按钮：用于最次级的行动点。
 * - 链接按钮：用于作为外链的行动点。
 *
 * 以及四种状态属性与上面配合使用。
 *
 * - 危险：删除/移动/修改权限等危险操作，一般需要二次确认。
 * - 禁用：行动点不可用的时候，一般需要文案解释。
 *
 * ### 使用方式
 * ```js
 * import { Button } from 'ts-com-ui'
 * ```
 */
export var Button = function (props) {
    var _a;
    var btnType = props.btnType, className = props.className, disabled = props.disabled, size = props.size, children = props.children, href = props.href, restProps = __rest(props
    // btn, btn-lg btn-primary
    , ["btnType", "className", "disabled", "size", "children", "href"]);
    // btn, btn-lg btn-primary
    var classes = classNames('btn', className, (_a = {},
        _a["btn-" + btnType] = btnType,
        _a["btn-" + size] = size,
        _a['disabled'] = (btnType === 'link') && disabled,
        _a));
    if (btnType === 'link' && href) {
        return (React.createElement("a", __assign({ className: classes, href: href }, restProps), children));
    }
    else {
        return (React.createElement("button", __assign({}, restProps, { className: classes, disabled: disabled }), children));
    }
};
Button.defaultProps = {
    disabled: false,
    btnType: 'default'
};
export default Button;
