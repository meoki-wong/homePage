import { Avatar, Comment, Form, Tooltip, Input, Button, message } from 'antd';
import React, { createElement, useState } from 'react'
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { request } from '@/api/request';
import { useSearchParams } from 'react-router-dom';
import '../../assets/css/CommentsOption.less'
import { connect } from 'react-redux';
export default function CommentsOption(props: any) {
  const { items, children } = props
  const {TextArea} = Input
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<string | null>(null);
  const [showReply, setShowReply] = useState<boolean>(false)
  const [replyVal, setReplyVal] = useState<string>('')
  const like = async () => {
    let res = await request.post('/setLikes', {id: items.id, type: 'like'})
    if(res.data.success){
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    }
  };

  const dislike = async () => {
    let res = await request.post('/setLikes', {id: items.id, type: 'dislike'})
    if(res.data.success){
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    }
  };
  const Editor = ({ onChange, onSubmit, submitting, value }: any) => (
    <>
      <Form.Item>
        <TextArea autoSize={{ minRows: 1, maxRows: 6 }} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          回复评论
        </Button>
      </Form.Item>
    </>
  );
  const actions = [
    <Tooltip key="comment-basic-like" title="喜欢">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="不喜欢">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-reply-to" title="评论">
        <span onClick={()=>setShowReply(!showReply)}><MessageOutlined /></span>,
    </Tooltip> 
  ];
  const handleSubmit = async () => {
    try{
        let res = await request.post('/setCommotReply', {
            content: replyVal,
            commit_id: articleId
          })
          if(res.data.success){
            message.success('回复成功')
            setShowReply(false)
          }
    }catch(err){
        console.log(err);
    }
  }
  return (
    <Comment
      actions={actions}
      author={<a>{items.author}</a>}
      avatar={<Avatar src={items.avatar} alt={items.author} />}
      content={
        items.content
      }
    >
        {showReply && <Editor 
        onchange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>{setReplyVal(e.target.value)}}
        onSubmit={handleSubmit}
        />}
        {children}
    </Comment>
  )
}
