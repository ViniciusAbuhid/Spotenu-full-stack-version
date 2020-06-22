import axios from 'axios'

const baseURL = 'http://localhost:3001/music'

export const setAllGenres = (genresList) =>{
    return {
        type: 'SET_GENRES',
        payload: {
            genresList
        }
    }
} 

const mockedGenres = []
// ['forro', 'samba', 'reaggae', 'cumbia colombiana']

export const getAllGenres = () => dispatch => {
    try {
        const result = axios.get(`${baseURL}/allGenres`)
        dispatch(setAllGenres(result))
    }
    catch (err) {
        alert('Não foi possível carregar os gÊneros, tente novamente mais tarde...')
    }
}

export const deleteGenre = (genreName) => dispatch => {
    try{
        // axios.delete('link', 'req')
        const filteredMock = mockedGenres.filter(genre => {
            return genre !== genreName
        })
        dispatch(setAllGenres(filteredMock))
    }
    catch (err) {
        alert('Não foi possível deletar o gênero escolhido, tente novamente mais tarde...')
    }
}

export const addNewGenre = (genreName) => dispatch => {
    try {
        const result = axios.put(`${baseURL}/addGenres`, genreName)
        dispatch(getAllGenres())
    }
    catch (err) {
        alert('Não foi possível adicionar o gênero escolhido, tente novamente mais tarde...')
    }
}