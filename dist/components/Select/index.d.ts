import { FC } from 'react';
import { SelectProps } from './select';
import { SelectItemProps } from './selectItem';
export declare type ISelectComponent = FC<SelectProps> & {
    Option: FC<SelectItemProps>;
};
declare const TransSelect: ISelectComponent;
export default TransSelect;
