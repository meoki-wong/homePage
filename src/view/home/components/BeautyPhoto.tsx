import { request } from "@/api/request";
import React, { useEffect, useState } from "react";
import "../assets/css/BeautyPhoto.less"
import { UserInfo } from "../type/home";
export default function BeautyPhoto() {
 
  const [userInfo, setUserInfo] = useState<UserInfo>(Object);

  useEffect(()=>{
    if (window.localStorage.getItem("token")) {
      // 登录情况下获取用户信息  刷新也会重新进行获取
      request.post("/getUserInfo").then((res) => {
        if (res.data.success) {
          setUserInfo(res.data.data);
          // props.getUserInfoDispatch(res.data.data)
        }
      });
    }
  }, [])
  return (
    <div className="beauty-photo">
      <img
        src="https://hippo-meoki.oss-cn-beijing.aliyuncs.com/homePage/homePage-image/home_index_1.jpeg"
        alt=""
      />
      <div className="intro-box">
        <div className="header">
        <img 
        src={userInfo.headerImg}
        alt="" />
        </div>
        这是什么情况啊</div>
    </div>
  );
}
