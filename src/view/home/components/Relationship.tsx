import React, { useEffect, useState, memo, useRef } from 'react'
import { HeartOutlined } from '@ant-design/icons'
import { calcTime, activeBomb } from '../utils/relationshipFn'
import { DateTime } from '../type/home'
import CommonAnimate from '../utils/CommonAnimate'
import lottieJson from '../assets/animateJson/bomb.json'
import "../assets/css/Relationship.less"

function Relationship() {
  const bombRef = useRef<any>()
  const [dateTime, setDateTime] = useState<string>("")
  // const [showBomb, setShowBomb] = useState<boolean>(false) // 显隐 炸弹
  useEffect(()=>{
    setInterval(()=>{
      setDateTime(calcTime())
    }, 1000)
  }, [])
 let configuration = {
  animationData: lottieJson, 
  loop: false,
  autoplay: false
}
// 创建炸弹  轨迹
const clickBomb = () => {
  const ball = document.createElement('div')
  ball.setAttribute('class', 'iconfont icon-zhadan test-ball')
  document.querySelector('.bomb')?.appendChild(ball)
  setTimeout(() => {
    (document.querySelector('.animate-contain') as HTMLElement).style.display = 'block'
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
          -----<HeartOutlined />-----
        </div>
        <div className="female avator">
          <CommonAnimate  configuration={configuration} ref={bombRef}/>
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
