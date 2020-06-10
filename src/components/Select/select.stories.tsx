import React from 'react';
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Select from './index';

const {Option} = Select

const defaultSelect = () => (
  <>
    <Select
      defaultValue="Lucy"
      style={{ width: 120 }}
      onChange={action('change')}>
      <Option value="Jack">Jack</Option>
      <Option value="Lucy">Lucy</Option>
      <Option value="Disabled" disabled>
        Disabled
      </Option>
      <Option value="yiminghe">yiminghe</Option>
    </Select>

    <Select
      defaultValue="Lucy"
      style={{ width: 120 }}
      allowClear
      onChange={action('change')}>
      <Option value="Jack">Jack</Option>
      <Option value="Lucy">Lucy</Option>
      <Option value="Disabled" disabled>
        Disabled
      </Option>
      <Option value="yiminghe">yiminghe</Option>
    </Select>
  </>
)

storiesOf('Select Component', module)
  .add('Select', defaultSelect)