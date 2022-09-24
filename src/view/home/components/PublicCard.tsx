import { request } from '@/api/request'
import React, { useEffect } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import "../assets/css/PublicCard.less"
export default function PublicCard(props: any) {
  const navigate = useNavigate()
  let { publicData } = props
  useEffect(()=>{
  }, [])
  const goDetails = () => {
    const params = {
      // 传articleId
      id: publicData.id,
    };
    navigate({
      pathname: "/blog/articleDetail",
      search: `${createSearchParams(params)}`,
    });
  };
  return (
    <div className='pub-contain'>
        <div className="master-line">
            <div className="random-line"></div>
            <div className="circle-box">
                <div className="circle-solid"></div>
            </div>
        </div>
        <div className="pub-inner-box" onClick={goDetails}>
          <div className='title'>{publicData.title}</div>
          <div className="view-area">
            <div></div>
            <div className='time'>发布时间:{publicData.createTime}</div>
          </div>
          <p><hr /></p>
          <div className="img-area">
          <img src="https://hippo-meoki.oss-cn-beijing.aliyuncs.com/homePage/homePage-image/home_index_2.jpg" alt="文章图片" />
          </div>
          <p className='introduce'>{publicData.introduce}</p>
        </div>
    </div>
  )
}
