import React from 'react'
import { render, RenderResult, fireEvent, wait } from '@testing-library/react'
import Pagination, { PaginationProps } from './pagination'

const defaultProps: PaginationProps = {
  defaultCurrent: 1,
  onChange: jest.fn(),
  total: 50,
}


describe('test Pagination component', () => {
  it('should render default Pagination', () => {
    const wrapper = render(<Pagination {...defaultProps}/>)
    const firstNode = wrapper.getByText('1')
    const endNode = wrapper.getByText('5')
    expect(firstNode).toBeInTheDocument()
    expect(endNode).toBeInTheDocument()
    // expect(firstNode).toHaveClass('is-active')
  });
  it('should render click change page Pagination', () => {
    const wrapper = render(<Pagination {...defaultProps}/>)
    const element = wrapper.container.querySelectorAll('li')
    expect(element.length).toEqual(7)
    const prevNode = wrapper.container.querySelectorAll('li')[0]
    const firstNode = wrapper.container.querySelectorAll('li')[1]
    const secondNode = wrapper.container.querySelectorAll('li')[2]
    expect(firstNode).toHaveClass('is-active')
    fireEvent.click(secondNode)
    expect(secondNode).toHaveClass('is-active')
    expect(defaultProps.onChange).toHaveBeenCalled()
    fireEvent.click(prevNode)
    expect(firstNode).toHaveClass('is-active')
  });
  it('should render jump quick page change page Pagination', () => {
    const wrapper = render(<Pagination showQuickJumper {...defaultProps}/>)
    const element = wrapper.container.querySelectorAll('li')
    expect(element.length).toEqual(8)
    const jumpNode = wrapper.container.querySelector('input') as HTMLInputElement
    const firstNode = wrapper.container.querySelectorAll('li')[1]
    const secondNode = wrapper.container.querySelectorAll('li')[2]
    const endNode = wrapper.container.querySelectorAll('li')[5]
    expect(firstNode).toHaveClass('is-active')
    fireEvent.change(jumpNode, {target: {value: 2}})
    fireEvent.keyDown(jumpNode, {keyCode: 13})
    expect(secondNode).toHaveClass('is-active')
    expect(defaultProps.onChange).toHaveBeenCalled()
    fireEvent.change(jumpNode, {target: {value: 7}})
    fireEvent.keyDown(jumpNode, {keyCode: 13})
    expect(endNode).toHaveClass('is-active')
  });
  it('should render disabled page change page Pagination', () => {
    const wrapper = render(<Pagination disabled {...defaultProps}/>)
    const element = wrapper.container.querySelectorAll('li')
    expect(element.length).toEqual(7)
    const firstNode = wrapper.container.querySelectorAll('li')[1]
    const secondNode = wrapper.container.querySelectorAll('li')[2]
    expect(firstNode).toHaveClass('is-active')
    fireEvent.click(secondNode)
    expect(secondNode).not.toHaveClass('is-active')
  });
});