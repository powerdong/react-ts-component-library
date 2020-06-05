import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';

library.add(fas)
function App() {
  const [ show, setShow] = useState(false)
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
      <Button btnType='primary' onClick={() => setShow(!show)}  size='lg'>Toggle Btn</Button>
      <Transition
        in={show}
        timeout={300}
        animation='zoom-in-left'
      >
        <div>
          <ul>
            <li>loram{1}</li>
            <li>loram{2}</li>
            <li>loram{3}</li>
          </ul>
        </div>
      </Transition>
      <Button btnType='danger' size='sm'>Small Btn</Button>
      <Button btnType='link' href="https://www.baidu.com">Baidu Link</Button>
      <Button btnType='link' disabled href="https://www.baidu.com">Baidu Link</Button>
    </div>
  );
}

export default App;
