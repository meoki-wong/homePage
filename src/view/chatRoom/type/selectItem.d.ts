

export interface SelectItem {
    id: number, // id
    userName: string, // 名字
    headerImg: string // 头像
}
export interface SelectGroupItem {
    groupId: number, // 群id
    groupName: string, // 群名称
    headerImg: string, // 群头像
}

export interface SendMsgInfo {
    userId: number,
    friendId: number,
    sendMsg: string
}

export interface sendGroupMsgInfo {
    groupId: number,
    sendMsg: string
}

// 聊天用户头像
export interface FriendUserInfo {
    headerImg: string
}

// 存储的单条聊天记录
export interface ChatItem {
    friendEnd: string,
    userEnd: string,
    friendId: number,
    userId: number
}

// 获取聊天记录自己  用户的信息
export interface SearchMsgInfo {
    friendId: number,
    userId: number
}


