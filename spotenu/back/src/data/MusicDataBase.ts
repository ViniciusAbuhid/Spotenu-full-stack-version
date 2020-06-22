import BaseDataBase from "./BaseDataBase";

export class MusicDataBase extends BaseDataBase{
    tableName = 'Genres_Spotenu'

    public async addGenre(name:string, id:string){
        await this.getConnection().insert({name, id}).into(this.tableName)
    }

    public async getGenreById(id:string){
        const result = await this.getConnection().select('*').where({id}).from(this.tableName)
        return result
    }

    public async getAllGenres(){
        const result = await this.getConnection().select("*").from(this.tableName)
        return result
    }
}