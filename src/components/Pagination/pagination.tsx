import React, { FC, useState, KeyboardEvent, ChangeEvent, useEffect } from 'react'
import classNames from 'classnames'
import Icon from '../Icon'

export interface PaginationProps {
  /**当前页数 */
  current ?: number;
  /** 默认的当前页数 */
  defaultCurrent ?: number;
  /**默认的每页条数 */
  defaultPageSize ?: number;
  /**禁用分页 */
  disabled ?: boolean;
  /**只有一页时是否隐藏分分页器 */
  hideOnSinglePage?: boolean;
  /**每页条数 */
  pageSize ?: number;
  /**指定每页可以显示多少条 */
  pageSizeOptions ?: string[];
  /**是否可以快速跳转至某页 */
  showQuickJumper ?: boolean;
  /**是否展示 pageSize 切换器，当 total 大于 50 时默认为 true */
  showSizeChanger ?: boolean;
  className ?: string;
  /** 数据总数 */
  total ?: number;
  /** 页码改变的回调，参数是改变后的页码及每页条数 */
  onChange ?: (page: number, PageSize?: number ) => void;
  /** pageSize 变化回调 */
  onShowSizeChange ?: (current: number, size: number) => void;
}

export interface PaginationItemProps {
  index: number
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
export const Pagination: FC<PaginationProps> = (props) => {
  const {
    current,
    defaultCurrent,
    defaultPageSize,
    disabled,
    className,
    hideOnSinglePage,
    pageSize,
    // pageSizeOptions,
    showQuickJumper,
    // showSizeChanger,
    total,
    onChange,
    // onShowSizeChange
  } = props;

  // 当前选中的是哪页
  const [nowSelIndex, setNowSelIndex] = useState(current || defaultCurrent || 1)
  const [jumpPage, setJumpPage] = useState('')
  const [isShow, setIsShow] = useState(false)
  // 当前的页面大小
  const nowPageSize = pageSize || defaultPageSize || 10
  
  // 当前应该有几页
  const elementSum = Math.ceil(total as number / nowPageSize)
  const elementArr: number[] = Array(elementSum).fill(1)

  useEffect(() => {
    console.log('elementSum: ', elementSum);
    setIsShow(elementSum <=1 )
  }, [elementSum])

  
  const handlePageClick = (index: number) => {
    if (disabled) {
      return
    }
    if (index < 1) {
      index = 1
    } else {
      index = Math.min(index, elementSum)
    }
    setNowSelIndex(index)
    onChange && onChange(index, nowPageSize)
  }

  const handlejumpToPage = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 && Number(jumpPage)) {
      let index = nowSelIndex
      if (index < 1) {
        index = 1
      } else {
        index = Math.min(index, elementSum)
      }
      handlePageClick(Number(jumpPage))
    }
    setJumpPage('')
  }
  const renderPaginationItem: FC<PaginationItemProps> = ({index}) => {
    // 类名样式
    const classes = classNames('viking-pagination-item', className, {
      'is-active': index === nowSelIndex,
      'is-disabled': disabled
    })
    return (
      <li className={classes}
        key={index}
        onClick={() => handlePageClick(index)}
      >
        <span>{index}</span>
      </li>
    )
  }

  const classes = classNames('viking-pagination', {
    'is-disabled': disabled,
    'is-show': hideOnSinglePage && isShow
  })

  const classesItem = classNames('viking-pagination-item', className, {
    'is-disabled': disabled
  })

  const classesJumpPage = classNames('viking-pagination-quick-jump', className, {
    'is-disabled': disabled
  })

  return (
    <ul className={classes}>
      <li 
        className= {classesItem}
        onClick={() => handlePageClick(nowSelIndex - 1)}
      >
        <Icon icon="angle-left"/>
      </li>
      {
        elementArr.map((item, index) => renderPaginationItem({index: index + 1}))
      }
      <li
        className={classesItem}
        onClick={() => handlePageClick(nowSelIndex + 1)}
      >
        <Icon icon="angle-right"/>
      </li>
      {
        showQuickJumper &&
        (<li>
          <div className={classesJumpPage}>
            跳至
            <input disabled={disabled} type="text" value={jumpPage} onChange={(e:ChangeEvent<HTMLInputElement>) => setJumpPage(e.target.value)} onKeyDown={handlejumpToPage}/>
            页
          </div>
        </li>)
      }
    </ul>
  )
}

Pagination.defaultProps = {
  defaultCurrent: 1,
  defaultPageSize: 10,
  hideOnSinglePage: false,
  pageSizeOptions: ['10', '20', '50', '100'],
  total: 0
}

export default Pagination;