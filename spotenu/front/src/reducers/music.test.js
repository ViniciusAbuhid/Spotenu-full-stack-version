import { setBands } from '../actions/bandsAction'
import { setAlbuns } from '../actions/albunsAction'
import { setAllPls } from '../actions/playListsAction'
import { setAllGenres } from '../actions/genresAction'
import { setMusicList, setSearchedMusics, setSearchedTerm } from '../actions/musicsAction'
import { bands, albuns, playLists, genres, music, research, query } from './music'

const mockedState = {
    bands: [],
    albunsList: [],
    allPlayLists: [],
    allGenres: [],
    musicList: [],
    searchedMusics: [],
    searchedTerm: ''
}

let myBands = ['banda1', 'banda2', 'banda3']
let myMusics = ['music1', 'music2', 'music3']
let myPls = ['pl1', 'pl2', 'pl3']
let myAlbuns = ['album1', 'album2', 'album3']

describe('testing reducers', () => {
    it('testing set bands in the state', () => {
        const mockedAction = setBands(myBands)
        const result = bands(mockedState, mockedAction)
        expect(mockedAction.type).toBe('SET_BANDS')
        expect(result.bands).toEqual(myBands)
    })
    it('testing albuns', () => {
        const mockedAction = setAlbuns(myAlbuns)
        let result = albuns(mockedState, mockedAction)
        expect(result.albunsList).toEqual(myAlbuns)
        const mockedAnotherAction = setBands(myBands)
        result = albuns(mockedState, mockedAnotherAction)
        expect(result).toEqual(mockedState)
    })
    it('testing playlists', () => {
        const mockedAction = setAllPls(myPls)
        let result = playLists(mockedState, mockedAction)
        expect(result.allPlayLists).toEqual(myPls)
    })
    it('testing genres', () => {
        const mockedAction = setAllGenres('genres list')
        let result = genres(mockedState, mockedAction)
        expect(result.allGenres).toBe('genres list')
    })
    it('testing music', () => {
        let mockedAction = setMusicList(myMusics)
        let result = music(mockedState, mockedAction)
        expect(result.musicList).toEqual(myMusics)
        expect(result.musicList).toContain('music2')
    })
    it('testing research', () => {
        const mockedAction = setSearchedMusics(myMusics)
        let result = research(mockedState, mockedAction)
        expect(result.searchedMusics).toBe(myMusics)
    })
    it('testing query', ()=>{
        const mockedAction = setSearchedTerm('piscinha')
        let result = query(mockedState, mockedAction)
        expect(result.searchedTerm).toBe('piscinha')
    })
})