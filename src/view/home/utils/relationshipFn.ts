

/** 
 * 
 * @methods 创建炸弹 运动 
 * 
 * */
export const activeBomb = () => {
    console.log('---运动');
}

/**
 * 
 * @methods 获取时间段  计时  
 * @returns  --天(--年)--小时--分钟--秒
 */

export const calcTime = () => {
  const stime = new Date('2019-2-15 00:00:00').getTime()
  const etime = new Date().getTime()
  // 两个时间戳相差的毫秒数
  const usedTime = etime - stime;
  // 计算相差的天数  
  const days = Math.floor(usedTime / (24 * 3600 * 1000));
  // 计算天数后剩余的毫秒数
  const leave1 = usedTime % (24 * 3600 * 1000);  
  // 计算出小时数  
  const hours = Math.floor(leave1 / (3600 * 1000));
  // 计算小时数后剩余的毫秒数
  const leave2 = leave1 % (3600 * 1000);             
  // 计算相差分钟数
  const minutes = Math.floor(leave2 / (60 * 1000));
  const seconds = new Date(usedTime).getSeconds();
  const year: number = new Date(usedTime).getFullYear() - 1970
  const times = `${days}天(${year}年)${hours}小时${minutes}分钟${seconds}秒`
  return times;
}
