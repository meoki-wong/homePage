import { IndexDBServer } from './indexDBServer'
const db = new IndexDBServer()

// 存储用户发送的信息
export const sendUserMessage = (friendMsg: string, userMsg: string) => {
  db[3214].add({
    // msgIndex: new Date().getTime(),
    friendEnd: friendMsg,
    userEnd: userMsg
  });
}

// 获取聊天记录信息
export const getUserMessage = async () => {
  const testFriend = await db[3214].toArray()
  return testFriend
}

