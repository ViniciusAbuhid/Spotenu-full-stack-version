const initialState = {
    albuns: []
}

export const albuns = (state = initialState, action) => {
    switch (action.type) {
        case 'oi':
            return {
                ...state,
                albuns: action.type.payload
            }
        default:
            return state
    }
}