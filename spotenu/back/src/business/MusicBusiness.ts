import { MusicDataBase } from "../data/MusicDataBase";
import IdGenerator from "../services/IdGenerator";
import HashGenerator from "../services/HashGenerator";

export class MusicBusiness {
    constructor(private musicDataBase: MusicDataBase, private idGenerator: IdGenerator){}

    public async addGenre(name: string){
        const id = this.idGenerator.idGenerator()
        this.musicDataBase.addGenre(name, id)
        const checkingGenre = await this.musicDataBase.getGenreById(id)
        if(!checkingGenre[0]){
            throw new Error('Não foi possível adicionar este gênero agora, tente novamente mais tarde...')
        }
        return 'gênero adicionado com sucesso'
    }

    public async getAllGenres(){
        return await this.musicDataBase.getAllGenres()
    }

    public async createAlbum(name:string, artisit_id:string, genresList: Array<string>){
        const album_id = this.idGenerator.idGenerator()
        await this.musicDataBase.createAlbum(name, album_id, artisit_id)
        const checkingAlbum = await this.musicDataBase.getAlbumById(album_id)
        if(!checkingAlbum[0]){
            throw new Error('Não foi possível criar este álbum agora, tente novamente mais tarde...')
        }

        const filteringGenres = genresList.filter( async (genre) => {
            const research = await this.musicDataBase.getGenreByName(genre)
            if(genre !== research[0].name){
                throw new Error('Por favor, escolha somente gêneros cadastrados')
            }
            return research[0]
        })

        filteringGenres.forEach(async (genre) =>{
            await this.musicDataBase.createAlbumAndGenreRelation(album_id, genre)
        })
        return 'album criado com sucesso'
    }

    public async addMusic(name:string, id_album: string, link: string){
        const id = this.idGenerator.idGenerator()
        await this.musicDataBase.addMusic(name, id, id_album, link)
    }
}