import React from "react";
import "../assets/css/OneDayWord.less";
import { $ } from "../utils/commonUtils";
export default function OneDayWord() {
  let count = 1;
  const changeWord = () => {
    const wordContain = $(".display-box");
    const editContain = $('.edit-box')
    wordContain.style.transform = `rotateY(${180 * count}deg)`;
    wordContain.style.transition = `transform 1s linear`;
    editContain.style.transform = `rotateY(${-180 * count}deg)`
    editContain.style.transition = `transform 1s linear`;
    if(count % 2 !== 0){
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
    ++count;
  };
  return (
    <div className="one-day-word" onClick={changeWord}>
      <div className="display-box">
        <h2>一言难尽</h2>
        <p>你看我性感的小屁股~</p>
        <div className="pub-time">——2022.09.10</div>
      </div>
      <div className="edit-box">iidki</div>
    </div>
  );
}
