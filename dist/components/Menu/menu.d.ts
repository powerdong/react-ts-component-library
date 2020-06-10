import React, { FC, CSSProperties } from 'react';
declare type MenuMode = 'horizontal' | 'vertical';
declare type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    /**默认展示第几项 */
    defaultIndex?: string;
    className?: string;
    /**菜单横向排布还是纵向排布 `"horizontal" | "vertical"` */
    mode?: MenuMode;
    style?: CSSProperties;
    /** 旋转切换回调 */
    onSelect?: SelectCallback;
    /**是否默认展开子菜单 */
    defaultOpenSubMenus?: string[];
}
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
/**
 * ## Menu导航菜单
 * ---
 * 为页面和功能提供导航的菜单列表。
 *
 * ### 何时使用
 * ---
 * - 导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。
 * - 一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。
 *
 * ### 使用方式
 * ```js
 * import { Menu, MenuItem } from 'ts-comp-ui'
 * ```
 */
export declare const Menu: FC<MenuProps>;
export default Menu;
