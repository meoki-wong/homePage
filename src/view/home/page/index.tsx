import React, { useEffect, useState } from "react";
import DataStatistics from "../components/DataStatistics";
import Relationship from "../components/Relationship";
import OneDayWord from "../components/OneDayWord";
import BeautyPhoto from "../components/BeautyPhoto";
import PublicCard from "../components/PublicCard";
import Archival from "@/layout/Archival";
import "../assets/css/homeIndex.less";
import { request } from "@/api/request";
import { PublicData, PageParams } from "../type/home";
import { Pagination } from "antd";
export default function HomeIndex() {
  const [publicData, setPublicData] = useState<PublicData>();
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
    });
    if (res.data.success) {
      setPublicData(res.data);
    }
  };
  const changePage = (page: any, pageSize: any) => {
    // if(page === params.pageNum && pageSize === params.pageSize) return
    params = {
      pageNum: page,
      pageSize: pageSize,
    };
    getArticleData();
  };

  return (
    <div className="home-contain">
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
            return <PublicCard publicData={item} />;
          })}
          <div className="page-box">
            <Pagination
              total={publicData?.total}
              showSizeChanger
              showQuickJumper
              onChange={changePage}
              showTotal={(total) => `共 ${total} 条`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
