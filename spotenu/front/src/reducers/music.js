const initialState = {
    albunsList: [],
    allPlayLists: [],
    allGenres: []
}

export const albuns = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALBUNS':
            return {
                ...state,
                albunsList: action.payload.albunsList
            }
        default:
            return state
    }
}

export const playLists = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PLAYLISTS':
            console.log('oii')
            return {
                ...state,
                allPlayLists: action.payload.playLists
            }
        default:
            return state
    }
}

export const genres = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GENRES':
            console.log('olha o que chega o nos', action.payload.genresList)
            return {
                ...state,
                allGenres: action.payload.genresList
            }
        default:
            return state
    }
}