import React, { useContext } from 'react';
import classNames from 'classnames';
import { SelectContext } from './select';
export var SelectItem = function (props) {
    var disabled = props.disabled, value = props.value, className = props.className, style = props.style, children = props.children;
    var context = useContext(SelectContext);
    var classes = classNames('select-item', className, context.dropdownClassName, {
        'is-disabled': disabled,
        'is-active': context.valueText.toString() === value.toString()
    });
    var handleClick = function () {
        if (context.onSelect && !disabled) {
            context.onSelect(value);
        }
    };
    return (React.createElement("div", { className: classes, style: style, onClick: handleClick }, children));
};
SelectItem.defaultProps = {
    disabled: false
};
SelectItem.displayName = 'SelectItem';
export default SelectItem;
