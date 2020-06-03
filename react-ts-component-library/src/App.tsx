import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button, { ButtonSize, ButtonType } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
library.add(fas)
function App() {
  return (
    <div className="App">
      <Icon icon="arrow-down"  theme="primary" size="10x" />
      <Menu defaultIndex={'0'} mode="vertical">
        <MenuItem>
          cool link
        </MenuItem>
        <MenuItem disabled>
          cool link 2
        </MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>
            dropdown 1
          </MenuItem>
          <MenuItem>
            dropdown 2
          </MenuItem>
        </SubMenu>
        <MenuItem>
          cool link 3
        </MenuItem>
      </Menu>
      <Button onClick = {(e) => {e.preventDefault()}} >Hello</Button>
      <Button disabled>Disabled</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large Btn</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Small Btn</Button>
      <Button btnType={ButtonType.Link} href="https://www.baidu.com">Baidu Link</Button>
      <Button btnType={ButtonType.Link} disabled href="https://www.baidu.com">Baidu Link</Button>
    </div>
  );
}

export default App;
