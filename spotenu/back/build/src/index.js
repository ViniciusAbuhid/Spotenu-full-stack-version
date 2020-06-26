"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRouter_1 = require("./router/UserRouter");
const cors_1 = __importDefault(require("cors"));
const MusicRouter_1 = require("./router/MusicRouter");
exports.app = express_1.default();
dotenv_1.default.config();
exports.app.use(express_1.default.json());
exports.app.use(cors_1.default());
exports.app.use('/user', UserRouter_1.userRouter);
exports.app.use('/music', MusicRouter_1.musicRouter);
const server = exports.app.listen(3001, () => {
    if (server) {
        const address = server.address();
        console.log(`Servidor rodando em http://localhost:${address.port}`);
    }
    else {
        console.error(`Falha ao rodar o servidor.`);
    }
});
