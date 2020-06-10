import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
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
export var Pagination = function (props) {
    var current = props.current, defaultCurrent = props.defaultCurrent, defaultPageSize = props.defaultPageSize, disabled = props.disabled, className = props.className, hideOnSinglePage = props.hideOnSinglePage, pageSize = props.pageSize, 
    // pageSizeOptions,
    showQuickJumper = props.showQuickJumper, 
    // showSizeChanger,
    total = props.total, onChange = props.onChange;
    // 当前选中的是哪页
    var _a = useState(current || defaultCurrent || 1), nowSelIndex = _a[0], setNowSelIndex = _a[1];
    var _b = useState(''), jumpPage = _b[0], setJumpPage = _b[1];
    var _c = useState(false), isShow = _c[0], setIsShow = _c[1];
    // 当前的页面大小
    var nowPageSize = pageSize || defaultPageSize || 10;
    // 当前应该有几页
    var elementSum = Math.ceil(total / nowPageSize);
    var elementArr = Array(elementSum).fill(1);
    useEffect(function () {
        console.log('elementSum: ', elementSum);
        setIsShow(elementSum <= 1);
    }, [elementSum]);
    var handlePageClick = function (index) {
        if (disabled) {
            return;
        }
        if (index < 1) {
            index = 1;
        }
        else {
            index = Math.min(index, elementSum);
        }
        setNowSelIndex(index);
        onChange && onChange(index, nowPageSize);
    };
    var handlejumpToPage = function (e) {
        if (e.keyCode === 13 && Number(jumpPage)) {
            var index = nowSelIndex;
            if (index < 1) {
                index = 1;
            }
            else {
                index = Math.min(index, elementSum);
            }
            handlePageClick(Number(jumpPage));
        }
        setJumpPage('');
    };
    var renderPaginationItem = function (_a) {
        var index = _a.index;
        // 类名样式
        var classes = classNames('viking-pagination-item', className, {
            'is-active': index === nowSelIndex,
            'is-disabled': disabled
        });
        return (React.createElement("li", { className: classes, key: index, onClick: function () { return handlePageClick(index); } },
            React.createElement("span", null, index)));
    };
    var classes = classNames('viking-pagination', {
        'is-disabled': disabled,
        'is-show': hideOnSinglePage && isShow
    });
    var classesItem = classNames('viking-pagination-item', className, {
        'is-disabled': disabled
    });
    var classesJumpPage = classNames('viking-pagination-quick-jump', className, {
        'is-disabled': disabled
    });
    return (React.createElement("ul", { className: classes },
        React.createElement("li", { className: classesItem, onClick: function () { return handlePageClick(nowSelIndex - 1); } },
            React.createElement(Icon, { icon: "angle-left" })),
        elementArr.map(function (item, index) { return renderPaginationItem({ index: index + 1 }); }),
        React.createElement("li", { className: classesItem, onClick: function () { return handlePageClick(nowSelIndex + 1); } },
            React.createElement(Icon, { icon: "angle-right" })),
        showQuickJumper &&
            (React.createElement("li", null,
                React.createElement("div", { className: classesJumpPage },
                    "\u8DF3\u81F3",
                    React.createElement("input", { disabled: disabled, type: "text", value: jumpPage, onChange: function (e) { return setJumpPage(e.target.value); }, onKeyDown: handlejumpToPage }),
                    "\u9875")))));
};
Pagination.defaultProps = {
    defaultCurrent: 1,
    defaultPageSize: 10,
    hideOnSinglePage: false,
    pageSizeOptions: ['10', '20', '50', '100'],
    total: 0
};
export default Pagination;
