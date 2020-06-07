import React, {useContext, MouseEvent, cloneElement, Children, FC, FunctionComponentElement, useState, useRef} from 'react'
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import Transition from '../Transition/transition';
import Icon from '../Icon/icon';
import useClickOutside from '../../hooks/useClickOutside'

export interface SubMenuProps {
  index ?: string;
  /** 子菜单 */
  title : string;
  className ?: string;
}

/**
 * 二级菜单项
 */
export const SubMenu: FC<SubMenuProps> = (props) => {
  const { index, title, children, className } = props;
  const context = useContext(MenuContext)
  const subMenuContainer = useRef<HTMLLIElement>(null)
  const openSubMenus = context.defaultOpenSubMenus as string[]
  const isOpend = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false 
  const [ menuOpen, setOpen ] = useState(isOpend)
  useClickOutside(subMenuContainer, () => setOpen(false))
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
  })

  const handleClick = (e :MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }

  let timer: any
  const handleMouse = (e: MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300);
  } 
  
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  const hoverEvents = context.mode === 'horizontal' ? {
    onMouseEnter: (e: MouseEvent) => {handleMouse(e, true)},
    onMouseLeave: (e: MouseEvent) => {handleMouse(e, false)}
  } : {}
  const renderChildren = () => {
    const subMenuClasses = classNames('viking-submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = Children.map(children, (child, subindex) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem'){
        return cloneElement(childElement, {
          index: `${index}-${subindex}`
        })
      } else {
        console.error('Warning: Menu has a child which is nort a MenuItem');
        return null
      }
    })
    return (
      <Transition 
        in={menuOpen}
        timeout={300}
        animation="zoom-in-bottom"
      >
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents} ref={subMenuContainer}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu;