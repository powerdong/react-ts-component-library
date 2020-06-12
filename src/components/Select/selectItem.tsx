import React, { FC, CSSProperties, useContext, ReactNode } from 'react';
import classNames from 'classnames'
import { SelectContext } from './select'

type selValueType = string | number

export interface SelectItemProps {
  /** 是否禁用 */
  disabled ?: boolean;
  /** 根据此属性进行筛选 */
  value : selValueType;
  /** Option 器类名 */
  className ?: string;
  style ?: CSSProperties;
  children ?:  ReactNode;
}

export const SelectItem: FC<SelectItemProps> = (props) => {
  const {
    disabled,
    value,
    className,
    style,
    children,
  } = props;

  const context = useContext(SelectContext)

  const classes = classNames('select-item', className, {
    'is-disabled': disabled,
    'is-active': context.valueText.toString() === value.toString()
  })
  
  const handleClick = () => {
    if (context.onSelect && !disabled) {
      context.onSelect(value)
    }
  }

  return (
    <div className={classes} style={style} onClick={handleClick}>
      {children}
    </div>
  )
}

SelectItem.defaultProps = {
  disabled : false
}

SelectItem.displayName = 'SelectItem'


export default SelectItem;