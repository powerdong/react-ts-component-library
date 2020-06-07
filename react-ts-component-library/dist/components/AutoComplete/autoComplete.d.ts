import { FC, ReactElement } from 'react';
import { InputProps } from '../Input/input';
interface DataSourceObject {
    value: string;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /**请求函数 */
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /**选中函数 */
    onSelect?: (item: DataSourceType) => void;
    /**自定义渲染样式 */
    renderOptions?: (item: DataSourceType) => ReactElement;
}
/**
 * 自动完成
 * 输入框自动完成功能
 * ```js
 * import { autoComplete } from 'ts-com-ui'
 * ```
 */
export declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
