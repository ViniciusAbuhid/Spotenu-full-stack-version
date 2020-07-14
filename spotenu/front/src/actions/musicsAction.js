import axios from 'axios'
import { push } from 'connected-react-router'
import { routes } from '../router/index'

const baseURL = 'http://localhost:3001/music'

export const setMusicList = (musicsList) => {
    console.log('cheguei no role do actino com', musicsList)
    return {
        type: 'SET_MUSIC_ALBUM_RELATIONS',
        payload: {
            musicsList
        }
    }
}

export const setSearchedMusics = (searchedMusics) => {
    return {
        type: 'SET_SEARCHED_MUSICS',
        payload: {
            searchedMusics
        }
    }
}

export const setSearchedTerm = (searchedTerm) => {
    return {
        type: 'SEARCH_FOR',
        payload: {
            searchedTerm
        }
    }
}

export const getMusicList = (componentInfo) => async (dispatch) => {
    try {
        const result = await axios.get(`${baseURL}/allMusics/${componentInfo.componentId}`)
        dispatch(setMusicList(result.data))
    }
    catch (err) {
        alert('não foi possível carregar as músicas neste momento, tente novamente mais tarde')
    }
}

export const addMusic = (musicData) => async (dispatch) => {
    try {
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
    try {
        const result = await axios.delete(`${baseURL}/delete/music/${musicData.id}`)
        dispatch(getMusicList({ component: musicData.component, componentId: musicData.componentId }))
    }
    catch (err) {
        console.log(err.message)
        alert('não foi possível deletar essa música neste momento, tente novamente mais tarde')
    }
}

export const searchMusic = (musicName) => async (dispatch) => {
    dispatch(push(routes.musicSession))
    try{
        const result = await axios.get(`${baseURL}/search?name=${musicName}`)
        dispatch(setSearchedMusics(result.data))
        dispatch(setSearchedTerm(musicName))
    }
    catch (err) {
        console.log(err.message)
        alert('Não foi possível buscar as músicas agora, tente novamente mais tarde')
    }
}