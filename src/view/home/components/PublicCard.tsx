import React, { useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import "../assets/css/PublicCard.less";
export default function PublicCard(props: any) {
  const navigate = useNavigate();
  let { publicData } = props;
  useEffect(() => {}, []);
  const goDetails = () => {
    const params = {
      // 传articleId
      id: publicData.id,
    };
    navigate({
      pathname: "/articleDetail",
      search: `${createSearchParams(params)}`,
    });
  };
  return (
    <div className="pub-contain">
      <div className="master-line">
        <div className="random-line"></div>
        <div className="circle-box">
          <div className="circle-solid"></div>
        </div>
      </div>
      <div className="pub-inner-box" onClick={goDetails}>
        <div className="title">{publicData.title}</div>
        <div className="view-area">
          <div className="show-data-area">
            <span>
              <i className="iconfont icon-liulan1"></i>{" "}
              <span className="num">{publicData.read_total}</span>
            </span>
            <span>
              <i className="iconfont icon-pinglun"></i>{" "}
              <span className="num">{publicData.articleReplys.length || 0}</span>
            </span>
            <span>
              <i className="iconfont icon-dianzanb"></i>{" "}
              <span className="num">0</span>
            </span>
          </div>
          <div className="time">发布时间:{publicData.createTime}</div>
        </div>
        <hr />
        { 
          publicData.titleImg && (
            <div className="img-area">
          <img
            src={publicData.titleImg}
            alt="文章图片"
          />
        </div>
          )
        }
        <p className="introduce">{publicData.introduce}</p>
        <a className="view-article">浏览文章...</a>
      </div>
    </div>
  );
}
