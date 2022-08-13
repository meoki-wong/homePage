
export interface FriendList { // 好友列表
    UserId?: number,
    userName?: string,
    headerImg?: string,
    id?: number,
    user_number?: number,
    userOnlineStatus?: {
        userStatus: number
    },
    selfIntroduce?: string
}