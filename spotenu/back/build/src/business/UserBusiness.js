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
Object.defineProperty(exports, "__esModule", { value: true });
class UserBusiness {
    constructor(userDataBase, idGenerator, hashGenerator, tokenGenerator, musicDataBase) {
        this.userDataBase = userDataBase;
        this.idGenerator = idGenerator;
        this.hashGenerator = hashGenerator;
        this.tokenGenerator = tokenGenerator;
        this.musicDataBase = musicDataBase;
    }
    addUser(name, email, nickname, password, role, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.idGenerator.idGenerator();
            const hash = yield this.hashGenerator.hashGenerator(password);
            yield this.userDataBase.addUser(name, email, nickname, hash, id, role, description);
            const result = yield this.userDataBase.getUserById(id);
            const accessToken = this.tokenGenerator.generateToken({ id, role });
            return { accessToken, role };
        });
    }
    getAllBands() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('to no bisnes');
            return yield this.userDataBase.getAllBands();
        });
    }
    approveBand(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userDataBase.approveBand(id);
            const checkingApproval = yield this.userDataBase.getBandById(id);
            if (!checkingApproval[0].approved) {
                throw new Error('Não foi possível aprovar esta banda agora, tente novamente mais tarde...');
            }
        });
    }
    reproveBand(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userDataBase.reproveBand(id);
            const checkingApproval = yield this.userDataBase.getBandById(id);
            if (checkingApproval.length > 0) {
                throw new Error('Não foi possível reprovar esta banda agora, tente novamente mais tarde...');
            }
        });
    }
    getUserByCredential(credential, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userDataBase.getUserByCredential(credential);
            console.log(result[0]);
            if (!result[0].approved) {
                throw new Error('Usuário aguardando aprovação');
            }
            if (result.length <= 0) {
                throw new Error('infomações inválidas');
            }
            const checkingPassword = yield this.hashGenerator.verify(password, result[0].password);
            if (!checkingPassword) {
                throw new Error('infomações inválidas');
            }
            const accessToken = this.tokenGenerator.generateToken({ id: result[0].id, role: result[0].role });
            return { accessToken, role: result[0].role };
        });
    }
}
exports.default = UserBusiness;
