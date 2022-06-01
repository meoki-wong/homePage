import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './friendList.module.scss'
import { request } from '../../../api/request'
import { AxiosResponse } from 'axios'
// import axios from 'axios'
type FriendList = Array<object>
export default function FriendList() {
    let navigate = useNavigate()
    let [friendList, setFriendList] = useState<FriendList>()
    useEffect(()=>{
      // getFirends
      request.post('/getFirends', {
        userId: JSON.parse(localStorage.getItem('userInfo')!).id
      }).then((res)=>{
        console.log('----res相关参数', res);
        setFriendList(res.data.list)
      })
    }, [])

    const chatFriends = (id: number)=>{
      navigate(`/dataAdmin/ChartRoom/${id}`)
    }
  return (
    <div className="friend-list">
    <ul>
      {friendList?.map((item: any)=>{
        return (<li key={item.id} className="contant-item" onClick={()=>chatFriends(item.id)}>
        <div className="item-header">
          <img src={require('../../assets/image/user_header.jpeg')} alt="" />
        </div>
        <div className="item-desc">
          <div className="name">
            {item.userName}
          </div>
          <div className="desc">
            {'你夸撒大声地'}
          </div>
        </div>
      </li>)
      })}
    </ul>
  </div>
  )
}
