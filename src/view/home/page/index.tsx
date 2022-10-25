import React, { useEffect, useState } from "react";
import DataStatistics from "../components/DataStatistics";
import Relationship from "../components/Relationship";
import OneDayWord from "../components/OneDayWord";
import BeautyPhoto from "../components/BeautyPhoto";
import PublicCard from "../components/PublicCard";
import Archival from "@/layout/Archival";
import { request } from "@/api/request";
import { PublicData, PageParams } from "../type/home";
import { Pagination, Input } from "antd";
import { navList } from "../utils/homeNav";
import "../assets/css/homeIndex.less";
export default function HomeIndex() {
  const [publicData, setPublicData] = useState<PublicData>();
  const [searchVal, setSearchVal] = useState<string>('')
  let params: PageParams = {
    pageNum: 1,
    pageSize: 10,
  };
  useEffect(() => {
    getArticleData();
  }, []);
  const getArticleData = async () => {
    let res = await request.post("/getArticle", {
      UserId: JSON.parse(localStorage.getItem("userInfo")!).id,
      pageSize: params.pageSize,
      pageNum: params.pageNum,
      title: searchVal
    });
    if (res.data.success) {
      setPublicData(res.data);
    }
  };
  const changeSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value)
  }
  const search = async () => {
    getArticleData()
  }
  const changePage = (page: any, pageSize: any) => {
    params = {
      pageNum: page,
      pageSize: pageSize,
    };
    getArticleData();
  };
  
  return (
    <div className="home-contain">
      <div className="nav">
        {
          navList.map(item=> <p>{item.name}</p>)
        }
      </div>
      <div className="header">
        <div className="search">
          <p className="search-box">
            <Input 
            value={searchVal}
            placeholder="搜点什么？"
            onChange={(e)=>changeSearch(e)}
            />
            <i 
            className="iconfont icon-search"
            onClick={search}></i>
          </p>
        </div>
      </div>
      <div className="inner-box">
        {/* 功能区 */}
        <div className="func-area">
          {/* 照片区块 */}
          <BeautyPhoto />
          {/* 关系区块 */}
          <Relationship />
          {/* 数据区块 */}
          <DataStatistics />
          {/* 一言区块 */}
          <OneDayWord />
          {/* 备案信息 */}
          <Archival />
        </div>
        {/* 发布区 */}
        <div className="public-area">
          {publicData?.list.map((item: any) => {
            return (
                <PublicCard publicData={item} />
            );
          })}
          {publicData?.total ? <div className="page-box">
            <Pagination
              total={publicData?.total}
              showSizeChanger
              showQuickJumper
              onChange={changePage}
              showTotal={(total) => `共 ${total} 条`}
            />
          </div> : <p>暂无内容</p>}
        </div>
      </div>
    </div>
  );
}
