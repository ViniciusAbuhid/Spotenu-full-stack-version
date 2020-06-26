"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.musicRouter = void 0;
const express_1 = __importDefault(require("express"));
const MusicController_1 = require("../controller/MusicController");
exports.musicRouter = express_1.default.Router();
exports.musicRouter.put('/addGenre', new MusicController_1.MusicController().addGenre);
exports.musicRouter.get('/allGenres', new MusicController_1.MusicController().getAllGenres);
exports.musicRouter.delete('/delete/genre/:id', new MusicController_1.MusicController().deleteGenre);
exports.musicRouter.get('/allAlbuns', new MusicController_1.MusicController().getAllAlbuns);
exports.musicRouter.post('/create/album', new MusicController_1.MusicController().createAlbum);
exports.musicRouter.delete('/delete/album/:id', new MusicController_1.MusicController().deleteAlbum);
exports.musicRouter.put('/addMusic', new MusicController_1.MusicController().addMusic);
exports.musicRouter.delete('/delete/music/:id', new MusicController_1.MusicController().deleteMusic);
exports.musicRouter.get('/allMusics/:id', new MusicController_1.MusicController().getAllMusicsFromCertainAlbum);
