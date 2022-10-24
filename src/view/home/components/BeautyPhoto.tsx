import { request } from "@/api/request";
import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../assets/css/BeautyPhoto.less"
import { UserInfo } from "../type/home";
export default function BeautyPhoto(props: any) {
 

  const [avatar, setAvatar] = useState<string>('')
  useEffect(()=>{
    if(window.localStorage.getItem('token')){
      console.log('----测试', JSON.parse(localStorage.getItem('avatar')!).headerImg);
      setAvatar(JSON.parse(localStorage.getItem('avatar')!).headerImg)
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
        src={avatar}
        alt="" />
        </div>
        <p className="desc-fest">
        霜降是秋季的最后一个节气，是秋季到冬季的过渡。霜降时节，万物毕成，毕入于戌，阳下入地，阴气始凝。天气渐寒始于霜降。《逸周书·周月》：“秋三月中气：处暑、秋分、霜降。”
        </p>
        </div>
    </div>
  );
}
