const initialState = {
    albunsList: [],
    allPlayLists: [],
    allGenres: [],
    albumMusics: []
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
            return {
                ...state,
                allGenres: action.payload.genresList
            }
        default:
            return state
    }
}

export const music = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MUSIC_ALBUM_RELATIONS':
            console.log(action.payload.musicsList)
        return {
            ...state, albumMusics: action.payload.musicsList
        }
        default:
            return state
    }
}