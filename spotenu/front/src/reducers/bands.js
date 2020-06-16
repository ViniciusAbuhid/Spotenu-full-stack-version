const initialState = {
    newBands: []
}

export const bands = (state = initialState, action) => {
    console.log('to no reduceraa')
    console.log(action.type)
    console.log(action.payload)
    switch (action.type) {
        case 'SET_NEW_BANDS':
            console.log('to aqui no reducerr na opção certa')
            return {
                ...state,
                newBands: action.payload.newBands
            }
        default:
            console.log('to no defo')
            return state
    }
}