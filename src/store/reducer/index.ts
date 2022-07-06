

const nameInitialState = {
    value: 1,
    type: 1
}
// 获取全局提示消息数量
export const reactReducer = (state: any = nameInitialState, action: any) => {
    console.log('----reducer', state, action)
    switch (action.type) {
        case 'action_type_1':
            action.value++
            return Object.assign({}, state, action)
        case 'action_type_2':
            state.value--
            return state
        default:
            return state
    }
}
// 获取  记录 全局的用户数据
export const userInfoReducer = (state: any = {}, action: any) => {
    switch (action.type) {
        case 'userInfo':
            return Object.assign({}, state, action)
        default:
            return {}
    }

}