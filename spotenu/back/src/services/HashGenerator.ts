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

// export class HashGenarator{
//     public async generateHash(key:string){
//         const salt = await bcryptjs.genSalt(Number(process.env.ROUNDS))
//         const hash = await bcryptjs.hash(key, salt)
//         return hash
//     }

//     public compare(key: string, hash: string){
//         const result = bcryptjs.compare(key, hash)
//         return result
//     }
// }