import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react'
import Select, {SelectProps} from './select'
import {SelectItem as Option} from './selectItem';

const defaultProps: SelectProps = {
  defaultValue: 'lucy',
  onSelect: jest.fn(),
  allowClear: true,
} 

const searchSelProps: SelectProps = {
  showSearch: true,
  placeholder: 'Select a person',
  onChange: jest.fn(),
  onFocus: jest.fn(),
  onBlur: jest.fn(),
  onSearch: jest.fn(),
  filterOption: (input, option) =>{
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }
} 

const generateSelect = (props: SelectProps) => (
  <Select {...props}>
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="disabled" disabled>
      Disabled
    </Option>
    <Option value="yiminghe">Yiminghe</Option>
  </Select>
)

let wrapper: RenderResult,
    selectElement: HTMLElement,
    selectorElement: HTMLElement;

describe('test Select and Options component', () => {
  beforeEach(() => {
    wrapper = render(generateSelect(defaultProps))
    selectElement = wrapper.getByTestId('test-select')
    selectorElement = wrapper.getByTestId('test-selector')
  })
  it('should render default Select', () => {
    expect(selectElement).toBeInTheDocument()
    expect(selectElement).toHaveClass('viking-select')
    fireEvent.click(selectorElement)
    expect(selectElement).toHaveClass('is-opend')
    const allSelectItem = selectElement.querySelectorAll('.select-item')
    expect(allSelectItem.length).toEqual(4)
    expect(allSelectItem[2]).toHaveClass('is-disabled')
    expect(allSelectItem[1]).toHaveClass('is-active')
    fireEvent.click(allSelectItem[0])
    expect(allSelectItem[0]).toHaveClass('is-active')
    expect(allSelectItem[1]).not.toHaveClass('is-active')
    expect(defaultProps.onSelect).toHaveBeenCalledWith('jack')
    fireEvent.click(allSelectItem[2])
    expect(defaultProps.onSelect).not.toHaveBeenCalledWith()
  });
});

describe('test Select Input Search Component', () => {
  beforeEach(() => {
    wrapper = render(generateSelect(searchSelProps))
    selectElement = wrapper.getByTestId('test-select')
    selectorElement = wrapper.getByTestId('test-selector')
  })
  it('should render search select component', () => {
    expect(selectElement).toBeInTheDocument()
    expect(selectElement).toHaveClass('viking-select')
    fireEvent.click(selectorElement)
    expect(searchSelProps.onFocus).toHaveBeenCalled()
    const allSelectItem = selectElement.querySelectorAll('.select-item')
    expect(allSelectItem.length).toEqual(4)
    const inputEle = wrapper.getByPlaceholderText('Select a person') as HTMLInputElement
    expect(inputEle).toBeInTheDocument()
    expect(inputEle).toHaveClass('viking-select-selection-search-input')
    fireEvent.change(inputEle, {target: {value: 'j'}})
    expect(searchSelProps.onChange).toHaveBeenCalledWith('j')
  });
});