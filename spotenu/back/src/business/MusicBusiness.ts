import { MusicDataBase } from "../data/MusicDataBase";
import IdGenerator from "../services/IdGenerator";

export class MusicBusiness {
    constructor(private musicDataBase: MusicDataBase, private idGenerator: IdGenerator) { }

    public async addGenre(name: string) {
        const id = this.idGenerator.idGenerator()
        await this.musicDataBase.addGenre(name, id)
        const checkingGenre = await this.musicDataBase.getGenreById(id)
        if (!checkingGenre[0]) {
            throw new Error('Não foi possível adicionar este gênero agora, tente novamente mais tarde...')
        }
        return 'gênero adicionado com sucesso'
    }

    public async getAllGenres() {
        return await this.musicDataBase.getAllGenres()
    }

    public async deleteGenre(id: string) {
        await this.musicDataBase.deleteGenre(id)
        const checkingDel = await this.musicDataBase.getGenreById(id)
        if (checkingDel.length > 0) {
            throw new Error('Não foi possível reprovar este gênero agora, tente novamente mais tarde...')
        }
        console.log('passei da verificação toda')
    }

    public async getAllAlbunsById(artisit_id: string) {
        return await this.musicDataBase.getAllAlbunsById(artisit_id)
    }

    public async createAlbum(name: string, artisit_id: string, genresList: string) {
        const album_id = this.idGenerator.idGenerator()
        await this.musicDataBase.createAlbum(name, album_id, artisit_id)
        const checkingAlbum = await this.musicDataBase.getAlbumById(album_id)
        if (!checkingAlbum[0]) {
            throw new Error('Não foi possível criar este álbum agora, tente novamente mais tarde...')
        }
        const genresArray = genresList.split(',')
        console.log(genresArray)
        const filteringGenres = await genresArray.map(async (genre) => {
            const research = await this.musicDataBase.getGenreByName(genre)
            if (!research[0]) {
                throw new Error('Por favor, escolha somente gêneros cadastrados')
            }
            return research[0]
        })
        console.log(filteringGenres)
        filteringGenres.forEach(async (genre) => {
            await this.musicDataBase.createAlbumAndGenreRelation(album_id, ' genre.id')
        })
        return 'album criado com sucesso'
    }

    public async addMusic(name: string, album_id: string, link: string) {
        const id = this.idGenerator.idGenerator()
        await this.musicDataBase.addMusic(name, id, album_id, link)
        const checkingMusic = await this.musicDataBase.getMusicById(id)
        if (!checkingMusic[0]) {
            throw new Error('Não foi possível adicionar essa música agora, tente novamente mais tarde...')
        }
        return 'Música adicionada com sucesso'
    }

    public async getAllMusicsFromCertainAlbum(album_id: string) {
        return await this.musicDataBase.getAllMusicsFromCertainAlbum(album_id)
    }

    public async deleteMusic(id: string) {
        const checkingDel = await this.musicDataBase.getMusicById(id)
        if (!checkingDel[0]) {
            throw new Error('Essa música não existe')
        }
        await this.musicDataBase.deleteMusic(id)
    }
}