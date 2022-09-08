import React from 'react'
import './assets/css/liveStyl.less'
import '../components/liveRtc/basicVideoCall'
export default function LiveCom() {
  return (
    <div className="live-contain">
        <div className="user-live-box"></div>
        <div id='join'>加入</div>
        <div id='leave'>离开</div>
    </div>
  )
}
