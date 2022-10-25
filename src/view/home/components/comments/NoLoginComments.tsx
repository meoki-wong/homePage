import React from 'react'
import { Divider } from 'antd'
import { useNavigate } from 'react-router-dom'
import '../../assets/css/NoLoginComments.less'
export default function NoLoginComments() {
    let navigate = useNavigate()
    const goLogin = () => {
        navigate('/login')
    }
  return (
    <div className='no-login'>
        <div className="header-img"></div>
        <div className="inner-box">
            <Divider><span className='login-btn' onClick={goLogin}>登录</span>后分享你的态度</Divider>
        </div>
    </div>
  )
}
