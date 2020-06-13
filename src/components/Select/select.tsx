import React, { FC, CSSProperties, ReactNode, createContext, useState, Children, FunctionComponentElement, cloneElement, useRef, MouseEvent, ChangeEvent, KeyboardEvent, useEffect } from 'react'
import classNames from 'classnames'
import { SelectItemProps } from './selectItem'
import Icon from '../Icon';
import Transition from '../Transition';
import useClickOutside from '../../hooks/useClickOutside'


type valueType = string | number
type selectSiztType = 'large' | 'middle' | 'small'

export interface SelectProps {
  /** 支持清除 */
  allowClear ?: boolean;
  /** 默认获取焦点 */
  autoFocus ?: boolean;
  className ?: string;
  /** 使单选模式可搜索 */
  showSearch?: boolean;
  /** 指定默认选中条目 */
  defaultValue ?: valueType;
  /** 是否禁用 */
  disabled ?: boolean;
  /** 下拉菜单的 className 属性 */
  dropdownClassName ?: string;
  style ?: CSSProperties;
  /** 下拉菜单的 style 属性 */
  dropdownStyle ?: CSSProperties;
  /** 设置弹窗滚动高度 */
  listHeight ?: number;
  /** 最多显示多少个 tag */
  maxTagCount ?: number;
  /** 当下拉列表为空时显示的内容 */
  notFoundContent ?: ReactNode;
  /** 选择框默认文字 */
  placeholder ?: string;
  /** 是否显示下拉小箭头 */
  showArrow ?: boolean;
  /** 选择框大小 */
  size ?: selectSiztType;
  /** 指定当前选中的条目 */
  value ?: valueType;
  /** 失去焦点的回调 */
  onBlur ?: Function;
  /** 获得焦点时回调 */
  onFocus ?: Function;
  /** 被选中时回调 */
  onSelect ?: (value : any, ...rest: any[]) => void;
  /** 文本框值变化时的回调 */
  onSearch ?: (value : string) => void;
  filterOption ?: (inputValue: string, option ?: any) => boolean;
  /** input 的 value 变化 */
  onChange ?: (value : any, ...rest: any[]) => void;
  /** 是否展开下拉菜单 */
  open ?: boolean;
  /** 加载中状态 */
  loading ?: boolean;
}

export interface ISelectContext {
  valueText: valueType;
  onSelect ?: (value : valueType) => void;
  defaultActiveFirstOption ?: boolean;
  defaultValue ?: valueType;
  dropdownStyle ?: CSSProperties;
  dropdownClassName ?: string;
}

export const SelectContext = createContext<ISelectContext>({valueText: -1})

/**
 * ## Select选择器
 * ---
 * 下拉选择器。
 * 
 * ### 何时使用
 * ---
 * - 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * 
 * ### 使用方式
 * ```js
 * import { Select } from 'ts-com-ui'
 * const { Option } = Select
 * ```
 */
export const Select: FC<SelectProps> = (props) => {
  const {
    children,
    allowClear,
    autoFocus,
    showSearch,
    defaultValue,
    disabled,
    dropdownClassName,
    style,
    dropdownStyle,
    listHeight,
    maxTagCount,
    notFoundContent,
    placeholder = '',
    showArrow,
    size,
    value,
    onBlur,
    onFocus,
    onSelect,
    onChange,
    onSearch,
    filterOption,
    open = false,
    loading = false,
    className,
  } = props;

  const [ currentShowText, setShowText ] = useState('')
  const [ currentActiveValue, setActiveValue ] = useState(defaultValue || value || '')
  const [ isShowDropMenu, setShowDropMenu ] = useState(open)
  const [ isFocus, setFocus ] = useState(false)
  const selectContainer = useRef<HTMLDivElement>(null)
  const selectInp = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (children?.toString() !== currentActiveValue) {
      React.Children.map(children, (child) => {
        const childElemnt = child as FunctionComponentElement<SelectItemProps>
        if (currentActiveValue.toString() === childElemnt.props.value.toString()) {
          setShowText(childElemnt.props.children as string)
        }
      });
    }
  }, [currentActiveValue, children])
  useClickOutside(selectContainer, () => {
    setShowDropMenu(false)
    setFocus(false)
  })
  const selCls = classNames('viking-select', className, {
    'is-disabled': disabled,  
    'select-large': size === 'large',
    'select-small': size === 'small',
    'is-opend': isShowDropMenu,
    'is-clear': allowClear
  })
  
  const handleSelectClick = (value : valueType) => {
    setActiveValue(value)
    onSelect && onSelect(value)
    setShowDropMenu(false)
  }

  const handleClearSelectorClick = (e: MouseEvent) => {
    e.stopPropagation()
    setActiveValue('')
    setShowText('')
  }
  
  const handleFocus = () => {
    showSearch && setFocus(true)
    onFocus && onFocus()
  }

  const handleBlur = () => {
    showSearch && setFocus(false)
    onBlur && onBlur()
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setShowDropMenu(true)
    showSearch && setActiveValue(e.target.value)
    showSearch && setShowText(e.target.value)
    onChange && onChange(e.target.value)
  }

  const handleSearch = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      onSearch && onSearch(String(currentShowText))
    }
  }

  const selItemContext: ISelectContext = {
    valueText: currentActiveValue,
    onSelect: handleSelectClick,
    defaultValue,
    dropdownStyle,
    dropdownClassName,
  }


  const renderChildren = () => {
    const childrenComponent = Children.map(children, (child) => {
      const childElemnt = child as FunctionComponentElement<SelectItemProps>
      const { displayName } = childElemnt.type
      if (displayName === 'SelectItem') {
        const isRenderItem = filterOption && childElemnt && filterOption(String(currentActiveValue), childElemnt.props)
        if (filterOption) {
          if (isRenderItem) {
            return cloneElement(childElemnt, {value: childElemnt.props.value,})
          } else {
            return null
          }
        } else {
          return cloneElement(childElemnt, {value: childElemnt.props.value,})
        }
      } else {
        console.error('Warning: Menu has a child which is nort a MenuItem');
        return null
      }
    })
    return (
      <Transition 
        in={isShowDropMenu}
        timeout={200}
        animation="zoom-in-top"
      >
        <div className="viking-select-items" style={{maxHeight: `${listHeight}px`, overflow: 'auto'}} >
          {childrenComponent?.slice(0, maxTagCount)}
          {childrenComponent?.length === 0 && <span className="not-found">{notFoundContent}</span>}
        </div>
      </Transition>
    )
  }


  const renderSearchSelector = () => (
    <div className="viking-select-selection-search">
      <input
        type="text"
        ref={selectInp}
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={currentShowText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className="viking-select-selection-search-input" />
    </div>
  )

  const isShowDownIcon =  !loading && showArrow && !isFocus

  return (
    <div
      className={selCls} 
      ref={selectContainer}
      style={style}
      data-testid="test-select"
    >
      <div
        className="viking-selector"
        onKeyDown={handleSearch}
        data-testid="test-selector"
        onClick={() => {!disabled && setShowDropMenu(!isShowDropMenu); selectInp.current?.focus()}}
      >
        { showSearch ? renderSearchSelector() : <span>{currentShowText}</span>}
        { isShowDownIcon &&
          <Icon icon="angle-down"
          className={classNames({
          "arrow-icon": isShowDownIcon && !showSearch
          })}
          size="sm"
          />
        }
        { showSearch && isFocus && <Icon icon="search" size="sm" /> }
        { allowClear && !showSearch &&
          <Icon icon="times-circle"
          className="close-icon"
          size="sm"
          onClick={(e) => handleClearSelectorClick(e)}
          />
        }
        { !showSearch && loading &&  <Icon icon="spinner" size="sm" spin theme="primary" /> }
      </div>
      <SelectContext.Provider value={selItemContext}>
        { renderChildren()}
      </SelectContext.Provider>
    </div>
  )
}

Select.defaultProps = {
  allowClear: false,
  autoFocus : false,
  disabled : false,
  listHeight : 256,
  notFoundContent: 'Not Found',
  showArrow: true,
  loading : false,
  open: false,
  maxTagCount: 1000
}

export default Select;