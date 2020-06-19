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
        const accessToken = this.tokenGenerator.generateToken({id, role})
        console.log('token gerado', accessToken)
        return accessToken
    }
}