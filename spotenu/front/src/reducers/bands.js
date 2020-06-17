const initialState = {
    newBands: []
}

export const bands = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NEW_BANDS':
            return {
                ...state,
                newBands: action.payload.newBands
            }
        default:
            return state
    }
}