import React, {useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import { request } from '@/api/request';
import '../assets/css/articleDetails.less'
import { GetHtml } from '../type/home';
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
    </div>
  )
}
