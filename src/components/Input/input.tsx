import React, { FC, InputHTMLAttributes, ReactElement, ChangeEvent} from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm'

// 使用 Omit 忽略掉某一个定义的 Prop 类型
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /** 是否禁用 Input */
  disabled ?: boolean;
  /** 设置 Input 大小 `lg | sm` */
  size ?: InputSize;
  /** 添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon ?: IconProp;
  /** 添加前缀 用于配置一些固定组合 */
  prepend ?: string | ReactElement;
  /** 添加后缀 用于配置一些固定组合 */
  append ?: string | ReactElement;
  onChange ?: (e:ChangeEvent<HTMLInputElement>) => void
}

/**
 * ## Input 输入框
 * ---
 * 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 * 
 * ### 何时使用
 * ---
 * - 需要用户输入表单域内容时。
 * - 提供组合型输入框，带搜索的输入框，还可以进行大小选择。 
 * 
 * ### 使用方式
 * ```js
 * import { Input } from 'ts-com-ui'
 * ```
 */
export const Input: FC<InputProps> = (props) => {
  const {
    children,
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...restprops
  } = props

  const classes = classNames('viking-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })

  const fixControlledValue = (value: any) => {
    if (value == null) {
      return ''
    }
    return value
  }

  if ('value' in props) {
    delete restprops.defaultValue
    restprops.value = fixControlledValue(props.value)
  }

  return (
    <div className={classes} style={style}>
      {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}></Icon></div>}
      <input 
        className="viking-input-inner"
        disabled={disabled}
        {...restprops}
      />
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  )
}

export default Input;