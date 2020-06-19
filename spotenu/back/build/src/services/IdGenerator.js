"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class IdGenerator {
    idGenerator() {
        return uuid_1.v4();
    }
}
exports.default = IdGenerator;
