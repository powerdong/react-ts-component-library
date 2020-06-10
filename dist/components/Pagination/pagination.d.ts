import { FC } from 'react';
export interface PaginationProps {
    /**当前页数 */
    current?: number;
    /** 默认的当前页数 */
    defaultCurrent?: number;
    /**默认的每页条数 */
    defaultPageSize?: number;
    /**禁用分页 */
    disabled?: boolean;
    /**只有一页时是否隐藏分分页器 */
    hideOnSinglePage?: boolean;
    /**每页条数 */
    pageSize?: number;
    /**指定每页可以显示多少条 */
    pageSizeOptions?: string[];
    /**是否可以快速跳转至某页 */
    showQuickJumper?: boolean;
    /**是否展示 pageSize 切换器，当 total 大于 50 时默认为 true */
    showSizeChanger?: boolean;
    className?: string;
    /** 数据总数 */
    total?: number;
    /** 页码改变的回调，参数是改变后的页码及每页条数 */
    onChange?: (page: number, PageSize?: number) => void;
    /** pageSize 变化回调 */
    onShowSizeChange?: (current: number, size: number) => void;
}
export interface PaginationItemProps {
    index: number;
}
/**
 * ## Pagination 分页
 * ---
 * 采用分页的形式分隔长列表，每次只加载一个页面。
 *
 * ### 何时使用
 * ---
 * - 当加载/渲染所有数据将花费很多时间时；
 * - 可切换页码浏览数据。
 *
 * ### 使用方式
 * ```js
 * import { Pagination } from 'ts-com-ui'
 * ```
 */
export declare const Pagination: FC<PaginationProps>;
export default Pagination;
