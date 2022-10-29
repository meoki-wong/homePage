import React, { useEffect, useState } from "react";
import { PaginationProps } from "./Paginations.d";
import "./Paginations.less";
export default function Paginations(props: PaginationProps) {
	const { total, onchange } = props;

	const [pageArr, setPageArr] = useState<number[]>([1])
  let [active, setActive] = useState<number>(1)
  const calcPageArr = (length: number) => Array.from({length}).map((v, k) => k + 1);
  useEffect(()=>{
    setPageArr(calcPageArr(Math.ceil((total || 0) / 10)))
  }, [total])
  /**
   * 
   * @param item 切换的页码
   */
	const changePage = (item: number) => {
		onchange && onchange(item, 10);
    setActive(item)
    
	};
  const prePage = () => {
    changePage(--active)
  }
  const nextPage = () => {
    changePage(++active)
  }
  const goLastPage = () => {
    changePage(pageArr[pageArr.length-1])
  }
  const goFirstPage = () => {
    changePage(1)
  }
	return (
		<div className="pagination-contain">
			<div className="statistic">
				第 <span>{total ? 1 : 0}</span> 页 / 共{" "}
				<span>{total || 0}</span> 条
			</div>
			<ul className="pagination-box">
				<li onClick={goFirstPage}>第一页</li>
				<li onClick={prePage}>
					<i className="iconfont icon-shangyiye"></i>
				</li>
				{
					//
					pageArr?.map((item: number) => {
						return item !== 3 ? (
							<li 
              className={item === active? 'active-page' : ''}
              onClick={() => changePage(item)}>{item}</li>
						) : (
							<li>
								<i className="iconfont icon-gengduo"></i>
							</li>
						);
					})
				}
				<li onClick={nextPage}>
					<i className="iconfont icon-xiayiye"></i>
				</li>
				<li onClick={goLastPage}>尾页</li>
			</ul>
		</div>
	);
}
