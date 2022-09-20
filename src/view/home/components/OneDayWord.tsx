import React from "react";
import "../assets/css/OneDayWord.less";
import { $ } from "../utils/commonUtils";
import { Input } from 'antd'
export default function OneDayWord() {
  const { TextArea } = Input
  let count = 90;
  const changeWord = () => {
    const wordContain = $(".display-box");
    const editContain = $('.edit-box')
    wordContain.style.transform = `rotateY(${90 + count}deg)`;
    wordContain.style.transition = `transform 1s linear`;
    editContain.style.transform = `rotateY(${90 - count}deg)`
    editContain.style.transition = `transform 1s linear`;
    if(count > 0){
      setTimeout(() => {
        wordContain.style.opacity = '0'
        editContain.style.opacity = '1'
      }, 500);
    } else {
      setTimeout(() => {
        wordContain.style.opacity = '1'
        editContain.style.opacity = '0'
      }, 500);
    }
    count = -count
    console.log('---count', count);
  };
  return (
    <div className="one-day-word" onClick={changeWord}>
      <div className="display-box">
        <h2>一言难尽</h2>
        <p>你看我性感的小屁股~</p>
        <div className="pub-time">——2022.09.19</div>
      </div>
      <div className="edit-box">
        <TextArea 
        className="text-area"
        rows={4} 
        placeholder="最多能 BB 20个字" 
        maxLength={20} 
        autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </div>
    </div>
  );
}
