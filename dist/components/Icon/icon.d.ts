import { FC } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export declare type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
export interface IconProps extends FontAwesomeIconProps {
    /** 不同类型主题 */
    theme?: ThemeProps;
}
/**
 * ## Icon图标
 * ---
 * 语义化的矢量图形。使用图标组件
 *
 * ### 何时使用
 * - 使用 icon 标识
 *
 * ### 使用方式
 * ```js
 * import { Icon } from 'ts-com-ui'
 * ```
 */
export declare const Icon: FC<IconProps>;
export default Icon;
