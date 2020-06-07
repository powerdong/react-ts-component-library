/**
 * 不同的 Button Type
 * 不同的 BUtton Size
 * Disable 状态
 */
import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, FC } from 'react';
export declare type ButtonSize = 'lg' | 'sm';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
    className?: string;
    /** 设置 Button 的禁用 */
    disabled?: boolean;
    /** 设置 Button 的 尺寸 */
    size?: ButtonSize;
    /** 设置 Button 的类型 */
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 页面中最常用的按钮元素，适合完成特定的交互
 * ## 引用方法
 * ```js
 * import { Button } from 'ts-com-ui'
 * ```
 */
export declare const Button: FC<ButtonProps>;
export default Button;
