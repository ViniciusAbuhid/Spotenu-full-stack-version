import axios from 'axios'

const baseURL = 'http://localhost:3001/music'

export const setAllGenres = (genresList) => {
    return {
        type: 'SET_GENRES',
        payload: {
            genresList
        }
    }
}

export const getAllGenres = () => async (dispatch) => {
    try {
        const result = await axios.get(`${baseURL}/allGenres`, {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        })
        dispatch(setAllGenres(result.data))
    }
    catch (err) {
        alert('Não foi possível carregar os gêneros, tente novamente mais tarde...')
    }
}

export const deleteGenre = (genreId) => async (dispatch) => {
    try {
        await axios.delete(`${baseURL}/delete/genre/${genreId}`)
        dispatch(getAllGenres())
    }
    catch (err) {
        alert('Não foi possível deletar o gênero escolhido, tente novamente mais tarde...')
    }
}

export const addNewGenre = (genreName) => async (dispatch) => {
    try {
        await axios.put(`${baseURL}/addGenre`, genreName)
        dispatch(getAllGenres())
    }
    catch (err) {
        alert('Não foi possível adicionar o gênero escolhido, tente novamente mais tarde...')
    }
}