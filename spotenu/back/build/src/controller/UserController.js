"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const BaseDataBase_1 = __importDefault(require("../data/BaseDataBase"));
class UserController {
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('que comecem os jogos');
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
                else if (userInfo.role !== UserModel_1.UserRoles.OUVINTE_NAO_PAGANTE &&
                    userInfo.role !== UserModel_1.UserRoles.OUVINTE_PAGANTE && userInfo.role !== UserModel_1.UserRoles.BANDA) {
                    userInfo.role = UserModel_1.UserRoles.OUVINTE_NAO_PAGANTE;
                }
                const result = yield UserController.userBusiness.addUser(userInfo.name, userInfo.email, userInfo.nickname, userInfo.password, userInfo.role, userInfo.description);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(400).send({
                    message: err.message
                });
            }
            finally {
                BaseDataBase_1.default.destroy();
            }
        });
    }
}
exports.default = UserController;
UserController.userBusiness = new UserBusiness_1.default(new UserDataBase_1.default, new IdGenerator_1.default, new HashGenerator_1.default, new TokenGenerator_1.default);
UserController.tokenGenerator = new TokenGenerator_1.default();
