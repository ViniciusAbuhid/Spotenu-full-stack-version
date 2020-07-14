import BaseDataBase from "./BaseDataBase";

export class MusicDataBase extends BaseDataBase {
    tableName = 'Genres_Spotenu'

    public async addGenre(name: string, id: string) {
        await this.getConnection().insert({ name, id }).into(this.tableName)
    }

    public async getGenreById(id: string) {
        const result = await this.getConnection().select('*').where({ id }).from(this.tableName)
        return result
    }

    public async getGenreByName(name: string) {
        const result = await this.getConnection().select('*').where({ name }).from(this.tableName)
        return result
    }

    public async getAllGenres() {
        const result = await this.getConnection().select("*").from(this.tableName)
        return result
    }

    public async deleteGenre(id: string) {
        await this.getConnection().delete().from(this.tableName).where({ id })
    }

    public async createAlbumAndGenreRelation(id_album: string, id_genre: string) {
        await this.getConnection().insert({ id_album, id_genre }).into('Albumns_Genres_Spotenu')
    }

    public async getRelationAlbumAndGenre(id_genre: string){
        const result = await this.getConnection().select('*').where({id_genre})
        .from('Albumns_Genres_Spotenu')
        return result
    }

    public async deleteRelationBetweenGenreAndAlbum(id_genre: string | null, id_album?: string) {
        id_genre? await this.getConnection().delete().from('Albumns_Genres_Spotenu').where({ id_genre }):
        await this.getConnection().delete().from('Albumns_Genres_Spotenu').where({ id_album })
    }

    public async getAllAlbunsById(artist_id: string) {
        const result = await this.getConnection().select("*").where({ artist_id }).from('Albums_Spotenu')
        return result
    }

    public async getAlbumById(id: string) {
        const result = await this.getConnection().select('*').where({ id }).from('Albums_Spotenu')
        return result
    }

    public async createAlbum(name: string, id: string, artist_id: string) {
        const result = await this.getConnection().insert({
            name, id, artist_id
        }).into('Albums_Spotenu')
    }

    public async deleteAlbum(id: string) {
        await this.getConnection().delete().from('Albums_Spotenu').where({ id })
    }

    public async deleteAlbumByArtistId(artist_id: string) {
        await this.getConnection().delete().from('Albums_Spotenu').where({ artist_id })
    }

    public async deleteRelationAlbumMusic(album_id: string){
        await this.getConnection().delete().from('Musics_Spotenu').where({album_id})
    }

    public async getAllMusicsFromCertainAlbum(album_id: string) {
        const result = await this.getConnection().select('*').where({ album_id }).from('Musics_Spotenu')
        return result
    }

    public async addMusic(name: string, id: string, album_id: string, link: string) {
        await this.getConnection().insert({ name, id, album_id, link }).into('Musics_Spotenu')
    }

    public async getMusicById(id: string) {
        const result = await this.getConnection().select('*').where({ id }).from('Musics_Spotenu')
        return result
    }

    public async deleteMusic(id: string) {
        await this.getConnection().delete().from('Musics_Spotenu').where({ id })
    }

    public async getMusicByName(name:string){
        const result = await this.getConnection().raw(`
        select Musics_Spotenu.link, Albums_Spotenu.name, Musics_Spotenu.name from Musics_Spotenu
        join Albums_Spotenu
        on Musics_Spotenu.album_id = Albums_Spotenu.id
        where Musics_Spotenu.name like '%${name}%';
        `)
        return result[0]
    }
}