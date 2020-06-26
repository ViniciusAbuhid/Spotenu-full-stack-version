import bcryptjs, { compare, genSalt, hash } from 'bcryptjs'

export default class HashGenerator {
    public async hashGenerator(password: string) {
        const salt = await genSalt(Number(process.env.ROUNDS))
        const hash = bcryptjs.hash(password, salt)
        return hash
    }

    public verify(password: string, hash: string) {
        return compare(password, hash)
    }
}