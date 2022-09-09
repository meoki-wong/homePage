import React from 'react'
import './Archival.less'
export default function Footer() {
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
        <li><a href="https://beian.miit.gov.cn">京ICP备2022013827号</a></li>
        <li>公司座机：暂无</li>
        <li>举报邮箱： 暂无</li>
        <li></li>
      </ul>
    </div>
  )
}
