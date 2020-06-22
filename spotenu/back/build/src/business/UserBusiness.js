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
    constructor(userDataBase, idGenerator, hashGenerator, tokenGenerator) {
        this.userDataBase = userDataBase;
        this.idGenerator = idGenerator;
        this.hashGenerator = hashGenerator;
        this.tokenGenerator = tokenGenerator;
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
}
exports.default = UserBusiness;
