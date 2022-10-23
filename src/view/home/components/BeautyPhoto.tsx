import { request } from "@/api/request";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../assets/css/BeautyPhoto.less"
import { UserInfo } from "../type/home";
function BeautyPhoto(props: any) {
 
  const [userInfo, setUserInfo] = useState<UserInfo>(Object);

  useEffect(()=>{
    if (window.localStorage.getItem("token")) {
      // 登录情况下获取用户信息  刷新也会重新进行获取
      request.post("/getUserInfo").then((res) => {
        if (res.data.success) {
          setUserInfo(res.data.data);
          props.getUserInfoDispatch(res.data.data)
        }
      });
    }
    
  }, [])
  return (
    <div className="beauty-photo">
      <img
        src="https://hippo-meoki.oss-cn-beijing.aliyuncs.com/homePage/homePage-image/shuangjiang.jpeg"
        alt=""
      />
      <div className="intro-box">
        <div className="header">
        <img 
        src={userInfo.headerImg}
        alt="" />
        </div>
        <p className="desc-fest">
        霜降是秋季的最后一个节气，是秋季到冬季的过渡。霜降时节，万物毕成，毕入于戌，阳下入地，阴气始凝。天气渐寒始于霜降。《逸周书·周月》：“秋三月中气：处暑、秋分、霜降。”
        </p>
        </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    getUserInfoDispatch: (item: any) => {
      dispatch({
        type: 'userInfo',
        value: item
      })
    }
  }
  }
  const mapStateToProps = (state: any, ownProps: any) => {
    return {}
    
  };

  export default connect(mapStateToProps, mapDispatchToProps)(BeautyPhoto)