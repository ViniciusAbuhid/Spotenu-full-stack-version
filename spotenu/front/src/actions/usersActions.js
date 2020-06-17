import {routes} from '../router/index'
import { push } from 'connected-react-router'

export const sendSignupData =  (userData) => async(dispatch) =>{
    try{
        // const result = await axios.post('link', userData)
        // const token = result.data.token
        // window.localStorage.setItem('token', token)
        dispatch(push(routes.home))
    }
    catch (err) {
        alert('Cadastro não efetivado. Tente novamente mais tarde...')
    }
}

export const sendLoginData = (userData) => async(dispatch) => {
    try {
        // const result = await axios.post('link', userData)
        // const token = result.data.token
        // window.localStorage.setItem('token', token)
        dispatch(push(routes.home))
    }
    catch (err) {
        alert('Não foi possível realizar o seu login. Tente novamente mais tarde...')
    }
}