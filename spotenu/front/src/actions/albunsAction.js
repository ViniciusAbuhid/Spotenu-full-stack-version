import { push } from 'connected-react-router'
import { routes } from '../router/index'

export const setAlbuns = (albunsList) => {
    console.log(albunsList)
    return {
        type: 'SET_ALBUNS',
        payload: {
            albunsList
        }
    }
}

const mockedAlbuns = [{
    name: 'Album 1',
    genres: ['samba','forro','reaggae'],
    id: 1
},{
    name: 'Album 2',
    genres: ['rock','pop','phunk'],
    id: 2
},{
    name: 'Album 3',
    genres: ['pagode','samba-raíz'],
    id: 3
}]

export const getAllAlbuns = () => dispatch => {
    try{
        // const result = axios.get('lin', 'req')
        dispatch(setAlbuns(mockedAlbuns))
    }
    catch (err) {
        alert('Não foi possível carregar os seus álbuns, tente novamente mais tarde...')
    }
}

export const createAlbum = (albumData) => dispatch => {
    try {
        // axios.put('link', 'req')
        console.log(albumData)
        alert('Álbum adicionado com sucesso')
        mockedAlbuns.push(albumData)
        dispatch(push(routes.home))
    }
    catch (err) {
        alert('Não foi possível adicionar este álbum agora, teste novamente mais tarde...')
    }
}