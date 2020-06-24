import { push } from 'connected-react-router'
import { routes } from '../router/index'
import axios from 'axios'

const baseURL = 'http://localhost:3001/music'

export const setAlbuns = (albunsList) => {
    console.log(albunsList)
    return {
        type: 'SET_ALBUNS',
        payload: {
            albunsList
        }
    }
}

export const getAllAlbuns = () => async(dispatch) => {
    try{
        const result = await axios.get(`${baseURL}/allAlbuns`, {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        })
        dispatch(setAlbuns(result.data))
    }
    catch (err) {
        console.log(err.message)
        alert('Não foi possível carregar os seus álbuns, tente novamente mais tarde...')
    }
}

export const createAlbum = (albumData) => async(dispatch) => {
    console.log(albumData)
    try {
        const result = await axios.post(`${baseURL}/create/album`, albumData, {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        })
        console.log(result.data)
        alert('Álbum adicionado com sucesso')
        dispatch(push(routes.home))
    }
    catch (err) {
        alert('Não foi possível adicionar este álbum agora, teste novamente mais tarde...')
    }
}