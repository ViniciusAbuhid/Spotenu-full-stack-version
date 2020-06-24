const initialState = {
    bands: []
}

export const bands = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_BANDS':
            return {
                ...state,
                bands: action.payload.bands
            }
        default:
            return state
    }
}