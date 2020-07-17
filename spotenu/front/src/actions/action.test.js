import { setAlbuns, getAllAlbuns, createAlbum, deleteAlbuns } from './albunsAction'
import { setBands, getAllBands, approveBand, disapproveBand, baseURL } from './bandsAction'
import { addNewGenre, setAllGenres, deleteGenre, getAllGenres } from './genresAction'
import { setMusicList, setSearchedMusics, setSearchedTerm } from './musicsAction'
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
        axios.get = jest.fn(() => ({
            data: ['mockedAlbuns']
        }))
        const result = await getAllAlbuns()(mockedDispatch)
        expect(mockedDispatch).toHaveBeenCalledWith(setAlbuns(['mockedAlbuns']))
    })
    it('testing create album', async () => {
        let albumData = { name: 'nome', artist: 'cesar menoti' }
        axios.post = jest.fn(() => { })
        const result = await createAlbum(albumData)(mockedDispatch)
        expect(axios.post).toHaveBeenCalled()
        expect(mockedDispatch).toHaveBeenCalledWith(push(routes.home))
    })
    it('testing album remotion', async () => {
        axios.delete = jest.fn(() => { })
        await deleteAlbuns('id')(mockedDispatch)
        expect(mockedDispatch).toHaveBeenCalled()
        // expect(mockedDispatch).toHaveBeenCalledWith(getAllAlbuns())
    })
})

describe('testing bands actions', () => {
    beforeEach(() => {
        mockedDispatch = jest.fn()
    })
    it('testing set bands', () => {
        const result = setBands('bands')
        expect(result.type).toBe('SET_BANDS')
        expect(result.payload.bands).toBe('bands')
    })
    it('testing get all bands', async () => {
        axios.get = jest.fn(() => {
            return {
                data: {
                    message: 'boa noite'
                }
            }
        })
        await getAllBands()(mockedDispatch)
        expect(mockedDispatch).toHaveBeenCalled()
        expect(mockedDispatch).toHaveBeenCalledWith(setBands('boa noite'))
    })
    it('testing approve bands', async () => {
        axios.put = jest.fn(() => { })
        await approveBand('id')(mockedDispatch)
        expect(mockedDispatch).toHaveBeenCalled()
        // expect(mockedDispatch).toHaveBeenCalledWith(getAllBands())
    })
    it('testing delete bands', async () => {
        axios.delete = jest.fn(() => { })
        await disapproveBand('id')(mockedDispatch)
        expect(mockedDispatch).toHaveBeenCalled()
        expect(axios.delete).toHaveBeenCalled()
        expect(axios.delete).toHaveBeenCalledWith(`${baseURL}user/reprove/id`)
        // expect(mockedDispatch).toHaveBeenCalledWith(getAllBands())
    })
})

describe('testing genres actions', () => {
    beforeEach(() => {
        mockedDispatch = jest.fn()
    })
    it('testing set genres', () => {
        const result = setAllGenres('my genres')
        expect(result.type).toBe('SET_GENRES')
        expect(result.payload.genresList).toBe('my genres')
    })
    it('testing get genres', async () => {
        axios.get = jest.fn(() => {
            return {
                data: 'genres'
            }
        })
        await getAllGenres()(mockedDispatch)
        expect(mockedDispatch).toHaveBeenCalled()
        expect(mockedDispatch).toHaveBeenCalledWith(setAllGenres('genres'))
    })
    it('testing add genres', async () => {
        axios.put = jest.fn(() => { })
        await addNewGenre('genre Data')(mockedDispatch)
        expect(mockedDispatch).toHaveBeenCalled()
        // expect(mockedDispatch).toHaveBeenCalledWith(getAllGenres())
    })
    it('testing delete genres', async () => {
        axios.delete = jest.fn(() => { })
        await deleteGenre('id')(mockedDispatch)
        expect(mockedDispatch).toHaveBeenCalled()
    })
})

describe('testing music actions', () => {
    beforeEach(() => {
        mockedDispatch = jest.fn()
    })
    it('testing set music List', () => {
        const result = setMusicList('music list')
        expect(result.type).toBe('SET_MUSIC_ALBUM_RELATIONS')
        expect(result.payload.musicsList).toBe('music list')
    })
    it('testing set music research', () => {
        const result = setSearchedMusics('research result')
        expect(result.type).toBe('SET_SEARCHED_MUSICS')
        expect(result.payload.searchedMusics).toBe('research result')
    })
    it('testing set the term of the research', () => {
        const result = setSearchedTerm('term')
        expect(result.type).toBe('SEARCH_FOR')
        expect(result.payload.searchedTerm).toBe('term')
    })
})