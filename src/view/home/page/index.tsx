import React, { useEffect, useState } from "react";
import DataStatistics from "../components/DataStatistics";
import Relationship from "../components/Relationship";
import OneDayWord from "../components/OneDayWord";
import BeautyPhoto from "../components/BeautyPhoto";
import PublicCard from "../components/PublicCard";
import Archival from "@/layout/Archival";
import { request } from "@/api/request";
import { PublicData, PageParams } from "../type/home";
import { Pagination } from "antd";
import { createSearchParams, useNavigate } from "react-router-dom";
import "../assets/css/homeIndex.less";
interface DetailItem {
    id: string
}
export default function HomeIndex() {
  const navigate = useNavigate();
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
    if (page === params.pageNum && pageSize === params.pageSize) return;
    params = {
      pageNum: page,
      pageSize: pageSize,
    };
    getArticleData();
  };
  const goDetails = (item: DetailItem) => {
    const params = {
      // 传articleId
      id: item.id,
    };
    navigate({
      pathname: "/blog/articleDetail",
      search: `${createSearchParams(params)}`,
    });
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
            return (
              <div onClick={() => goDetails(item)}>
                <PublicCard publicData={item} />
              </div>
            );
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
