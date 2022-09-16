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
    });
    setAnimateBox(lottieBox)
  };
  const play = () => {
    animateBox.play()
  }
  return <div className="animate-contain">commonAnimate</div>;
}


export default React.forwardRef(CommonAnimate)