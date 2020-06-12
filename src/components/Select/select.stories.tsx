import React from 'react';
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Select from './index';

const {Option} = Select

const defaultSelect = () => (
  <>
    <Select
      value={1}
      style={{ width: 120 }}
      onChange={action('change')}>
      <Option value={1}>10条信息</Option>
      <Option value="lucy"><span>Lucy</span></Option>
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

    <Select
      defaultValue="Lucy"
      style={{ width: 120 }}
      loading
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

const differentSizes = () => (
  <>
    <Select
      defaultValue="Lucy"
      style={{ width: 120 }}
      allowClear
      size="large"
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
      size="small"
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

const searchSelect = () => {
  function onChange(value : string) {
    console.log(`selected ${value}`);
  }
  
  function onBlur() {
    console.log('blur');
  }
  
  function onFocus() {
    console.log('focus');
  }
  
  function onSearch(val:string) {
    console.log('search:', val);
  }

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select a person"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      filterOption={(input, option) =>{
        console.log('input: ', input)
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

storiesOf('Select Component', module)
  .add('Select', defaultSelect)
  .add('不同尺寸 Select', differentSizes)
  .add('带搜索框的 Select', searchSelect)