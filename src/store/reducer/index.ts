

const nameInitialState = {
    value: 1,
    type: 1
}
export const reactReducer = (state:any = nameInitialState, action: any) => {
    switch (action.type) {
        case 'action_type_1':
            action.value ++
             return Object.assign({}, state, action)
        case 'action_type_2':
             state.value --
             return state
        default:
            return state
    }
}