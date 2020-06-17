const initialState = {
    albunsList: [],
    allPlayLists: []
}

export const albuns = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALBUNS':
            console.log('to na opção certa', action.payload.albunsList)
            return {
                ...state,
                albunsList: action.payload.albunsList
            }
        default:
            return state
    }
}

export const playLists = (state = initialState, action) => {
    console.log('reducera é nois')
    switch (action.type) {
        case 'SET_PLAYLISTS':
            return {
                ...state,
                allPlayLists: action.payload.playLists
            }
        default:
            return state
    }
}