import React, { FC, CSSProperties, ReactNode, createContext, useState, Children, FunctionComponentElement, cloneElement, useRef, MouseEvent } from 'react'
import classNames from 'classnames'
import { SelectItemProps } from './selectItem'
import Icon from '../Icon';
import Transition from '../Transition';
import useClickOutside from '../../hooks/useClickOutside'


type valueType = string | string[] | number | number[]
type selValueType = string | number
type selectSiztType = 'large' | 'middle' | 'small'

export interface SelectProps {
  /** 支持清除 */
  allowClear ?: boolean;
  /** 默认获取焦点 */
  autoFocus ?: boolean;
  className ?: string;
  /** 默认高亮第一个选项 */
  defaultActiveFirstOption ?: boolean;
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
  /** 最大显示的 tag 文本长度 */
  maxTagTextLength ?: number;
  /** 当下拉列表为空时显示的内容 */
  notFoundContent ?: ReactNode;
  /** 选择框默认文字 */
  placeholder ?: string;
  /** 是否显示下拉小箭头 */
  showArrow ?: boolean;
  /** 选择框大小 */
  size ?: selectSiztType;
  /** 指定当前选中的条目 */
  valueText ?: valueType;
  /** 失去焦点的回调 */
  onBlur ?: Function;
  /** 取消选中时回调，参数为选中项的 value */
  onDeselect ?: (value ?: selValueType) => void;
  /** 获得焦点时回调 */
  onFocus ?: Function;
  /** 被选中时回调 */
  onSelect ?: (value : valueType) => void;
  /**选中 option，或 input 的 value 变化 */
  onChange ?: (value ?: valueType) => void;
  /** 是否默认展开下拉菜单 */
  defaultOpen ?: boolean;
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

const Select: FC<SelectProps> = (props) => {
  const {
    children,
    allowClear,
    autoFocus,
    defaultActiveFirstOption,
    defaultValue,
    disabled,
    dropdownClassName,
    style,
    dropdownStyle,
    listHeight,
    maxTagCount,
    maxTagTextLength,
    notFoundContent,
    placeholder,
    showArrow,
    size,
    valueText,
    onBlur,
    onDeselect,
    onFocus,
    onSelect,
    onChange,
    defaultOpen,
    open,
    loading,
    className,
  } = props;

  const [ currentActiveValue, setActiveValue ] = useState(defaultValue || valueText || '')
  const [ isShowDropMenu, setShowDropMenu ] = useState(open)
  const selectContainer = useRef<HTMLDivElement>(null)
  useClickOutside(selectContainer, () => setShowDropMenu(false))
  const classes = classNames('viking-select', className, {
    'is-disabled': disabled,
    'select-large': size === 'large',
    'select-middle': size === 'middle',
    'select-small': size === 'small',
    'is-opend': isShowDropMenu,
    'is-clear': allowClear
  })
  
  const handleClick = (value : valueType) => {
    setActiveValue(value)
    onSelect && onSelect(value)
    setShowDropMenu(false)
  }

  const handleClearSelectorClick = (e: MouseEvent) => {
    e.stopPropagation()
    setActiveValue('')
  }
  
  const selItemContext: ISelectContext = {
    valueText: currentActiveValue,
    onSelect: handleClick,
    defaultActiveFirstOption,
    defaultValue,
    dropdownStyle,
    dropdownClassName,
  }


  const renderChildren = () => {
    const childrenComponent = Children.map(children, (child, index) => {
      const childElemnt = child as FunctionComponentElement<SelectItemProps>
      const { displayName } = childElemnt.type
      if (displayName === 'SelectItem') {
        return cloneElement(childElemnt, {value: childElemnt.props.value})
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
        <div className="viking-select-items">
          {childrenComponent}
        </div>
      </Transition>
    )
  }

  return (
    <div className={classes} ref={selectContainer} style={style}>
      <div className="viking-selector" onClick={() => setShowDropMenu(!isShowDropMenu)}>
        <span>{currentActiveValue}</span>
        <Icon icon="angle-down" className="arrow-icon" size="sm"/>
        <Icon icon="times-circle" className="close-icon" size="sm" onClick={(e) => handleClearSelectorClick(e)} />
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
  defaultActiveFirstOption : false,
  disabled : false,
  listHeight : 256,
  notFoundContent: 'Not Found',
  showArrow: true,
  loading : false,
  open: false,
}

export default Select;