import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../assets/css/NoLoginComments.less'
export default function NoLoginComments() {
    let navigate = useNavigate()
    const goLogin = () => {
        navigate('/blog/login')
    }
  return (
    <div className='no-login'>
        <div className="header-img"></div>
        <div className="inner-box">
            <a href="javascript:;" onClick={goLogin}>登录</a>后分享你的思考
        </div>
    </div>
  )
}
