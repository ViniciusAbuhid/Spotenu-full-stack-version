export const setAlbumMusics = (musicsList) => {
    console.log('to no actio propriamente dita', musicsList)
    return {
        type: 'SET_MUSIC_ALBUM_RELATIONS',
        payload: {
            musicsList
        }
    }
}

const mockedRelations = [{
    music: 'music1',
    album: 'album1'
},
{
    music: 'music2',
    album: 'album1'
},
{
    music: 'music3',
    album: 'album1'
},]

export const getAlbumMusics = (albumName) => dispatch => {
    try {
        console.log('to no action')
        // const reult = axios.get('link', 'info')
        dispatch(setAlbumMusics(mockedRelations))
    }
    catch (err) {
        alert('não foi possível carregar as músicas neste momento, tente novamente mais tarde')
    }
}

export const addMusic = (musicData) => dispatch => {
    try {
        // axios.put('link', 'info')
        const pushingMock = [...mockedRelations, {
            music: musicData.name,
            album: 'album1'
        }]
        dispatch(setAlbumMusics(pushingMock))
    }
    catch (err) {
        alert('não foi adicionar essa música neste momento, tente novamente mais tarde')
    }
}

export const deleteMusic = (musicName) => dispatch => {
    console.log(musicName)
    try {
        // axios.delete('link', 'req')
        const filteredMock = mockedRelations.filter(relation => {
            return relation.music !== musicName
        })
        console.log('to no mideuér e vou mandar isso p action', filteredMock)
        dispatch(setAlbumMusics(filteredMock))
    }
    catch (err) {
        alert('não foi deletar essa música neste momento, tente novamente mais tarde')
    }
}