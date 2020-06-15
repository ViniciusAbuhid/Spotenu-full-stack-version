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

// export const sendSubscriptionData = (userInfo, tripId) => async(dispatch) => {
//     try {
//         const result = await axios.post(`${baseURL}/trips/${tripId}/apply`, userInfo)
//         console.log(result.data)
//         dispatch(replace(routes.subscriptionDone))
//     }
//     catch(error){
//         console.log(error)
//         alert('Cadastro não efetivado. Tente novamente mais tarde...')
//     }
// }