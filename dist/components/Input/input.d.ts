import { FC, InputHTMLAttributes, ReactElement, ChangeEvent } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
declare type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /** 是否禁用 Input */
    disabled?: boolean;
    /** 设置 Input 大小 `lg | sm` */
    size?: InputSize;
    /** 添加图标，在右侧悬浮添加一个图标，用于提示 */
    icon?: IconProp;
    /** 添加前缀 用于配置一些固定组合 */
    prepend?: string | ReactElement;
    /** 添加后缀 用于配置一些固定组合 */
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
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
export declare const Input: FC<InputProps>;
export default Input;
