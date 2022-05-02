import io from 'socket.io-client'



export default class Socket {

    socket: any
    msgList: Array<string | number> = []
    self: any
    constructor(_this: any){
        this.initSocket()
        this.receiveMsg(_this) // 监听接收服务端返回的消息数据
        this.self = _this
    }

    initSocket(){
        this.socket = io('ws://localhost:10021')
        console.log('创建构造函数', this.socket)
    }

    sendMsg(msg: string | number){
        this.socket.emit('sendMsg', {
            userId: localStorage.getItem('userId'),
            message: msg
        })
    }

    receiveMsg(_this: any){
        this.socket.on('receiveMsg', (msg: string | number)=>{
            _this.setState({msgBox: []})
            this.msgList.push(msg)
            _this.setState({msgBox: this.msgList})
        })
    }



}