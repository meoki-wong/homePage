import { $ } from './commonUtils'


let count: number = 90; // 反转角度
const rotateTime: number = 1 //反转时间
/**
 * 点击反转角度
 * @param { number } count 反转角度
 */

export const changeWordBoard = () => {
    const wordContain = $(".display-box").style;
    const editContain = $('.edit-box').style
    wordContain.transform = `rotateY(${90 + count}deg)`;
    wordContain.transition = `transform ${rotateTime}s linear`;
    editContain.zIndex = '10'
    editContain.transform = `rotateY(${90 - count}deg)`
    editContain.transition = `transform ${rotateTime}s linear`;
    if(count > 0){
      setTimeout(() => {
        wordContain.opacity = '0'
        editContain.opacity = '1'
      }, rotateTime/2 * 1000);
    } else {
      setTimeout(() => {
        wordContain.opacity = '1'
        editContain.opacity = '0'
        editContain.zIndex = '-1'
      }, rotateTime/2 * 1000);
    }
    count = -count
  };