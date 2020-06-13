import React from 'react';
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AutoComplete, DataSourceType } from './autoComplete'

interface LakerWithNumberProps {
  value: string,
}

const SimpleComplete = () => {
  const handleFetch = (query: string) => {
    return fetch(`http://140.143.128.100:8080/api/search/suggest?keywords=${query}&type=mobile`)
          .then(res => res.json())
          .then(({result}) => {
            const { allMatch } = result
            return allMatch.map((item: any) => ({ value: item.keyword, ...item}))
          })  
  }
  const renderOptions = (item: DataSourceType<LakerWithNumberProps>) => {
    return (
      <>
        <h2> {item.value}</h2>
      </>
    )
  }
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      renderOptions={renderOptions}
    />
  )
}

storiesOf('AutoComplete 自动完成', module)
  .add('AutoComplete', SimpleComplete)