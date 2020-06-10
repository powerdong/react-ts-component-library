import { FC } from 'react'
import Select, { SelectProps } from './select';
import SelectItem, { SelectItemProps } from './selectItem';

export type ISelectComponent = FC<SelectProps> & {
  Option : FC<SelectItemProps>
}

const TransSelect = Select as ISelectComponent

TransSelect.Option = SelectItem

export default TransSelect;
