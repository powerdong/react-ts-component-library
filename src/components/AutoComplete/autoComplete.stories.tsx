import React from 'react';
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AutoComplete, DataSourceType } from './autoComplete'

interface LakerWithNumberProps {
  value: string,
}

const SimpleComplete = () => {
  // const lakers = ['bradly', 'pope', 'caruso', 'cook', 'cousins',
  // 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
  // const lakerWithNumber = [
  //   {value: 'lambda'}
  // ]
  const testArray = [
    {value: 'ab', number: 11},
    {value: 'abc', number: 1},
    {value: 'a', number: 121},
    {value: 'b', number: 113},
    {value: 'abd', number: 111},
  ]
  // const handleFetch = (query: string) => (
  //   lakerWithNumber.filter(player => player.value.includes(query))
  // )
  const handleFetch = (query: string) => {
    // return fetch(`http://140.143.128.100:8080/api/search/suggest?keywords=${query}&type=mobile`)
    //       .then(res => res.json())
    //       .then(({result}) => {
    //         const { allMatch } = result
    //         return allMatch.map((item: any) => ({ value: item.keyword, ...item}))
    //       })  
    return testArray.filter(item => item.value.includes(query))
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

storiesOf('autoComplete component', module)
  .add('autoComplete', SimpleComplete)