import { MusicBusiness } from "../src/business/MusicBusiness"

describe('testing add genre', () => {
    let musicDataBase = {}
    let idGeneratorClass = {}
    it('it should return a not found error', async () => {
        expect.assertions(1)
        try {
            const idGenerator = jest.fn(() => 'id')
            const addGenre = jest.fn(() => { })
            const getGenreById = jest.fn(() => [])
            musicDataBase = {
                addGenre,
                getGenreById
            }
            idGeneratorClass = {
                idGenerator
            }
            await new MusicBusiness(musicDataBase as any, idGeneratorClass as any).addGenre('name')
        }
        catch (err) {
            expect(err.message).toBe('Não foi possível adicionar este gênero agora, tente novamente mais tarde...')
        }
    })
    it('it should add the genre', async () => {
        const idGenerator = jest.fn(() => 'id')
        const addGenre = jest.fn(() => { })
        const getGenreById = jest.fn(() => [1])
        musicDataBase = {
            addGenre,
            getGenreById
        }
        idGeneratorClass = {
            idGenerator
        }
        const result = await new MusicBusiness(musicDataBase as any, idGeneratorClass as any).addGenre('name')
        expect(addGenre).toBeCalledWith('name', 'id')
        expect(getGenreById).toBeCalledWith('id')
        expect(result).toBe('gênero adicionado com sucesso')
    })
})

describe('testing delete genres', () => {
    let musicDataBase = {}
    let idGeneratorClass = {}
    it('it should return an error when remotion of relations table doesnt work', async () => {
        expect.assertions(1)
        try {
            const deleteRelationBetweenGenreAndAlbum = jest.fn(() => { })
            const getRelationAlbumAndGenre = jest.fn(() => ['touche'])
            musicDataBase = {
                deleteRelationBetweenGenreAndAlbum,
                getRelationAlbumAndGenre
            }
            await new MusicBusiness(musicDataBase as any, idGeneratorClass as any).deleteGenre('id')
        }
        catch (err) {
            expect(err.message)
                .toBe(`Não foi possível deletar as relações entre este gênero e os albuns, tente novamente mais tarde`)
        }
    })
    it('it should return an error bc the album was not deleted', async () => {
        expect.assertions(1)
        try {
            const deleteRelationBetweenGenreAndAlbum = jest.fn(() => { })
            const getRelationAlbumAndGenre = jest.fn(() => [])
            const getGenreById = jest.fn(() => ['touche'])
            const deleteGenre = jest.fn(() => { })
            musicDataBase = {
                deleteRelationBetweenGenreAndAlbum,
                getRelationAlbumAndGenre,
                getGenreById,
                deleteGenre
            }
            await new MusicBusiness(musicDataBase as any, idGeneratorClass as any).deleteGenre('id')
        }
        catch (err) {
            expect(err.message)
                .toBe(`Não foi possível deletar este gênero agora, tente novamente mais tarde...`)
        }
    })
    it('it shloud delete properly the genre choise', async () => {
        const deleteRelationBetweenGenreAndAlbum = jest.fn(() => { })
        const getRelationAlbumAndGenre = jest.fn(() => [])
        const getGenreById = jest.fn(() => [])
        const deleteGenre = jest.fn(() => { })
        musicDataBase = {
            deleteRelationBetweenGenreAndAlbum,
            getRelationAlbumAndGenre,
            getGenreById,
            deleteGenre
        }
        const result = await new MusicBusiness(musicDataBase as any, idGeneratorClass as any).deleteGenre('id')
        expect(deleteRelationBetweenGenreAndAlbum).toBeCalled()
        expect(getRelationAlbumAndGenre).toBeCalled()
        expect(getGenreById).toBeCalled()
        expect(deleteGenre).toBeCalled()
        expect(result).toBe(undefined)
    })
})