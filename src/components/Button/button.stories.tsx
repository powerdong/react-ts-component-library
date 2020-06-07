import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import  Button  from './button';

const defaultButton = () => (
  <Button onClick={action('clicked')}>Default button</Button>
)

const buttonWithSize = () => (
  <>
    <Button size="lg">Large Button</Button>
    <Button size="sm">Small Button</Button>
  </>
)

const buttonWithType = () => (
  <>
    <Button btnType="danger">Danger Button</Button>
    <Button btnType="link" href="/">Linke Button</Button>
    <Button btnType="primary">Primary Button</Button>
  </>
)


storiesOf('Button Component', module)
  .add('Button', defaultButton)
  .add('不同大小 Button', buttonWithSize)
  .add('不同类型 Button', buttonWithType)