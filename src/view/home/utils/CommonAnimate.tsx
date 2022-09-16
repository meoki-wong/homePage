import React, { useEffect, useImperativeHandle, useState } from "react";
import lottie from "lottie-web";

function CommonAnimate(props: any, ref: any) {
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
    const {
      loop,
      autoplay,
      animationData,
    } = props.configuration;
    const box = document.querySelector(".animate-contain")!;
    const lottieBox = lottie.loadAnimation({
      container: box, // 渲染容器
      renderer: "svg", // 渲染方式 svg|canvas|html
      loop, // 是否循环 true|false|number
      autoplay, // 自动播放 true|false
      animationData, // lottie json文件
    //   path: 'https://hippo-meoki.oss-cn-beijing.aliyuncs.com/homePage/homePage-animate/bomb.json' // 跨域  上线看
    });
    setAnimateBox(lottieBox)
    // 动画结束 隐藏dom  销毁动画并重新创建新的
    lottieBox.addEventListener("complete", ()=>{
        (document.querySelector('.animate-contain') as HTMLElement).style.display = "none"
        lottieBox.destroy()
        initAnimate()
    })
  };
  const play = () => {
    animateBox.play()
  }
  return <div 
  className="animate-contain"
  style={{
    position: 'absolute',
    display: "none"
}}
  ></div>;
}


export default React.forwardRef(CommonAnimate)