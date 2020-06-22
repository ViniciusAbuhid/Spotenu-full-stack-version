import axios from 'axios'

const baseURL = 'http://localhost:3001/'

export const setAllNewBands = (newBands) => {
    return {
        type: 'SET_NEW_BANDS',
        payload: {
            newBands
        }
    }
}

export const getAllNewBands = () => async (dispatch) => {
    try {
        const result = await axios.get(`${baseURL}user/allBands`)
        dispatch(setAllNewBands(result.data.message))
    }
    catch (err) {
        alert('Não foi possível carregar todas as bandas no momento, tente novamente mais tarde...')
        console.log(err.message)
    }
}

export const approveBand = (id) => async (dispatch) => {
    try{
        console.log()
        const result = await axios.put(`${baseURL}'approve/${id}`)
        alert('banda aprovada com sucesso')
        dispatch(getAllNewBands())
    }
    catch (err) {
        alert('Não foi possível aprovar esta banda no momento, tente novamente mais tarde')
        console.log(err.message)
    }
}

export const disapproveBand = (id) => dispatch => {
    try{
        const result = axios.delete(`${baseURL}reprove/${id}`)
        console.log('banda reprovada com sucesso')
        dispatch(getAllNewBands())
    }
    catch (err) {
        alert('Não foi possível reprovar esta banda no momento, tente novamente mais tarde...')
        console.log(err.message)
    }
}