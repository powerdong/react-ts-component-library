import React, { FC, CSSProperties, ReactNode } from 'react';
declare type valueType = string | number;
declare type selectSiztType = 'large' | 'middle' | 'small';
export interface SelectProps {
    /** 支持清除 */
    allowClear?: boolean;
    /** 默认获取焦点 */
    autoFocus?: boolean;
    className?: string;
    /** 使单选模式可搜索 */
    showSearch?: boolean;
    /** 指定默认选中条目 */
    defaultValue?: valueType;
    /** 是否禁用 */
    disabled?: boolean;
    /** 下拉菜单的 className 属性 */
    dropdownClassName?: string;
    style?: CSSProperties;
    /** 下拉菜单的 style 属性 */
    dropdownStyle?: CSSProperties;
    /** 设置弹窗滚动高度 */
    listHeight?: number;
    /** 最多显示多少个 tag */
    maxTagCount?: number;
    /** 当下拉列表为空时显示的内容 */
    notFoundContent?: ReactNode;
    /** 选择框默认文字 */
    placeholder?: string;
    /** 是否显示下拉小箭头 */
    showArrow?: boolean;
    /** 选择框大小 */
    size?: selectSiztType;
    /** 指定当前选中的条目 */
    value?: valueType;
    /** 失去焦点的回调 */
    onBlur?: Function;
    /** 获得焦点时回调 */
    onFocus?: Function;
    /** 被选中时回调 */
    onSelect?: (value: any, ...rest: any[]) => void;
    /** 文本框值变化时的回调 */
    onSearch?: (value: string) => void;
    filterOption?: (inputValue: string, option?: any) => boolean;
    /** input 的 value 变化 */
    onChange?: (value: any, ...rest: any[]) => void;
    /** 是否展开下拉菜单 */
    open?: boolean;
    /** 加载中状态 */
    loading?: boolean;
}
export interface ISelectContext {
    valueText: valueType;
    onSelect?: (value: valueType) => void;
    defaultActiveFirstOption?: boolean;
    defaultValue?: valueType;
    dropdownStyle?: CSSProperties;
    dropdownClassName?: string;
}
export declare const SelectContext: React.Context<ISelectContext>;
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
export declare const Select: FC<SelectProps>;
export default Select;
