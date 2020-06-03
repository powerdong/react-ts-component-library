import React from 'react'
import { render, RenderResult, fireEvent, cleanup, wait } from '@testing-library/react'
import Menu, {MenuProps} from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['4']
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
        <MenuItem>
        active
        </MenuItem>
        <MenuItem disabled>
          disabled
        </MenuItem>
        <MenuItem>
          xyz
        </MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>
            drop1
          </MenuItem>
        </SubMenu>
        <SubMenu title="dropdown1">
          <MenuItem>
            opened1
          </MenuItem>
        </SubMenu>
      </Menu>
  )
}

// 判断二级菜单是否隐藏，这时候测试用例里边没有对应的 css 文件，需要手动添加一部分的样式
const createStyleFile = () => {
  const cssFile: string = `
    .viking-submenu {
      display: none;
    }
    .viking-submenu.menu-opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult,
    wrapper2: RenderResult,
    menuElement: HTMLElement,
    activeElement: HTMLElement,
    disabledElement: HTMLElement

describe('test Menu and MenuItem component', () => {
  // beforeEach 钩子函数会在每个 case 执行前都会执行
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  // 正确渲染
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('viking-menu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  });
  // 测试 select 选择
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    // 这个回调触发过，并且传的值为 2
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  });
  // 测试纵向排列
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  });
  // hover 展示
  it('should show dropdown items when hover on subMenu', async () => {
    // 判断二级菜单是否默认隐藏
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    // 等待异步操作
    await wait(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible()
    })
    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await wait(() =>{
      expect(wrapper.queryByText('drop1')).not.toBeVisible()
    })
  });
  // 点击以后显示
  it('should show dropdown items when click on subMenu', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    wrapper.container.append(createStyleFile())
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.click(dropdownElement)
    expect(wrapper.queryByText('drop1')).toBeVisible()
    fireEvent.click(dropdownElement)
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
  });
  // 测试默认展示
  it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    wrapper.container.append(createStyleFile())
    expect(wrapper.queryByText('opened1')).toBeVisible()
  })
});