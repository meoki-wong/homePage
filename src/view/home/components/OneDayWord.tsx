import React, { useEffect, useState } from "react";
import "../assets/css/OneDayWord.less";
import { $ } from "../utils/commonUtils";
import { changeWordBoard } from '../utils/oneWordFn'
import { Input, message } from 'antd'
import { request } from "@/api/request";
export default function OneDayWord() {
  const { TextArea } = Input
  const [inputVal, setInputVal] = useState<string>('')
  const [showInfo, setShowInfo] = useState<any>({})
  useEffect(()=>{
    getOneWord()
  }, [])
  const changeWord = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
    setInputVal(e.target.value)
  }
  const getOneWord = async () => {
    let res = await request.post('/getOneWord', {
      UserId: JSON.parse(localStorage.getItem('userInfo')!).id
    })
    setShowInfo(res.data.data)
  }
  const sendOneWord = async () => {
    if(!inputVal){
      message.warn('发布内容禁止为空')
      return
    }
    let res = await request.post('/sendOneWord', {
      publicWord: inputVal,
      UserId: JSON.parse(localStorage.getItem('userInfo')!).id
    })
    if(res.data.success){
      message.success('发布成功')
      changeWordBoard()
      setInputVal('')
    }
  }
  const cancelOneWord = () => {
    changeWordBoard()
    setInputVal('')
  }
  return (
    <div className="one-day-word">
      <div className="display-box">
        <h2>一言难尽</h2>
        <p>{showInfo.publicWord}</p>
        <div className="opt-box">
          <div className="send-btn">
            <i className="iconfont icon-send-s" onClick={changeWordBoard}></i>
          </div>
          <div className="pub-time">——{showInfo.createTime}</div>
          
        </div>
      </div>
      <div className="edit-box">
        <TextArea 
        value={inputVal}
        status={inputVal? '' : 'warning'}
        onChange={(e)=>changeWord(e)}
        className="text-area"
        rows={4} 
        placeholder="最多能 BB 20个字" 
        maxLength={20} 
        autoSize={{ minRows: 3, maxRows: 5 }}
        />
        <div className="send-opt-box">
        <div className="send-btn send-confirm" onClick={sendOneWord}>发送</div>
        <div className="send-btn send-cancel" onClick={cancelOneWord}>取消</div>
        </div>
      </div>
    </div>
  );
}
