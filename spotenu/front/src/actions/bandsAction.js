import axios from 'axios'

const baseURL = 'http://localhost:3001/'

export const setBands = (bands) => {
    return {
        type: 'SET_BANDS',
        payload: {
            bands
        }
    }
}

export const getAllBands = () => async (dispatch) => {
    try {
        const result = await axios.get(`${baseURL}user/allBands`, {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        })
        dispatch(setBands(result.data.message))
    }
    catch (err) {
        alert('Não foi possível carregar todas as bandas no momento, tente novamente mais tarde...')
        console.log(err.message)
    }
}

export const approveBand = (id) => async (dispatch) => {
    try {
        await axios.put(`${baseURL}user/approve/${id}`)
        alert('banda aprovada com sucesso')
        dispatch(getAllBands())
    }
    catch (err) {
        alert('Não foi possível aprovar esta banda no momento, tente novamente mais tarde')
        console.log(err.message)
    }
}

export const disapproveBand = (id) => dispatch => {
    try {
        axios.delete(`${baseURL}user/reprove/${id}`)
        dispatch(getAllBands())
    }
    catch (err) {
        alert('Não foi possível reprovar esta banda no momento, tente novamente mais tarde...')
        console.log(err.message)
    }
}