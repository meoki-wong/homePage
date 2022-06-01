import io from 'socket.io-client'



export default class Socket {

    socket: any
    constructor() {
        this.initSocket()
        this.receiveMsg() // 监听接收服务端返回的消息数据
    }

    initSocket() {
        this.socket = process.env.NODE_ENV == 'production'?io('wss://supermeoki.xyz'): io('ws://localhost:10021')
        // this.socket =  io('ws://localhost:10020/socket.io')
        // this.socket = io('wss://supermeoki.xyz/socket.io')
        console.log('创建构造函数', this.socket)
    }

    sendMsg(msg: string | number) {
        this.socket.emit('sendMsg', {
            userId: localStorage.getItem('userId'),
            message: msg
        })
    }

    receiveMsg() {
        this.socket.on('receiveMsg', (msg: any) => {
            let htmlCon = document.createElement("div")
            htmlCon.setAttribute('class', 'other-frame')
            htmlCon.innerHTML = `
            <img src='${require('../assets/image/login_bg.png')}' alt="" />
            <p class="inner-msg">${msg.message}</p>`

            document.getElementsByClassName('msg-area')[0].append(
                htmlCon
            )
        })
    }


}