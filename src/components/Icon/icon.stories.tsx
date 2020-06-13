import React from 'react';
import { storiesOf } from '@storybook/react'

import Icon from './icon'

const defaultIcon = () => (
  <>
    <Icon icon="battery-empty"/>
    <Icon icon="battery-half"/>
    <Icon icon="battery-full"/>
  </>
)

const differentSizeIcon = () => (
  <>
    <Icon size="lg" icon="battery-empty"/>
    <Icon size="sm" icon="battery-half"/>
    <Icon size="xs" icon="battery-full"/>
  </>
)

const spinIcon = () => (
  <Icon size="lg" icon="spinner" spin/>
)

storiesOf('Icon 图标', module)
  .add('Icon', defaultIcon)
  .add('不同尺寸 Icon', differentSizeIcon)
  .add('旋转 Icon', spinIcon)