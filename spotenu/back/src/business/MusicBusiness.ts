import { MusicDataBase } from "../data/MusicDataBase";
import IdGenerator from "../services/IdGenerator";

export class MusicBusiness {
    constructor(private musicDataBase: MusicDataBase, private idGenerator: IdGenerator){}

    public async addGenre(name: string){
        const id = this.idGenerator.idGenerator()
        this.musicDataBase.addGenre(name, id)
        const checkingGenre = await this.musicDataBase.getGenreById(id)
        if(!checkingGenre[0]){
            throw new Error('Não foi possível adicionar este gênero agora, tente novamente mais tarde')
        }
        return 'gênero adicionado com sucesso'
    }

    public async getAllGenres(){
        return await this.musicDataBase.getAllGenres()
    }
}