"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserBusiness_1 = __importDefault(require("../business/UserBusiness"));
const UserDataBase_1 = __importDefault(require("../data/UserDataBase"));
const IdGenerator_1 = __importDefault(require("../services/IdGenerator"));
const HashGenerator_1 = __importDefault(require("../services/HashGenerator"));
const TokenGenerator_1 = __importDefault(require("../services/TokenGenerator"));
const UserModel_1 = require("../models/UserModel");
class UserController {
    addUser(req, res) {
        try {
            const userInfo = {
                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password,
                role: req.body.role,
                description: req.body.description
            };
            if (!userInfo.name || !userInfo.email || !userInfo.nickname || !userInfo.password
                || !userInfo.role) {
                throw new Error('informações inválidas');
            }
            if (userInfo.password.length < 6) {
                throw new Error('mínimo caracteres não respeitado para a senha');
            }
            if (userInfo.role === UserModel_1.UserRoles.ADMIN) {
                const verifyToken = UserController.tokenGenerator.
                    verifyToken(req.headers.authorization);
                if (verifyToken.role !== UserModel_1.UserRoles.ADMIN) {
                    throw new Error('Só um admin pode adicionar outro admin');
                }
                if (userInfo.password.length < 10) {
                    throw new Error('mínimo caracteres não respeitado para a senha');
                }
            }
            const result = UserController.userBusiness.addUser(userInfo.name, userInfo.email, userInfo.nickname, userInfo.password, userInfo.role, userInfo.description);
            res.status(200).send({
                accessToken: result
            });
        }
        catch (err) {
        }
        finally {
        }
    }
}
exports.default = UserController;
UserController.userBusiness = new UserBusiness_1.default(new UserDataBase_1.default, new IdGenerator_1.default, new HashGenerator_1.default, new TokenGenerator_1.default);
UserController.tokenGenerator = new TokenGenerator_1.default();
