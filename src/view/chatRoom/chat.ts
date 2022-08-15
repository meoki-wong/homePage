import io from 'socket.io-client'
import { SendMsgInfo, sendGroupMsgInfo } from './type/selectItem'
import Store from '../../store/store/index'
import { request } from '@/api/request'
import { sendUserMessage } from '../utils/indexDBMethods'
import { htmlFn } from './utils/optHtmlFn'
import { FriendUserInfo } from './type/selectItem'
export default class Socket {

    socket: any
    socketId: number = 0
    declare friendUserInfo: FriendUserInfo
    constructor() {
        this.initSocket()
        // this.receiveMsg() // 监听接收服务端返回的消息数据
        this.receiveSingleMsg() // 单聊消息
    }



    initSocket() {
        let options = {
            extraHeaders: {
                userId: localStorage.getItem('token') ?
                    JSON.parse(localStorage.getItem('userInfo')!).id : ''
            }
        }
        this.socket = process.env.NODE_ENV === 'production' ?
            io('wss://supermeoki.xyz', options) :
            io('ws://localhost:10021', options)
    }
    socketIO() { return this.socket }
    sendMsg(msgInfo: SendMsgInfo) {
        this.socket.emit('sendMsg', msgInfo.userId, msgInfo.friendId, msgInfo)
    }
    // 发送单聊信息
    sendSingleMsg(msgInfo: SendMsgInfo) {
        this.socket.emit('sendSingleMsg', msgInfo.userId, msgInfo.friendId, msgInfo)
    }
    // 发送群聊消息
    sendGroupMsg(msgInfo: sendGroupMsgInfo){
        this.socket.emit('sendGroupMsg', msgInfo)
    }
    // 接收群聊消息
    receiveGroupMsg(){

    }
    // 接收单聊消息
    receiveSingleMsg() {
        this.socket.on('singleMsg', (msg: SendMsgInfo) => {
            sendUserMessage({
                friendId: msg.userId,
                userId: msg.friendId,
                sendMsg: msg.sendMsg
            }, '')
            Store.dispatch({
                type: 'getSingleMsg',
                value: msg.userId
            })
            // msgInfo.friendId == msg.userId  服务端判断
            if (this.socketId === msg.userId) { // 同一环境下 不接受  只接收相同id消息
                htmlFn(this.friendUserInfo, msg.sendMsg)
            }
        })
    }
    
    // 加入群组房间
    joinGroup(userId: number){
        this.socket.emit('joinGroup', userId)
    }
    // 进入socket
    joinRoom(item: any) {
        this.socket.emit('join', item)
    }
    // 获取当前的id
    getSocketId(sendId: number) {
        this.socketId = sendId
        console.log('sendIdsendIdsendId', sendId, this.socketId)
        request.post('/getUserInfo', {
            userId: sendId
        }).then(res => {
            this.friendUserInfo = res.data.data
            console.log('res.data.data', this.friendUserInfo, res.data)
        })
        console.log('----触发', this.socketId)
    }
    receiveMsg() {
        this.socket.on('receiveMsg', (msg: any) => {
            htmlFn(this.friendUserInfo, msg)
        })
    }
    // 接收添加朋友消息
    getApplyMsg() {
        this.socket.on('sendApply', (msg: number | string) => {
            console.log('收到一条好友申请')
            Store.dispatch({
                type: 'action_type_1',
                value: 0
            })

        })
    }

    logout() {
        this.socket.emit('logout', JSON.parse(localStorage.getItem('userInfo')!).id)
    }
    quitItem() {
        this.socket.on('quitItem', (msg: any) => {
            console.log('-----msg退出登录', msg)
        })
    }


}


