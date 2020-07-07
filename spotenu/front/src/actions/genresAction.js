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
        console.log(result)
        dispatch(setAllGenres(result.data))
    }
    catch (err) {
        alert('Não foi possível carregar os gêneros, tente novamente mais tarde...')
    }
}

export const deleteGenre = (genreId) => async (dispatch) => {
    try {
        const result = await axios.delete(`${baseURL}/delete/genre/${genreId}`)
        dispatch(getAllGenres())
    }
    catch (err) {
        alert('Não foi possível deletar o gênero escolhido, tente novamente mais tarde...')
    }
}

export const addNewGenre = (genreName) => async (dispatch) => {
    try {
        const result = await axios.put(`${baseURL}/addGenre`, genreName)
        console.log(result)
        dispatch(getAllGenres())
    }
    catch (err) {
        alert('Não foi possível adicionar o gênero escolhido, tente novamente mais tarde...')
    }
}