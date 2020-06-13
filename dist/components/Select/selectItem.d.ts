import { FC, CSSProperties, ReactNode } from 'react';
declare type selValueType = string | number;
export interface SelectItemProps {
    /** 是否禁用 */
    disabled?: boolean;
    /** 根据此属性进行筛选 */
    value: selValueType;
    /** Option 器类名 */
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}
export declare const SelectItem: FC<SelectItemProps>;
export default SelectItem;
