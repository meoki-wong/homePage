import React from 'react'
import { WechatOutlined, QqOutlined, GithubOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons'
import './Archival.less'
export default function Footer() {

  const goQQ = () => {
    window.location.href = "tencent://message/?uin=1084415961&site=supermeoki.xyz&menu=yes"
  }

  return (
    <div className='archival-container'>
      <ul className='rules-map'>
        <li>用户协议</li>
        <li>营业执照</li>
        <li>隐私政策</li>
        <li>关于我们</li>
        <li>站点地图</li>
        <li>使用指南</li>
        <li>友情链接</li>
        <li>更多文章</li>
      </ul>
      <ul className='rules-service'>
        <li><PhoneOutlined /> 联系手机: 173****8461</li>
        <li><MailOutlined /> 联系邮箱: wangyongfeng1995@163.com</li>
        <li><WechatOutlined /> 微信: 173****8461</li>
        <li onClick={goQQ} className="hover-li"><QqOutlined /> QQ: 1084415961</li>
        <li><GithubOutlined /> git地址: <a href="https://github.com/meoki-wong" target="_blank"> https://github.com/meoki-wong</a></li>
        <li><a href="https://beian.miit.gov.cn"> 京ICP备2022013827号 </a></li>
        <li></li>
      </ul>
    </div>
  )
}
