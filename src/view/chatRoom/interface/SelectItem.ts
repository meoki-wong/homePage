

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

export interface chatItem {
    friendEnd: string,
    userEnd: string
}



