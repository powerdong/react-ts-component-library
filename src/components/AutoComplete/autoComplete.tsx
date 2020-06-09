import React, {FC, useState, ChangeEvent, ReactElement, useEffect, KeyboardEvent, useRef} from 'react';
import Input, {InputProps} from '../Input/input'
import Icon from '../Icon/icon'
import classNames from 'classnames'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceObject {
  value: string,
}
export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**请求函数 */
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /**选中函数 */
  onSelect ?: (item: DataSourceType) => void;
  /**自定义渲染样式 */
  renderOptions ?: (item: DataSourceType) => ReactElement
}

/**
 * ## AutoComplete 自动完成
 * ---
 * 输入框自动完成功能。
 * 
 * ### 何时使用
 * ---
 * 需要自动完成时。
 * 
 * ### 使用方式
 * ```js
 * import { AutoComplete } from 'ts-com-ui'
 * ```
 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOptions,
    ...restProps
  } = props
  // 保存状态即可，不需要引起组件的渲染
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const [ inputValue, setInputValue ] = useState(value as string)
  const [ loading, setLoading ] = useState(false)
  const [ highLightIndex, setHighLightIndex ] = useState(-1)
  const debounceValue = useDebounce(inputValue, 500)
  useClickOutside(componentRef, () => setSuggstions([]))
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const results = fetchSuggestions(debounceValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setSuggstions(data)
          setLoading(false)
        })
      } else {
        setSuggstions(results)
      } 
    } else {
      setSuggstions([])
    }
    setHighLightIndex(-1)
  }, [debounceValue, fetchSuggestions])
  const [ suggestions, setSuggstions ] = useState<DataSourceType []>([])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggstions([])
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }


  const renderTemplate = (item: DataSourceType) => {
    return renderOptions ? renderOptions(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const classes = classNames('suggestion-item', {
            'item-highlighted': index === highLightIndex
          })
          return (
              <li
                onClick={() => handleSelect(item)}
                key={index}
                className={classes}
              >
                {renderTemplate(item)}
              </li>
            )
          })
        }
      </ul>
    )
  }

  const highLight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighLightIndex(index)
  }

  const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        if (suggestions[highLightIndex]) {
          handleSelect(suggestions[highLightIndex])
        }
        break;
      case 38:
        highLight(highLightIndex - 1)
        break;
      case 40:
        highLight(highLightIndex + 1)
        break;
      case 27:
        setSuggstions([])
        break;
      default:
        break;
    }
  }
  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input 
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      { loading && <ul><Icon icon="spinner" spin/></ul> }
      {
        suggestions.length > 0 && generateDropdown()
      }
    </div>
  )
}

export default AutoComplete;