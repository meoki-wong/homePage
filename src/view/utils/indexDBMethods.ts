import { IndexDBServer } from './indexDBServer'
import { SendMsgInfo,  SearchMsgInfo} from '../chatRoom/type/selectItem';
const db = new IndexDBServer()
// 存储用户发送的信息
export const sendUserMessage = (friendMsg: SendMsgInfo, userMsg: string) => {
  const {sendMsg, friendId, userId} = friendMsg
  db[3214].add({
    friendEnd: sendMsg,
    userEnd: userMsg,
    friendId: friendId,
    userId: userId,
  });
}

// 获取聊天记录信息
export const getUserMessage = async (searchMsgInfo: SearchMsgInfo) => {
  const testFriend = await db[3214].where({
    friendId: searchMsgInfo.friendId,
    userId: searchMsgInfo.userId
  }).toArray().catch(err=>{
    console.log('--err', err)
  })
  console.log('----testFriend,', testFriend)
  return testFriend
}

