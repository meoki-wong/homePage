import React, { useEffect, useState } from "react";
import lottie from "lottie-web";
import { $ } from '@/view/home/utils/commonUtils'
import dataJson from '../animateJson/404.json'
function ErrorAnimate(props: any, ref: any) {
  useEffect(() => {
    initAnimate();
  }, []);

  const initAnimate = () => {
    
    const lottieBox = lottie.loadAnimation({
      container: $(`.error-contain`), // 渲染容器
      renderer: "svg", // 渲染方式 svg|canvas|html
      loop: true, // 是否循环 true|false|number
      autoplay: true, // 自动播放 true|false
      animationData: dataJson, // lottie json文件
    //   path: 'https://hippo-meoki.oss-cn-beijing.aliyuncs.com/homePage/homePage-animate/bomb.json' // 跨域  上线看
    });
  };
  return <div 
  className="error-contain"
  style={{
    height: '600px'
  }}
  ></div>;
}


export default React.forwardRef(ErrorAnimate)