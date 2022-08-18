
import { FriendUserInfo } from '../type/selectItem' // 测试类型

// 好友聊天框
export const htmlFn = (info: FriendUserInfo, msg: string) => {
    let htmlCon = document.createElement("div")
    htmlCon.setAttribute('class', 'other-frame')
    htmlCon.innerHTML = `
            <img src='${info.headerImg}' alt="" />
            <p class="inner-msg">${msg}</p>`

    document.getElementsByClassName('msg-area')[0].append(
        htmlCon
    )
    const areaHeight = document.querySelector('.msg-area') as HTMLElement
    areaHeight.scrollTo(0, areaHeight.scrollHeight); // 每次发送消息   使消息都处在底部
}

// 自己聊天框
export const htmlUserFn = (content: string, headerImgs: string) => {
    let selfHtml = document.createElement("div");
    selfHtml.setAttribute("class", "self-frame");
    selfHtml.innerHTML = `
          <p class="inner-msg">${content}</p>
          <img src="${headerImgs}" alt="" />`;
    document.getElementsByClassName("msg-area")[0].append(selfHtml);
    const areaHeight = document.querySelector(".msg-area") as HTMLElement;
    areaHeight.scrollTo(0, areaHeight.scrollHeight);
}

