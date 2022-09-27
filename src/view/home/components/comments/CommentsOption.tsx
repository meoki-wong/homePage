import { Avatar, Comment, Form, Tooltip, Input, Button, message } from 'antd';
import React, { createElement, useState } from 'react'
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { request } from '@/api/request';
import { useSearchParams } from 'react-router-dom';
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
  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
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
  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };
  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to" onClick={()=>setShowReply(!showReply)}><MessageOutlined /></span>,
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
      author={<a>Han Solo</a>}
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
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
