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
                name, email, nickname, password, id, role, approved, description
            }).into(this.tableName);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection().select('*').from(this.tableName).where({ id });
            if (result.length === 0) {
                throw new Error('Não foi possível realizar o cadastro agora, tente novamente mais tarde');
            }
            return result;
        });
    }
    getAllBands() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection().select("*").from(this.tableName)
                .where({ role: UserModel_1.UserRoles.BANDA });
            const filteredResult = result.map(band => {
                return new UserModel_1.UserModel(band.name, band.email, band.nickname, band.id, band.role, band.approved, band.description);
            });
            return filteredResult;
        });
    }
    approveBand(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection().raw(`
        UPDATE ${this.tableName}
        SET approved = 1
        WHERE id = '${id}'
        `);
        });
    }
    getBandById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection().select('*').where({ id }).from(this.tableName);
            return result;
        });
    }
    reproveBand(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection().delete().from(this.tableName).where({ id });
        });
    }
    getUserByCredential(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = credential.includes('@') ?
                yield this.getConnection().select('*').where({ email: credential }).from(this.tableName) :
                yield this.getConnection().select('*').where({ nickname: credential }).from(this.tableName);
            return result;
        });
    }
}
exports.default = UserDataBase;
