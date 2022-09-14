import React, { useEffect } from 'react'
import { HeartOutlined } from '@ant-design/icons'
import "../assets/css/Relationship.less"

export default function Relationship() {
  const [dateTime]
  useEffect(()=>{
    let year: number = new Date(new Date() - new Date('2018-1-1 00:00:00')).getFullYear() - 1970
    let month: number = new Date(new Date() - new Date('2018-1-1 00:00:00')).getMonth() - 1
  }, [])
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
        在一起时间：2022-10-11 12:22:12
      </div>
    </div>
  )
}
