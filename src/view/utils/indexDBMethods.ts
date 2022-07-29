import { IndexDBServer } from './indexDBServer'
import { SendMsgInfo,  SearchMsgInfo} from '../chatRoom/interface/SelectItem';
const db = new IndexDBServer()
// 存储用户发送的信息
export const sendUserMessage = (friendMsg: SendMsgInfo, userMsg: string) => {
  console.log('-----user相关内容', friendMsg)
  db[3214].add({
    // msgIndex: new Date().getTime(),
    friendEnd: friendMsg.sendMsg,
    userEnd: userMsg,
    friendId: friendMsg.friendId,
    userId: friendMsg.userId
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

