import React, {useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import { request } from '@/api/request';
import '../assets/css/articleDetails.less'
import { GetHtml, artcileInfo } from '../type/home';
import Comments from '../components/comments/Comments';
export default function ArticleDetails() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id')
    const [getHtml, setGetHtml] = useState<GetHtml>({
        __html: ""
    })
    const [articleData, setArticleData] = useState<artcileInfo>()
    useEffect(()=>{
        getArticleDetails()
    }, [])
    const getArticleDetails = async () => {
        let res = await request.post('/getArticleDetails', {id})
        if(res.data.success){
            let { data } = res.data
            setArticleData(data)
            setGetHtml( {
                __html: data.articleContent
            })
        }
    }
  return (
    <div className='article-contain'>
        <p className='title'>{articleData?.title}</p>
        <p className='show-option'>
            <span className='time'>发布时间：{articleData?.createdAt}</span></p>
        <hr />
        <div dangerouslySetInnerHTML={getHtml}></div>
        <div className="opt-area">
            <i className='iconfont icon-dashang'></i>
            <i className='iconfont icon-dianzan'></i>
            <i className='iconfont icon-shoucang'></i>
        </div>
        <Comments />

    </div>
  )
}
