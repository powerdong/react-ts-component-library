import React from 'react';
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu'

const defaultMenu = () => (
  <Menu defaultIndex='0' onSelect={action('selected')}>
    <MenuItem>
      menu1
    </MenuItem>
    <MenuItem>
      menu2
    </MenuItem>
    <MenuItem>
      menu3
    </MenuItem>
  </Menu>
)

const renderSubMenu = () => (
  <Menu defaultIndex='0' onSelect={action('selected')}>
    <MenuItem>
      menu1
    </MenuItem>
    <SubMenu title="parent">
      <MenuItem>subItem1</MenuItem>
      <MenuItem>subItem2</MenuItem>
      <MenuItem>subItem3</MenuItem>
    </SubMenu>
    <MenuItem>
      menu2
    </MenuItem>
    <MenuItem>
      menu3
    </MenuItem>
  </Menu>
)

const renderVerticalMenu = () => (
  <Menu defaultIndex='0' mode="vertical" onSelect={action('selected')}>
    <MenuItem>
      menu1
    </MenuItem>
    <SubMenu title="parent">
      <MenuItem>subItem1</MenuItem>
      <MenuItem>subItem2</MenuItem>
      <MenuItem>subItem3</MenuItem>
    </SubMenu>
    <MenuItem>
      menu2
    </MenuItem>
    <MenuItem>
      menu3
    </MenuItem>
  </Menu>
)

storiesOf('Menu component', module)
  .add('Menu', defaultMenu)
  .add('SubMenu', renderSubMenu)
  .add('纵向排列的 Menu', renderVerticalMenu)