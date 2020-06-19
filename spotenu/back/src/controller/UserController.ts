import { Request, Response } from 'express'
import UserBusiness from '../business/UserBusiness'
import UserDataBase from '../data/UserDataBase'
import IdGenerator from '../services/IdGenerator'
import HashGenerator from '../services/HashGenerator'
import TokenGenerator from '../services/TokenGenerator'
import { UserRoles } from '../models/UserModel'
import BaseDataBase from '../data/BaseDataBase'

export default class UserController {
    public static userBusiness = new UserBusiness(new UserDataBase, new IdGenerator,
         new HashGenerator, new TokenGenerator)

    public static tokenGenerator = new TokenGenerator()

    public async addUser(req: Request, res: Response) {
        console.log('que comecem os jogos')
        try {
            const userInfo = {
                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password,
                role: req.body.role,
                description: req.body.description
            }
            if (!userInfo.name || !userInfo.email || !userInfo.nickname || !userInfo.password
                || !userInfo.role) {
                throw new Error('informações inválidas')
            }
            if (userInfo.password.length < 6) {
                throw new Error('mínimo caracteres não respeitado para a senha')
            }
            if (userInfo.role === UserRoles.ADMIN) {
                const verifyToken = UserController.tokenGenerator.
                    verifyToken(req.headers.authorization as string) as any
                if (verifyToken.role !== UserRoles.ADMIN) {
                    throw new Error('Só um admin pode adicionar outro admin')
                }
                if (userInfo.password.length < 10) {
                    throw new Error('mínimo caracteres não respeitado para a senha')
                }
            }
            else if (userInfo.role !== UserRoles.OUVINTE_NAO_PAGANTE &&
                userInfo.role !== UserRoles.OUVINTE_PAGANTE && userInfo.role !== UserRoles.BANDA) {
                userInfo.role = UserRoles.OUVINTE_NAO_PAGANTE
            }
            const result = await UserController.userBusiness.addUser(userInfo.name, userInfo.email, userInfo.nickname,
                userInfo.password, userInfo.role, userInfo.description)
            res.status(200).send({
                accessToken: result
            })
        }
        catch (err) {
            res.status(400).send({
                message: err.message
            })
        }
        finally {
            BaseDataBase.destroy()
        }
    }
}