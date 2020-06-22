import { routes } from '../router/index'
import { push } from 'connected-react-router'
import axios from 'axios'

const baseURL = 'http://localhost:3001/user'

export const sendSignupData = (updatedUserData) => async (dispatch) => {
    try {
        const result = await axios.post(`${baseURL}/signup`, updatedUserData)
        const { token, role } = result.data
        console.log(token)
        console.log(role)
        window.localStorage.setItem('token', token, 'role', role)
        dispatch(push(routes.home))
    }
    catch (err) {
        console.log(err)
        alert('Cadastro não efetivado. Tente novamente mais tarde...')
    }
}

export const sendLoginData = (updatedUserData) => async (dispatch) => {
    try {
        const result = await axios.post(`${baseURL}/login`, updatedUserData)
        const token = result.data.accessToken
        window.localStorage.setItem('token', token)
        dispatch(push(routes.home))
    }
    catch (err) {
        alert('Não foi possível realizar o seu login. Tente novamente mais tarde...')
    }
}