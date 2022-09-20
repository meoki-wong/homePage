import React, { useEffect, useState } from "react";
import lottie from "lottie-web";
import { $ } from "../utils/commonUtils";
function StaticAnimate(props: any) {
    const { loop, autoplay, animationData, contain } = props.configuration;
  const [animateBox, setAnimateBox] = useState<any>();
  useEffect(() => {
    initAnimate();
  }, []);

  const initAnimate = () => {
    
    const lottieBox = lottie.loadAnimation({
      container: $(`.${contain}`), // 渲染容器
      renderer: "svg", // 渲染方式 svg|canvas|html
      loop, // 是否循环 true|false|number
      autoplay, // 自动播放 true|false
      animationData, // lottie json文件
      //   path: 'https://hippo-meoki.oss-cn-beijing.aliyuncs.com/homePage/homePage-animate/bomb.json' // 跨域  上线看
    });
    lottieBox.play();
  };
  return <div className={contain}></div>;
}

export default StaticAnimate;
