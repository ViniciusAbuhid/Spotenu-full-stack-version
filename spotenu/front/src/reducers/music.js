const initialState = {
    bands: [],
    albunsList: [],
    allPlayLists: [],
    allGenres: [],
    musicList: [],
    searchedMusics: [],
    searchedTerm: ''
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
            console.log('cheguei no reducer certo com', )
        return {
            ...state, musicList: action.payload.musicsList
        }
        default:
            return state
    }
}

export const research = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCHED_MUSICS':
        return {
            ...state, searchedMusics: action.payload.searchedMusics
        }
        default:
            return state
    }
}

export const query = (state = initialState, action) => {
    switch(action.type) {
        case 'SEARCH_FOR':
        return {
            ...state, searchedTerm: action.payload.searchedTerm
        }
        default:
            return state
    }
}