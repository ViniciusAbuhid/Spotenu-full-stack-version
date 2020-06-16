import {routes} from '../router/index'
import { push } from 'connected-react-router'

export const sendUserData =  (userData) => async(dispatch) =>{
    try{
        // await axios.post('link', userData)
        dispatch(push(routes.home))
    }
    catch (err) {
        alert('Cadastro não efetivado. Tente novamente mais tarde...')
    }
}

export const sendLoginData = (userData) => async(dispatch) => {
    try {
        // axios.post('link', 'info')
        dispatch(push(routes.home))
    }
    catch (err) {
        alert('Não foi possível realizar o seu login. Tente novamente mais tarde...')
    }
}