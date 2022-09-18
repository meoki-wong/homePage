
import { request } from "@/api/request";

type ViewsParams = {
    [key in string]: string | number | unknown // 不存在unknown 后期改造完  删除
}

/**
 * 获取网站访问量
 * @param { string } type 接口方法名字
 * @param { object } params 接口传参
 */

export const getWebViews = (type: string, params: ViewsParams) => {
    request.post(`/getFullViews`, params).catch(err=>{
        console.log('服务错误err', err);
    })
}