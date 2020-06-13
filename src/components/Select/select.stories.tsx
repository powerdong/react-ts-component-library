import React from 'react';
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Select from './index';

const {Option} = Select

const defaultSelect = () => (
  <>
    <Select
      value='jack'
      style={{ width: 120 }}
      onSelect={action('select')}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="yiminghe">Yiminghe</Option>
    </Select>

    <Select
      defaultValue="Lucy"
      style={{ width: 120 }}
      allowClear
      disabled
      onSelect={action('select')}>
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
      onSelect={action('select')}>
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
      loading
      onSelect={action('select')}>
      <Option value="Jack">Jack</Option>
      <Option value="Lucy">Lucy</Option>
      <Option value="Disabled" disabled>
        Disabled
      </Option>
      <Option value="yiminghe">yiminghe</Option>
    </Select>
  </>
)

const differentSizes = () => (
  <>
    <Select
      defaultValue="Lucy"
      style={{ width: 120 }}
      allowClear
      size="large"
      onSelect={action('select')}>
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
      size="small"
      onSelect={action('select')}>
      <Option value="Jack">Jack</Option>
      <Option value="Lucy">Lucy</Option>
      <Option value="Disabled" disabled>
        Disabled
      </Option>
      <Option value="yiminghe">yiminghe</Option>
    </Select>
  </>
)

const searchSelect = () => {
  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select a person"
      onChange={action('change')}
      onFocus={action('focus')}
      onBlur={action('blur')}
      onSelect={action('select')}
      onSearch={action('search')}
      filterOption={(input, option) =>{
        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      }
    >
      <Option value="Jack">Jack</Option>
      <Option value="Lucy">Lucy</Option>
      <Option value="Tom">Tom</Option>
      <Option value="LLKJHGFDSDFGHJKUYTRERTYUIIUYTREW">LLKJHGFDSDFGHJKUYTRERTYUIIUYTREW</Option>
    </Select>
  )
}

storiesOf('Select 选择器', module)
  .add('Select', defaultSelect)
  .add('不同尺寸 Select', differentSizes)
  .add('带搜索框的 Select', searchSelect)