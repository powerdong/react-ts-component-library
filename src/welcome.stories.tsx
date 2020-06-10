import React from 'react'
import { storiesOf } from '@storybook/react'
import Welcome from './welcome'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (<Welcome />)
  }, { info : { disable: true }})