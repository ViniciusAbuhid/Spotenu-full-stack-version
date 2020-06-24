import { routes } from '../router/index'
import { push } from 'connected-react-router'
import axios from 'axios'

const baseURL = 'http://localhost:3001/user'

export const sendSignupData = (updatedUserData) => async (dispatch) => {
    try {
        const headers = {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        }
        const result = updatedUserData.role === 'ADMIN' ?
            await axios.post(`${baseURL}/signup`, updatedUserData, headers) :
            await axios.post(`${baseURL}/signup`, updatedUserData)

        const { accessToken, role } = result.data
        role !== 'ADMIN' && window.localStorage.setItem('token', accessToken)
        role !== 'ADMIN' && window.localStorage.setItem('role', role)
        role === 'ADMIN' && alert('Administrador cadastrado com sucesso')

        dispatch(push(routes.home))
    }
    catch (err) {
        console.log(err.message)
        alert('Cadastro não efetivado. Tente novamente mais tarde...')
    }
}

export const sendLoginData = (updatedUserData) => async (dispatch) => {
    try {
        const result = await axios.post(`${baseURL}/login`, updatedUserData)
        const { accessToken, role } = result.data
        window.localStorage.setItem('token', accessToken)
        window.localStorage.setItem('role', role)
        dispatch(push(routes.home))
    }
    catch (err) {
        alert('Não foi possível realizar o seu login. Tente novamente mais tarde...')
    }
}