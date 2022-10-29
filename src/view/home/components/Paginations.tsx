import React from "react";
import { PaginationProps } from './Paginations.d'
import './Paginations.less'
export default function Paginations(props: PaginationProps) {
  const { total } = props
	// const [page] =
	return (
		<div className="pagination-contain">
      <div className="statistic">
        第 <span>{total? 1 : 0}</span> 页 / 共 <span>{total || 0}</span> 页
      </div>
			<ul className="pagination-box">
        <li>第一页</li>
        <li>
          <i className="iconfont icon-shangyiye"></i>
        </li>
				{
          // 
          [1,2,3,4].map((item, index)=>{
            return (
              item !== 3?  <li>{item}</li> :  <li><i className="iconfont icon-gengduo"></i></li>
            )
          })
        }
        <li>
        <i className="iconfont icon-xiayiye"></i>
        </li>
        <li>尾页</li>
			</ul>
		</div>
	);
}
