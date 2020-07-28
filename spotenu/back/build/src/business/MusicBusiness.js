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
exports.MusicBusiness = void 0;
class MusicBusiness {
    constructor(musicDataBase, idGenerator) {
        this.musicDataBase = musicDataBase;
        this.idGenerator = idGenerator;
    }
    addGenre(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.idGenerator.idGenerator();
            yield this.musicDataBase.addGenre(name, id);
            const checkingGenre = yield this.musicDataBase.getGenreById(id);
            if (!checkingGenre[0]) {
                throw new Error('Não foi possível adicionar este gênero agora, tente novamente mais tarde...');
            }
            return 'gênero adicionado com sucesso';
        });
    }
    getAllGenres() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.musicDataBase.getAllGenres();
        });
    }
    deleteGenre(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.musicDataBase.deleteRelationBetweenGenreAndAlbum(id);
            const checkingRelation = yield this.musicDataBase.getRelationAlbumAndGenre(id);
            if (checkingRelation.length > 0) {
                throw new Error(`Não foi possível deletar as relações entre este gênero e os albuns, tente novamente mais tarde`);
            }
            yield this.musicDataBase.deleteGenre(id);
            const checkingDel = yield this.musicDataBase.getGenreById(id);
            if (checkingDel.length > 0) {
                throw new Error('Não foi possível deletar este gênero agora, tente novamente mais tarde...');
            }
        });
    }
    getAllAlbunsById(artisit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.musicDataBase.getAllAlbunsById(artisit_id);
        });
    }
    createAlbum(name, artisit_id, genresList) {
        return __awaiter(this, void 0, void 0, function* () {
            const filteringGenres = yield Promise.all(genresList.map((genre) => __awaiter(this, void 0, void 0, function* () {
                const research = yield this.musicDataBase.getGenreByName(genre.trim());
                if (!research[0]) {
                    throw new Error('Por favor, escolha somente gêneros cadastrados');
                }
                return research[0];
            })));
            const album_id = this.idGenerator.idGenerator();
            yield this.musicDataBase.createAlbum(name, album_id, artisit_id);
            const checkingAlbum = yield this.musicDataBase.getAlbumById(album_id);
            if (!checkingAlbum[0]) {
                throw new Error('Não foi possível criar este álbum agora, tente novamente mais tarde...');
            }
            yield Promise.all(filteringGenres.map((genre) => __awaiter(this, void 0, void 0, function* () {
                yield this.musicDataBase.createAlbumAndGenreRelation(album_id, genre.id);
            })));
            return 'album criado com sucesso';
        });
    }
    deleteAlbum(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.musicDataBase.deleteRelationAlbumMusic(id);
            const checkingRelation = yield this.musicDataBase.getAllMusicsFromCertainAlbum(id);
            if (checkingRelation.length > 0) {
                throw new Error('Não foi possível apagar as relações entre este album e suas músicas');
            }
            yield this.musicDataBase.deleteRelationBetweenGenreAndAlbum(null, id);
            const checkingAnotherRelation = yield this.musicDataBase.getRelationAlbumAndGenre(id);
            if (checkingAnotherRelation.length > 0) {
                throw new Error(`Não foi possível deletar as relações entre este albuns e seus gêneros
            , tente novamente mais tarde...`);
            }
            yield this.musicDataBase.deleteAlbum(id);
            const checkingDel = yield this.musicDataBase.getAlbumById(id);
            if (checkingDel.length > 0) {
                throw new Error('Este album não existe');
            }
            yield this.musicDataBase.deleteAlbum(id);
        });
    }
    addMusic(name, album_id, link) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.idGenerator.idGenerator();
            yield this.musicDataBase.addMusic(name, id, album_id, link);
            const checkingMusic = yield this.musicDataBase.getMusicById(id);
            if (!checkingMusic[0]) {
                throw new Error('Não foi possível adicionar essa música agora, tente novamente mais tarde...');
            }
            return 'Música adicionada com sucesso';
        });
    }
    getAllMusicsFromCertainAlbum(album_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.musicDataBase.getAllMusicsFromCertainAlbum(album_id);
        });
    }
    deleteMusic(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkingDel = yield this.musicDataBase.getMusicById(id);
            if (!checkingDel[0]) {
                throw new Error('Essa música não existe');
            }
            yield this.musicDataBase.deleteMusic(id);
        });
    }
    getMusicByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.musicDataBase.getMusicByName(name);
        });
    }
}
exports.MusicBusiness = MusicBusiness;
