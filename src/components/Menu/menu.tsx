import React, { useState, FC,CSSProperties, Children, FunctionComponentElement, cloneElement, createContext} from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  /**默认展示第几项 */
  defaultIndex ?: string;
  className ?: string;
  /**菜单横向排布还是纵向排布 `"horizontal" | "vertical"` */
  mode ?: MenuMode;
  style ?: CSSProperties;
  /** 旋转切换回调 */
  onSelect ?: SelectCallback;
  /**是否默认展开子菜单 */
  defaultOpenSubMenus ?: string[];
}

interface IMenuContext {
  index: string;
  onSelect ?: SelectCallback;
  mode ?: MenuMode;
  defaultOpenSubMenus ?: string[];
}

export const MenuContext = createContext<IMenuContext>({index : '0'})

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
export const Menu: FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props
  const [ currentActive, setActive ] = useState(defaultIndex)
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })

  const handleClick = (index : string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext: IMenuContext = {
    index : currentActive ? currentActive : '0',
    onSelect : handleClick,
    mode,
    defaultOpenSubMenus,
  }


  const renderChildren = () => {
    return Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // 克隆一个元素，我们把想要克隆的元素放在第一个位置，想要传递的属性以对象的形式放在第二个位置
        return cloneElement(childElement, {index: index.toString()})
      } else {
        console.error('Warning: Menu has a child which is nort a MenuItem');
        return null
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}


Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}

export default Menu;