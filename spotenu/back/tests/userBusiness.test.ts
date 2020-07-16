import UserBusiness from "../src/business/UserBusiness"
import { assert } from "console"
import { verify } from "crypto"

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
        try {
            let approveBand = jest.fn(() => { })
            let getBandById = jest.fn(() => {
                return [{ approved: null }]
            })
            userDataBase = {
                approveBand,
                getBandById
            }

            const result = await new UserBusiness(userDataBase as any, idGeneratorClass as any, hashGenCLass as any,
                tokenGenarator as any, musicDataBase as any).approveBand('id')
            expect(result).toEqual('oi')
        }
        catch (err) {
            expect(err.message).toBe('Não foi possível aprovar esta banda agora, tente novamente mais tarde...')
        }
    })
    it('it shouldnt return anything', async () => {
        let approveBand = jest.fn(() => { })
        let getBandById = jest.fn(() => {
            return [{ approved: true }]
        })
        userDataBase = {
            approveBand,
            getBandById
        }
        const result = await new UserBusiness(userDataBase as any, idGeneratorClass as any, hashGenCLass as any,
            tokenGenarator as any, musicDataBase as any).approveBand('id')
        expect(result).toBe(undefined)
        expect(getBandById()).toHaveLength(1)
    })
})

describe('reprove band', () => {
    let userDataBase = {}
    let idGeneratorClass = {}
    let hashGenCLass = {} as any
    let tokenGenarator = {}
    let musicDataBase = {}
    it('it should return an error', async () => {
        expect.assertions(1)
        try {
            let reproveBand = jest.fn(() => { })
            let getBandById = jest.fn(() => {
                return [{ approved: true }]
            })
            userDataBase = {
                reproveBand,
                getBandById
            }
            const result = await new UserBusiness(userDataBase as any, idGeneratorClass as any, hashGenCLass as any,
                tokenGenarator as any, musicDataBase as any).reproveBand('id')
        }
        catch (err) {
            expect(err.message)
            .toBe('Não foi possível reprovar esta banda agora, tente novamente mais tarde...')
        }
    })
    it('it shouldnt return anythig', async () => {
        let reproveBand = jest.fn(() => { })
        let getBandById = jest.fn(() => {
                return []
            })
        userDataBase = {
            reproveBand,
            getBandById
        }
        const result = await new UserBusiness(userDataBase as any, idGeneratorClass as any, hashGenCLass as any,
            tokenGenarator as any, musicDataBase as any).reproveBand('id')
        expect(result).toBe(undefined)
    })
})

describe('testing get user by credential, aka login', ()=>{
    let userDataBase = {}
    let idGeneratorClass = {}
    let hashGenCLass = {} as any
    let tokenGenarator = {}
    let musicDataBase = {}
    it('it should return an error bd the credentials are not suitable with the db', async ()=>{
        expect.assertions(1)
        try {
            let getUserByCredential = jest.fn(()=>[])
            userDataBase = {
                getUserByCredential
            }
            await new UserBusiness(userDataBase as any, idGeneratorClass as any, hashGenCLass as any,
                tokenGenarator as any, musicDataBase as any).getUserByCredential('email', 'password')
        }
        catch (err) {
            expect(err.message).toBe('infomações inválidas')
        }
    })
    it('it should return an error bc the band is not approved yet', async()=>{
        expect.assertions(1)
        try {
            let getUserByCredential = jest.fn(()=>[{approved:false}])
            userDataBase = {
                getUserByCredential
            }
            await new UserBusiness(userDataBase as any, idGeneratorClass as any, hashGenCLass as any,
                tokenGenarator as any, musicDataBase as any).getUserByCredential('email', 'password')
        }
        catch (err) {
            expect(err.message).toBe('Usuário aguardando aprovação')
        }
    })
    it('it should return an error due to wrong password', async ()=> {
        expect.assertions(1)
        try{
            let getUserByCredential = jest.fn(()=>[{approved:true}])
            userDataBase = {
                getUserByCredential
            }
            let verify = jest.fn(()=> false)
            hashGenCLass = {
                verify
            }
            await new UserBusiness(userDataBase as any, idGeneratorClass as any, hashGenCLass as any,
                tokenGenarator as any, musicDataBase as any).getUserByCredential('email', 'password')
        }
        catch (err) {
            expect(err.message).toBe('infomações inválidas')
        }
    })
})