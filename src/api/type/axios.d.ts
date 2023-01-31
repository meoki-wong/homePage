export type UserInfo = {
    id: string | number
}
/**
 * 拦截相同接口返回提醒  失败情况下
 * @param { number } status - 接口返回状态参数 301 | 404 | 400 ...
 * @param { string } title - 接口返回描述
 */
export type Marked = {
    status: number | null, 
    title: string | null
}


