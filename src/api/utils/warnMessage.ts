
import {  Marked } from '../type/axios'
/**
 * 
 * @method warnMessage -设置相同响应请求结果只提醒一次
 * @param { Object } err -传入的响应状态  status title
 */

let warnTag: Boolean = false
let marked: Marked = {status: 200, title: null}
let delayTimeOut: number
function warnMessage(err: Marked): Boolean{
    console.log('==测试传参', err);
    clearTimeout(delayTimeOut)
    delayTimeOut = window.setTimeout(()=>{
        warnTag = false
        marked = {status: 200, title: null}
    }, 2000)
    // 第一次响应和第二次响应结果不相同的情况 重新赋值marked return warntag 为false
    if(err.status !== marked.status && err.title !== marked.title){
        marked = {
            status: err.status,
            title: err.title
        }
        warnTag = false
        return warnTag 
    } else {
        // 两次请求结果相同情况下 return warntag 为true
        warnTag = true
        return warnTag
    }
    
    
}

export default warnMessage