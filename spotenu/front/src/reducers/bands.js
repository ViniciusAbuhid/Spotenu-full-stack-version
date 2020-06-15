const initialState = {
    newBands: [{
        name: 'banda1',
        nickname: 'banda1',
        email: 'banda1@email.com',
        description: 'somos uma banda muito massa!'
    }]
}

export const bands = (state = initialState, action)=>{
    switch(action.type){
        case action.type = 'SHOW_ALBUNS':
        return {
            ...state,
            albuns: action.type.payload
        }
        default:
            return state
    }
}