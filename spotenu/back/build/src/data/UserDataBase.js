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
const BaseDataBase_1 = __importDefault(require("./BaseDataBase"));
const UserModel_1 = require("../models/UserModel");
class UserDataBase extends BaseDataBase_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'Users_Spotenu';
    }
    addUser(name, email, nickname, password, id, role, description) {
        return __awaiter(this, void 0, void 0, function* () {
            let approved = role === UserModel_1.UserRoles.BANDA ? 0 : 1;
            yield this.getConnection().insert({
                name, email, nickname, password, id, role, description
            }).into(this.tableName);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection().select('*').where({ id });
            if (result.length === 0) {
                throw new Error('Banda não encontrada');
            }
            const user = new UserModel_1.UserModel(result[0].name, result[0].email, result[0].nickname, result[0].password, result[0].id, result[0].role, result[0].approved, result[0].description);
            return result;
        });
    }
}
exports.default = UserDataBase;
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
