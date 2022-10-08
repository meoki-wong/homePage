import React, { useEffect, useImperativeHandle, useState } from "react";
import lottie from "lottie-web";
import { $ } from '../utils/commonUtils'
function CommonAnimate(props: any, ref: any) {
  const {
    loop,
    autoplay,
    animationData,
    contain
  } = props.configuration;
  const [animateBox, setAnimateBox] = useState<any>();
  useImperativeHandle(ref, ()=>{
    return {
        play
    }
  })
  useEffect(() => {
    initAnimate();
  }, []);

  const initAnimate = () => {
    
    const lottieBox = lottie.loadAnimation({
      container: $(`.blob-contain`), // 渲染容器
      renderer: "svg", // 渲染方式 svg|canvas|html
      loop, // 是否循环 true|false|number
      autoplay, // 自动播放 true|false
      animationData, // lottie json文件
    //   path: 'https://hippo-meoki.oss-cn-beijing.aliyuncs.com/homePage/homePage-animate/bomb.json' // 跨域  上线看
    });
    setAnimateBox(lottieBox)
    // 动画结束 隐藏dom  销毁动画并重新创建新的
    lottieBox.addEventListener("complete", ()=>{
        $('.blob-contain').style.display = "none"
        lottieBox.destroy()
        // initAnimate()
    })
  };
  const play = () => {
    initAnimate()
    $(".blob-contain").style.display = "block"; // 炸弹显示
    animateBox.play()
  }
  return <div 
  className="blob-contain"
  style={{
    position: 'absolute',
    display: "none"
}}
  ></div>;
}


export default React.forwardRef(CommonAnimate)