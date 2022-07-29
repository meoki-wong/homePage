

export type SelectItem = {
    id: number,
    userName: string
}

export interface SendMsgInfo {
    userId: number,
    friendId: number,
    sendMsg: string
}

// 聊天用户头像
export interface FriendUserInfo {
    headerImg: string
}

// 存储的单条聊天记录
export interface ChatItem {
    friendEnd: string,
    userEnd: string
}

// 获取聊天记录自己  用户的信息
export interface SearchMsgInfo {
    friendId: number,
    userId: number
}


