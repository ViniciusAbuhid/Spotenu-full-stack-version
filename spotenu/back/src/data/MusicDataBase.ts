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

    public async getGenreByName(name:string){
        const result = await this.getConnection().select('*').where({name}).from(this.tableName)
        return result
    }

    public async getAllGenres(){
        const result = await this.getConnection().select("*").from(this.tableName)
        return result
    }

    public async getAlbumById(id:string){
        const result = await this.getConnection().select('*').from('Albumns_Genres_Spotenu')
        return result
    } 

    public async createAlbum(name: string, id: string, artisit_id: string){
        await this.getConnection().insert({
            name, id, artisit_id
        }).into(this.tableName)
    }

    public async createAlbumAndGenreRelation(id_album: string, id_genre:string){
        await this.getConnection().insert({id_album, id_genre}).into('Albumns_Genres_Spotenu')
    }

    public async addMusic(name:string, id:string, id_album: string,  link:string){
        await this.getConnection().insert({name, id, id_album, link}).into('Musics_Spotenu')
    }
}