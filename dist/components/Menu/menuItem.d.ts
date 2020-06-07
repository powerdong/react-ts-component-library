import { FC, CSSProperties } from 'react';
export interface MenuItemProps {
    /**为每一项设置自定义索引 */
    index?: string;
    /**是否可点击 */
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
}
/**
 * 菜单项
 */
export declare const MenuItem: FC<MenuItemProps>;
export default MenuItem;
