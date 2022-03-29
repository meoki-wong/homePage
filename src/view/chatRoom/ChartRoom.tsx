import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useStore } from 'react-redux';

export default function ChartRoom() {
    let [initSocket, setInitSocket] = useState(Object)
    let [msgBox, setMsgBox] = useState(Array)
    let initChat = ()=>{
        let socket;
        let messageBox: any = [];
		// if (!window.WebSocket) {
		// 	window.WebSocket = window.MozWebSocket;
        // }
        let ta = document.getElementById('responseText') as HTMLInputElement
		if (window.WebSocket) {
			socket = new WebSocket("ws://localhost:10021");
			socket.onmessage = function (event) {
                messageBox.push(event.data)
                setMsgBox(messageBox)
			};
			socket.onopen = function (event) {
				ta.value = "连接开启!";
			};
			socket.onclose = function (event) {
				ta.value = ta.value + "连接被关闭";
			};
		} else {
			alert("你的浏览器不支持 WebSocket！");
        }
        setInitSocket(socket)
    }

    useEffect(()=>{
        initChat()
    }, [])

    let sendMsg = (msg:any) =>{
        console.log('--->msg', initSocket);
        initSocket.send(msg.target.value);
    }
    return (
        <div>
            {msgBox.map((item: any)=>{
                return (<div>{item}</div>)
            })}
            <input type="text" id="responseText"  onChange={(e:any)=>sendMsg(e)}/>
        </div>
    )
}
