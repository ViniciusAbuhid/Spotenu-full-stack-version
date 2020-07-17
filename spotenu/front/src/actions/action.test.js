import { setAlbuns, getAllAlbuns, baseURL, createAlbum } from './albunsAction'
import axios from 'axios'
import { push } from 'connected-react-router'
import { routes } from '../router/index'

let mockedDispatch

describe('testig albuns actions', () => {
    beforeEach(() => {
        mockedDispatch = jest.fn()
    })
    it('testing set albuns', () => {
        const result = setAlbuns('albuns')
        expect(result.type).toBe('SET_ALBUNS')
        expect(result.payload.albunsList).toBe('albuns')
    })
    it('testing get allAlbuns', async () => {
        axios.get = jest.fn(()=>({
            data: ['mockedAlbuns']
        }))
        const result = await getAllAlbuns()(mockedDispatch)
        expect(mockedDispatch).toHaveBeenCalledWith(setAlbuns(['mockedAlbuns']))
    })
    it('testing create album', ()=>{
        let albumData = {name: 'nome', artist: 'cesar menoti'}
        axios.post = jest.fn(()=>{})
        const result = createAlbum(albumData)(mockedDispatch)
        expect(axios.post).toHaveBeenCalled()
        expect(mockedDispatch).toHaveBeenCalledTimes(1)
    })
})