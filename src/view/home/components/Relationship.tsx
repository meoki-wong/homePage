import React, { useEffect, useState, memo, useRef } from 'react'
import { HeartOutlined } from '@ant-design/icons'
import { calcTime } from '../utils/relationshipFn'
import { $ } from '../utils/commonUtils'
import { DateTime } from '../type/home'
import CommonAnimate from './CommonAnimate'
import HeartAnimate from './heartAnimate'
import lottieJson from '../assets/animateJson/bomb.json'
import heartJson from '../assets/animateJson/heart.json'
import heartLineJson from '../assets/animateJson/heartbeat.json'
import "../assets/css/Relationship.less"
function Relationship() {
  const bombRef = useRef<any>()
  const [dateTime, setDateTime] = useState<string>("")
  useEffect(()=>{
    setInterval(()=>{
      setDateTime(calcTime())
    }, 1000)
  }, [])
 let bombConfig = {
  animationData: lottieJson, 
  loop: false,
  autoplay: false,
}
const heartConfig = {
  animationData: heartJson, 
  loop: true,
  autoplay: true,
  contain: 'heart-contain'
}
const heartLeftLineConfig = {
  animationData: heartLineJson, 
  loop: true,
  autoplay: true,
  contain: 'heart-left-line-contain'
}
const heartRightLineConfig = {
  animationData: heartLineJson, 
  loop: true,
  autoplay: true,
  contain: 'heart-right-line-contain'
}
// 创建炸弹  轨迹
const clickBomb = () => {
  const ball = document.createElement('div')
  ball.setAttribute('class', 'iconfont icon-zhadan test-ball')
  document.querySelector('.bomb')?.appendChild(ball)
  setTimeout(() => {
    $('.animate-contain').style.display = 'block' // 炸弹显示
    document.querySelector('.bomb')?.removeChild(ball)
    bombRef.current.play()
  }, 500);
}


  return (
    <div className='relation-contain'>
      <div className="avator-box">
        <div className="male avator">
          <img src="https://hippo-meoki.oss-cn-beijing.aliyuncs.com/homePage/homePage-image/male.jpg" alt="" />
        </div>
        <div className="relaship-line">
        <HeartAnimate configuration={heartLeftLineConfig} />
        <HeartAnimate configuration={heartConfig} />
        <HeartAnimate configuration={heartRightLineConfig} />
        </div>
        <div className="female avator">
          <CommonAnimate  configuration={bombConfig} ref={bombRef}/>
          <img src="https://hippo-meoki.oss-cn-beijing.aliyuncs.com/homePage/homePage-image/female.jpg" alt="" />
        </div>
      </div>
      <div className="time-box">
        在一起时间：{dateTime}
      </div>
      <div className="opt-box">
        <span className='bomb'><i onClick={clickBomb} className="iconfont icon-zhadan"></i></span>
      </div>
    </div>
  )
}



export default memo(Relationship)
