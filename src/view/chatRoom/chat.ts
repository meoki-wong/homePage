import io from 'socket.io-client'



export default class Socket {

    socket: any
    msgList: Array<string | number> = []
    setMsg: any
    constructor(setMsgList: any) {
        this.setMsg = setMsgList
        this.initSocket()
        this.receiveMsg() // 监听接收服务端返回的消息数据
    }

    initSocket() {
        this.socket = io('ws://localhost:10021')
        console.log('创建构造函数', this.socket)
    }

    sendMsg(msg: string | number) {
        this.socket.emit('sendMsg', {
            userId: localStorage.getItem('userId'),
            message: msg
        })
    }

    receiveMsg() {
        this.socket.on('receiveMsg', (msg: string | number) => {
            this.msgList.push(msg)
            this.setMsg(this.msgList)
            console.log('---触发内容-----',)
        })
    }


}