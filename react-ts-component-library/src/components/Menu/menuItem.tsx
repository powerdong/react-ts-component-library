import React, {FC, CSSProperties, useContext} from 'react';
import classNames from 'classnames';
import {MenuContext } from './menu'

export interface MenuItemProps {
  /**为每一项设置自定义索引 */
  index ?: string;
  /**是否可点击 */
  disabled ?: boolean;
  className ?: string;
  style ?: CSSProperties;
}

/**
 * 菜单项
 */
export const MenuItem: FC<MenuItemProps> = (props) => {
  const {index, disabled,  className, style, children} = props
  const context = useContext(MenuContext)

  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  })

  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem;