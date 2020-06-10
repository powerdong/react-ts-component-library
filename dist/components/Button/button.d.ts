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
 * ## Button按钮
 * ---
 * 按钮用于开始一个即时操作。
 *
 * ### 何时使用
 * ---
 * 标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
 *
 * - 主按钮：用于主行动点，一个操作区域只能有一个主按钮。
 * - 默认按钮：用于没有主次之分的一组行动点。
 * - 文本按钮：用于最次级的行动点。
 * - 链接按钮：用于作为外链的行动点。
 *
 * 以及四种状态属性与上面配合使用。
 *
 * - 危险：删除/移动/修改权限等危险操作，一般需要二次确认。
 * - 禁用：行动点不可用的时候，一般需要文案解释。
 *
 * ### 使用方式
 * ```js
 * import { Button } from 'ts-com-ui'
 * ```
 */
export declare const Button: FC<ButtonProps>;
export default Button;
