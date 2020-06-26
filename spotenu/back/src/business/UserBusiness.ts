import IdGenerator from '../services/IdGenerator'
import UserDataBase from '../data/UserDataBase'
import HashGenarator from '../services/HashGenerator'
import TokenGenerator from '../services/TokenGenerator'

export default class UserBusiness {
    constructor(private userDataBase: UserDataBase,
        private idGenerator: IdGenerator,
        private hashGenerator: HashGenarator,
        private tokenGenerator: TokenGenerator) { }

    public async addUser(name: string, email: string, nickname: string, password: string,
        role: string, description?: string) {
        const id = this.idGenerator.idGenerator()
        const hash = await this.hashGenerator.hashGenerator(password)
        await this.userDataBase.addUser(name, email, nickname, hash, id, role, description)
        const result = await this.userDataBase.getUserById(id)
        const accessToken = this.tokenGenerator.generateToken({ id, role })
        return { accessToken, role }
    }

    public async getAllBands() {
        return await this.userDataBase.getAllBands()
    }

    public async approveBand(id: string) {
        await this.userDataBase.approveBand(id)
        const checkingApproval = await this.userDataBase.getBandById(id)
        if (checkingApproval[0].approved) {
            throw new Error('Não foi possível aprovar esta banda agora, tente novamente mais tarde...')
        }
    }

    public async reproveBand(id: string) {
        await this.userDataBase.reproveBand(id)
        const checkingApproval = await this.userDataBase.getBandById(id)
        if (checkingApproval.length > 0) {
            throw new Error('Não foi possível reprovar esta banda agora, tente novamente mais tarde...')
        }
    }

    public async getUserByCredential(credential: string, password: string) {
        const result = await this.userDataBase.getUserByCredential(credential)
        if (result.length <= 0) {
            throw new Error('infomações inválidas')
        }
        const checkingPassword = await this.hashGenerator.verify(password, result[0].password)
        if (!checkingPassword) {
            throw new Error('infomações inválidas')
        }
        const accessToken = this.tokenGenerator.generateToken({ id: result[0].id, role: result[0].role })
        return { accessToken, role: result[0].role }
    }
}