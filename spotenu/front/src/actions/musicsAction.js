import { music } from "../reducers/music"

export const setMusicList = (musicsList) => {
    console.log('to no actio propriamente dita', musicsList)
    return {
        type: 'SET_MUSIC_ALBUM_RELATIONS',
        payload: {
            musicsList
        }
    }
}

const mockedAlbumRelations = [{
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

const mockedPlRelations = [{
    music: 'music4',
    pl: 'pl1'
},
{
    music: 'music5',
    pl: 'pl1'
},
{
    music: 'music6',
    pl: 'pl1'
},]

export const getMusicList = (componentInfo) => dispatch => {
    try {
        // const reult = axios.get('link', 'info')
        componentInfo.component === 'album'? dispatch(setMusicList(mockedAlbumRelations)) :
        dispatch(setMusicList(mockedPlRelations))
    }
    catch (err) {
        alert('não foi possível carregar as músicas neste momento, tente novamente mais tarde')
    }
}

export const addMusic = (musicData) => dispatch => {
    try {
        // axios.put('link', 'info')
        let pushingMock = []
        musicData.component === 'album'? pushingMock = [...mockedAlbumRelations, {
            music: musicData.name,
            album: musicData.name
        }] : 
        pushingMock = [...mockedPlRelations, {
            music: musicData.name,
            album: 'Pl1'
        }]
        dispatch(setMusicList(pushingMock))
    }
    catch (err) {
        alert('não foi adicionar essa música neste momento, tente novamente mais tarde')
    }
}

export const deleteMusic = (musicData) => dispatch => {
    console.log(musicData)
    try {
        // axios.delete('link', 'req')
        let filteredMock = []
        musicData.component === 'album'? filteredMock = mockedAlbumRelations.filter(relation => {
            return relation.music !== musicData.name
        }) :
        filteredMock = mockedPlRelations.filter(relation => {
            return relation.music !== musicData.name
        })
        dispatch(setMusicList(filteredMock))
    }
    catch (err) {
        alert('não foi deletar essa música neste momento, tente novamente mais tarde')
    }
}