import UserBusiness from "../src/business/UserBusiness"
import { assert } from "console"

describe('testing add User', () => {
    let userDataBase = {}
    let idGeneratorClass = {}
    let hashGenCLass = {} as any
    let tokenGenarator = {}
    let musicDataBase = {}
    it('it should return an obejct with accessToken and role', async () => {
        const idGenerator = jest.fn(() => 'id')
        const hashGenerator = jest.fn(() => 'hash')
        const addUser = jest.fn(() => { })
        const generateToken = jest.fn(() => 'token')
        userDataBase = {
            addUser
        }
        idGeneratorClass = {
            idGenerator
        }
        hashGenCLass = {
            hashGenerator
        }
        tokenGenarator = {
            generateToken
        }
        const result = await new UserBusiness(userDataBase as any, idGeneratorClass as any, hashGenCLass as any,
            tokenGenarator as any, musicDataBase as any)
            .addUser('name', 'email', 'nickname', 'password', 'role')
        expect(result).toEqual({ accessToken: 'token', role: 'role' })
        expect(result.accessToken).toEqual('token')
        expect(hashGenCLass.hashGenerator).toBeCalledWith('password')
    })
})

describe('approve band', () => {
    let userDataBase = {}
    let idGeneratorClass = {}
    let hashGenCLass = {} as any
    let tokenGenarator = {}
    let musicDataBase = {}
    it('it should return en error', async () => {
        expect.assertions(1)
        try{
        let approveBand = jest.fn(() => {})
        let getBandById = jest.fn(() => {
            return [{approved: null}]
        })
        userDataBase = {
            approveBand,
            getBandById
        }

        const result =  await new UserBusiness(userDataBase as any, idGeneratorClass as any, hashGenCLass as any,
            tokenGenarator as any, musicDataBase as any).approveBand('id')
        expect(result).toEqual('oi')
        }
        catch (err) {
            expect(err.message).toBe('Não foi possível aprovar esta banda agora, tente novamente mais tarde...')
        }
    })
})