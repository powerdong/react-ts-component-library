import { FC, CSSProperties } from 'react';
import { ThemeProps } from '../Icon/icon';
export interface ProgressProps {
    /** 百分比 */
    percent: number;
    /** 进度条高度 */
    strokeHeight?: number;
    /** 是否显示文字 */
    showText?: boolean;
    styles?: CSSProperties;
    theme?: ThemeProps;
}
export declare const Progress: FC<ProgressProps>;
export default Progress;
