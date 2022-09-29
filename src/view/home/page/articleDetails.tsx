import React, {useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import { request } from '@/api/request';
import '../assets/css/articleDetails.less'
import { GetHtml } from '../type/home';
import { Divider } from 'antd'
import Comments from '../components/comments/Comments';
export default function ArticleDetails() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id')
    const [getHtml, setGetHtml] = useState<GetHtml>({
        __html: ""
    })
    useEffect(()=>{
        getArticleDetails()
    }, [])
    const getArticleDetails = async () => {
        let res = await request.post('/getArticleDetails', {id})
        if(res.data.success){
            setGetHtml( {
                __html: res.data.data.articleContent
            })
        }
    }
  return (
    <div className='article-contain'>
        <div dangerouslySetInnerHTML={getHtml}></div>
        <div className='comment-title'>
            <Divider orientation="left">评论</Divider>
        </div>
        <Comments />

    </div>
  )
}
