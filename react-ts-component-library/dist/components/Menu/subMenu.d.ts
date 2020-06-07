import { FC } from 'react';
export interface SubMenuProps {
    index?: string;
    /** 子菜单 */
    title: string;
    className?: string;
}
/**
 * 二级菜单项
 */
export declare const SubMenu: FC<SubMenuProps>;
export default SubMenu;
