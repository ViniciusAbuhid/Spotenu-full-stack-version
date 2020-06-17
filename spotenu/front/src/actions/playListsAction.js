export const setAllPls = (playLists) => {
    return {
        type: 'SET_PLAYLISTS',
        payload : {
            playLists
        }
    }
}

export const getAllPls = () => dispatch => {
    try {
        // result = axios.get('link', 'info')
        const mockPl = [{
            name: 'Playlist 1',
            genres: ['samba','forro','reaggae'],
            id: 1
        },{
            name: 'Playlist 2',
            genres: ['rock','pop','phunk'],
            id: 2
        },{
            name: 'Playlist 3',
            genres: ['pagode','samba-raíz'],
            id: 3
        }]
        dispatch(setAllPls(mockPl))
    }
    catch (err) {
        alert('não foi possível carregar as suas playlits, tente novamente mais tarde...')
    }
}