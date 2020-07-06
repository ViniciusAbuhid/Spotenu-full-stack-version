import axios from 'axios'

const baseURL = 'http://localhost:3001/music'

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

export const getMusicList = (componentInfo) => async (dispatch) => {
    try {
        console.log(componentInfo)
        const result = await axios.get(`${baseURL}/allMusics/${componentInfo.componentId}`)
        dispatch(setMusicList(result.data))
    }
    catch (err) {
        alert('não foi possível carregar as músicas neste momento, tente novamente mais tarde')
    }
}

export const addMusic = (musicData) => async (dispatch) => {
    try {
        console.log(musicData)
        const result = await axios.put(`${baseURL}/addMusic`, musicData, {
            headers: {
                authorization: window.localStorage.getItem("token")
            }
        })
        dispatch(getMusicList({ component: musicData.component, componentId: musicData.componentId }))
    }
    catch (err) {
        console.log(err.message)
        alert('não foi possível adicionar essa música neste momento, tente novamente mais tarde')
    }
}

export const deleteMusic = (musicData) => async (dispatch) => {
    console.log(musicData)
    try {
        const result = await axios.delete(`${baseURL}/delete/music/${musicData.id}`)
        alert('música deletada com sucesso')
        dispatch(getMusicList({ component: musicData.component, componentId: musicData.componentId }))
    }
    catch (err) {
        console.log(err.message)
        alert('não foi possível deletar essa música neste momento, tente novamente mais tarde')
    }
}