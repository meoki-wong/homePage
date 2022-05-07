import React from 'react'
import { useNavigate } from 'react-router-dom'
import './friendList.module.scss'
export default function FriendList() {
    let navigate = useNavigate()
    const chatFriends = ()=>{
        navigate('/home/ChartRoom/11')
      }

  return (
    <div className="friend-list">
    <ul>
      <li className="contant-item" onClick={chatFriends}>
        <div className="item-header">
          <img src={require('../../assets/image/user_header.jpeg')} alt="" />
        </div>
        <div className="item-desc">
          <div className="name">
            {'我是老牛逼'}
          </div>
          <div className="desc">
            {'你夸撒大声地'}
          </div>
        </div>
      </li>
    </ul>
  </div>
  )
}
