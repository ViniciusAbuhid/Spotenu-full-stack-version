"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controller/UserController"));
exports.userRouter = express_1.default.Router();
exports.userRouter.post('/signup', new UserController_1.default().addUser);
exports.userRouter.get('/allBands', new UserController_1.default().getAllBands);
exports.userRouter.put('/approve/:id', new UserController_1.default().approveBand);
exports.userRouter.delete('/reprove/:id', new UserController_1.default().reproveBand);
exports.userRouter.post('/login', new UserController_1.default().login);
