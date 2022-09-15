import React, { useEffect, useState, memo, useRef } from 'react'
import { HeartOutlined } from '@ant-design/icons'
import { calcTime, activeBomb } from '../utils/relationshipFn'
import { DateTime } from '../type/home'
import "../assets/css/Relationship.less"

function Relationship() {
  const bombRef = useRef<any>()
  useEffect(()=>{
    setInterval(()=>{
      calcTime()
    }, 1000)
  }, [])
 
// 炸弹
const clickBomb = () => {
  console.log('---点击炸弹', bombRef);
}


  return (
    <div className='relation-contain'>
      <div className="avator-box">
        <div className="male avator">
          <img src="https://hippo-meoki.oss-cn-beijing.aliyuncs.com/homePage-image/male.jpg" alt="" />
        </div>
        <div className="relaship-line">
          -----<HeartOutlined />-----
        </div>
        <div className="female avator">
          <img src="https://hippo-meoki.oss-cn-beijing.aliyuncs.com/homePage-image/female.jpg" alt="" />
        </div>
      </div>
      <div className="time-box">
        在一起时间：{calcTime()}
      </div>
      <div className="opt-box">
        <span className='bomb' ref={bombRef}><i onClick={clickBomb} className="iconfont icon-zhadan"></i></span>
      </div>
    </div>
  )
}



export default memo(Relationship)
