const initialState = {
    albuns: []
}

export const albuns = (state = initialState, action)=>{
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