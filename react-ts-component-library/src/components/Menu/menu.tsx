import React, { useState, createContext} from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  defaultIndex ?: string;
  className ?: string;
  mode ?: MenuMode;
  style ?: React.CSSProperties;
  onSelect ?: SelectCallback;
  defaultOpenSubMenus ?: string[];
}

interface IMenuContext {
  index: string;
  onSelect ?: SelectCallback;
  mode ?: MenuMode;
  defaultOpenSubMenus ?: string[];
}

export const MenuContext = createContext<IMenuContext>({index : '0'})

const Menu: React.FC<MenuProps> = (props) => {
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
    return React.Children.map(children, (child, index)=> {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // 克隆一个元素，我们把想要克隆的元素放在第一个位置，想要传递的属性以对象的形式放在第二个位置
        return React.cloneElement(childElement, {index: index.toString()})
      } else {
        console.error('Warning: Menu has a child which is nort a MenuItem');
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