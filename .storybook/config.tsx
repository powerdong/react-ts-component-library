import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info'
import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import "../src/styles/index.scss"
library.add(fas)
const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px'
}

const storyWrapper = (stroyFn: any) => (
  <div style={wrapperStyle}>
    <h1 data-tool="mdnice编辑器" style={{marginTop: '30px', marginBottom: '15px', padding: '0px', color: 'black', fontSize: '1.7em', fontWeight: 'normal', borderBottom: '2px solid hsl(216, 100%, 68%)'}}><span className="prefix" style={{display: 'none'}} /><span className="content" style={{background: 'hsl(216, 100%, 68%)', color: 'white', padding: '3px 10px', borderTopRightRadius: '3px', borderTopLeftRadius: '3px', marginRight: '3px'}}>TS-Com-UI</span><span className="suffix" /></h1>
    {stroyFn()}
  </div>
)
addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({info: { inline: true, header: false}})
const loaderFn = () => {
  const allExports = [require('../src/welcome.stories.tsx')];
  const req = require.context('../src/components', true, /\.stories\.tsx$/);
  req.keys().forEach(fname => allExports.push(req(fname)));
  return allExports;
};


// automatically import all files ending in *.stories.js
configure(loaderFn, module);
