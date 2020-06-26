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
exports.MusicController = void 0;
const MusicBusiness_1 = require("../business/MusicBusiness");
const MusicDataBase_1 = require("../data/MusicDataBase");
const IdGenerator_1 = __importDefault(require("../services/IdGenerator"));
const BaseDataBase_1 = __importDefault(require("../data/BaseDataBase"));
const TokenGenerator_1 = __importDefault(require("../services/TokenGenerator"));
class MusicController {
    getAllGenres(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyToken = new TokenGenerator_1.default().verifyToken(req.headers.authorization);
                if (verifyToken.role !== 'ADMIN' && verifyToken.role !== 'BANDA') {
                    throw new Error('ação restrita à administradores e bandas');
                }
                const result = yield MusicController.musicBusiness.getAllGenres();
                res.status(200).send(result);
            }
            catch (err) {
                res.status(400).send({
                    message: err.message
                });
            }
            finally {
                yield MusicDataBase_1.MusicDataBase.destroy();
            }
        });
    }
    addGenre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield MusicController.musicBusiness.addGenre(req.body.name);
                res.status(200).send({
                    message: result
                });
            }
            catch (err) {
                res.status(200).send({
                    message: err.message
                });
            }
            finally {
                yield BaseDataBase_1.default.destroy();
            }
        });
    }
    deleteGenre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MusicController.musicBusiness.deleteGenre(req.params.id);
                res.status(200).send("gênero deletado com sucesso");
            }
            catch (err) {
                res.status(400).send({
                    message: err.message
                });
            }
            finally {
                yield BaseDataBase_1.default.destroy();
            }
        });
    }
    getAllAlbuns(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyToken = new TokenGenerator_1.default().verifyToken(req.headers.authorization);
                const result = yield new MusicDataBase_1.MusicDataBase().getAllAlbunsById(verifyToken.id);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(400).send({
                    message: err.message
                });
            }
            finally {
                yield MusicDataBase_1.MusicDataBase.destroy();
            }
        });
    }
    createAlbum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyToken = new TokenGenerator_1.default().verifyToken(req.headers.authorization);
                const result = yield MusicController.musicBusiness.
                    createAlbum(req.body.name, verifyToken.id, req.body.list);
                res.status(200).send({
                    message: result
                });
            }
            catch (err) {
                res.status(400).send({
                    message: err.message
                });
            }
            finally {
                yield BaseDataBase_1.default.destroy();
            }
        });
    }
    deleteAlbum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MusicController.musicBusiness.deleteAlbum(req.params.id);
                res.status(200).send("Album deletado com sucesso");
            }
            catch (err) {
                res.status(400).send({
                    message: err.message
                });
            }
            finally {
                yield BaseDataBase_1.default.destroy();
            }
        });
    }
    getAllMusicsFromCertainAlbum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield MusicController.musicBusiness.getAllMusicsFromCertainAlbum(req.params.id);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(400).send({
                    message: err.message
                });
            }
            finally {
                yield BaseDataBase_1.default.destroy();
            }
        });
    }
    addMusic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyToken = new TokenGenerator_1.default().verifyToken(req.headers.authorization);
                if (verifyToken.role !== 'BANDA') {
                    throw new Error('função exclusiva para as bandas');
                }
                const result = yield MusicController.musicBusiness
                    .addMusic(req.body.name, req.body.componentId, req.body.link);
                res.status(200).send({
                    message: result
                });
            }
            catch (err) {
                res.status(400).send({
                    message: err.message
                });
            }
            finally {
                yield BaseDataBase_1.default.destroy();
            }
        });
    }
    deleteMusic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MusicController.musicBusiness.deleteMusic(req.params.id);
                res.status(200).send("música deletada com sucesso");
            }
            catch (err) {
                res.status(400).send({
                    message: err.message
                });
            }
            finally {
                yield BaseDataBase_1.default.destroy();
            }
        });
    }
}
exports.MusicController = MusicController;
MusicController.musicBusiness = new MusicBusiness_1.MusicBusiness(new MusicDataBase_1.MusicDataBase(), new IdGenerator_1.default());
