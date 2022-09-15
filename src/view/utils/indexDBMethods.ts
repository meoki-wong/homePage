import { IndexDBServer } from './indexDBServer'
import { SendMsgInfo,  SearchMsgInfo} from '../chatRoom/type/selectItem';
const db = new IndexDBServer()
/**
 * 存储用户发送的信息
 * @param { Object } friendMsg -存储的朋友消息
 * @param { string } userMsg -存储当前用户的消息
 */
export const sendUserMessage = (friendMsg: SendMsgInfo, userMsg: string) => {
  const {sendMsg, friendId, userId} = friendMsg
  db[3214].add({
    friendEnd: sendMsg,
    userEnd: userMsg,
    friendId: friendId,
    userId: userId,
  });
}

/**
 *  获取聊天记录信息
 * @param { Object } searchMsgInfo -存放朋友ID和当前用户的ID
 * @returns { Array } -朋友和当前用户的所有聊天记录集合[ ]
 */
export const getUserMessage = async (searchMsgInfo: SearchMsgInfo) => {
  const getMessage = await db[3214].where({
    friendId: searchMsgInfo.friendId,
    userId: searchMsgInfo.userId
  }).toArray().catch(err=>{
    console.log('--err', err)
  })
  return getMessage
}

