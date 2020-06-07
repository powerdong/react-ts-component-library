/**
 * 不同的 Button Type
 * 不同的 BUtton Size
 * Disable 状态
 */

import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, FC } from 'react';
import classNames from 'classnames'

export type ButtonSize = 'lg' | 'sm'

export type ButtonType = 'primary' | 'default' | 'danger' |  'link'

interface BaseButtonProps {
  className ?: string;
  /** 设置 Button 的禁用 */
  disabled ?: boolean;
  /** 设置 Button 的 尺寸 */
  size ?: ButtonSize;
  /** 设置 Button 的类型 */
  btnType ?: ButtonType;
  children : React.ReactNode;
  href ?: string
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>

// 使用 Partial 包裹，使得属性都变成可选属性
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 * 页面中最常用的按钮元素，适合完成特定的交互
 * ## 引用方法
 * ```js
 * import { Button } from 'ts-com-ui'
 * ```
 */
export const Button: FC<ButtonProps> = (props) => {
  const {
    btnType,
    className,
    disabled,
    size,
    children,
    href,
    ...restProps
  } = props

  // btn, btn-lg btn-primary
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType ===  'link') && disabled
  })

  if (btnType === 'link' && href) {
    return (
      <a
        className={classes}
        href={href}
        {...restProps}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        {...restProps}
        className={classes}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button;