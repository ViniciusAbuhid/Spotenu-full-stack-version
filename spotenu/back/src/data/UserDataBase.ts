import BaseDataBase from './BaseDataBase'
import { UserRoles, UserModel } from '../models/UserModel'

export default class UserDataBase extends BaseDataBase {
    tableName = 'Users_Spotenu'

    public async addUser(name: string, email: string, nickname: string, password: string,
        id: string, role: string, description?: string): Promise<void> {
        let approved = role === UserRoles.BANDA ? 0 : 1
        await this.getConnection().insert({
            name, email, nickname, password, id, role, approved, description
        }).into(this.tableName)
    }

    public async getUserById(id: string) {
        const result = await this.getConnection().select('*').from(this.tableName).where({ id })
        if (result.length === 0) {
            throw new Error('Não foi possível realizar o cadastro agora, tente novamente mais tarde')
        }
        // const user = new UserModel(result[0].name, result[0].email, result[0].nickname,
        //     result[0].id, result[0].role, result[0].approved, result[0].description)
        return result
    }

    public async getAllBands() {
        const result = await this.getConnection().select("*").from(this.tableName)
            .where({ role: UserRoles.BANDA })
        const filteredResult = result.map(band => {
            return new UserModel(band.name, band.email, band.nickname,
                band.id, band.role, band.approved, band.description)
        })
        return filteredResult
    }

    public async approveBand(id: string){
        await this.getConnection().raw(`
        UPDATE ${this.tableName}
        SET approved = 1
        WHERE id = '${id}'
        `)
    }

    public async getBandById(id: string){
        const result = await this.getConnection().select('*').where({id}).from(this.tableName)
        return result
    }

    public async reproveBand(id:string){
        await this.getConnection().delete().from(this.tableName).where({id})
    }

    public async getUserByCredential(credential: string){
        const result = credential.includes('@') ?
        await this.getConnection().select('*').where({email: credential}).from(this.tableName) :
        await this.getConnection().select('*').where({nickname: credential}).from(this.tableName)
        return result
    }
}

// public async signUp(id: string, name: string, email: string, nickname: string,
//     password: string, role: string, description?: string) {
//     let approved = role === UserRoles.BANDA ? 0 : 1
//     const result = await this.getConnection().insert({
//         id,
//         name,
//         email,
//         nickname,
//         password,
//         role,
//         description,
//         approved
//     }).into(this.tableName)
// }