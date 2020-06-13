import React from 'react';
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Pagination from './pagination';

const defaultPagination = () => (
  <Pagination
    defaultCurrent={1}
    total={50}
  />
)

const changePagination = () => (
  <Pagination
    defaultCurrent={1}
    total={50}
    showSizeChanger
    onShowSizeChange={action('changeSize')}
    showQuickJumper
    onChange={action('chagngePage')}
  />
)

const disabledPagination = () => (
  <Pagination
    defaultCurrent={1}
    total={50}
    showQuickJumper
    showSizeChanger
    onShowSizeChange={action('changeSize')}
    disabled
    onChange={action('chagnge')}
  />
)

storiesOf('Pagination 分页', module)
  .add('Pagination', defaultPagination)
  .add('切换页码', changePagination)
  .add('禁用页码', disabledPagination)