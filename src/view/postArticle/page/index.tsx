import React, { useState, useRef } from 'react'
import { Input, message } from 'antd'
import MyEditor from '@/view/utils/editor'
import UploadImg from '@/view/components/upload/UploadImg'
import '../assets/css/index.less'
import { useNavigate} from 'react-router-dom'
import { request } from '@/api/request'

type ImgType = {
    response: {
      data: string;
    };
  };

export default function PostArticle() {
    const navigate = useNavigate()
    const textRef = useRef<any>(null)
    const { TextArea } = Input
    const [title, setTitle] = useState<string>('')
    const [imgUrl, setImgUrl] = useState<ImgType>() // 插图 图片地址  imgUrl?.response?.data
    
      const getImgUrl = (url: ImgType) => {
        setImgUrl(url);
      };
      let uploadParams = {
        maxNum: 1,
        getImgUrl: getImgUrl,
        coverImg: null,
      };
    const onPublish = async () =>{
        const { editor } = textRef.current
        if(editor.isEmpty()){
            message.warn('文章内容不能为空')
            return
        }
        if(!title){
            message.warn('文章标题不能为空')
            return
        }
        let res = await request.post('/setArticle', {
            title,
            articleContent: editor.getHtml(),
            titleImg: imgUrl?.response.data,
            UserId: JSON.parse(localStorage.getItem('userInfo')!).id,
            introduce: editor.getText().slice(0, 70).trim()
        })
        if(res?.data.success){
            message.success('发布成功')
            setTitle('')
            editor.clear()
        }

    }
    const onCancel = () => {
        navigate('/')
    }
  return (
    <div className='editor-contain'>
        <div className="title-box">
            <p className='title'>题目</p>
            <p className='text-box'>
                <TextArea 
                    maxLength={50} 
                    value={title}
                    status={title? '': "warning"}
                    showCount
                    placeholder='请输入文章题目内容 限制50字'
                    onChange={e=> setTitle(e.target.value)}
                    autoSize={{ minRows: 1, maxRows: 6 }}
                />
            </p>
        </div>
        <div className='img-box'>
                <span>文章插图</span>
                <UploadImg {...uploadParams}/>
            </div>
        <MyEditor ref={textRef}/>
        <div className="opt-box">
            <div className="publish" onClick={onPublish}>发布</div>
            <div className="cancel" onClick={onCancel}>返回</div>
        </div>
    </div>
  )
}
