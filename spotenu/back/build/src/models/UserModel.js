"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = exports.UserModel = void 0;
class UserModel {
    constructor(name, email, nickname, id, role, approved, description) {
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.id = id;
        this.role = role;
        this.approved = approved;
        this.description = description;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getNickname() {
        return this.nickname;
    }
    getRole() {
        return this.role;
    }
    getDescription() {
        return this.description;
    }
    getApproval() {
        return this.seTApproval(this.approved);
    }
    seTApproval(status) {
        if (status === 1) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.UserModel = UserModel;
var UserRoles;
(function (UserRoles) {
    UserRoles["OUVINTE_NAO_PAGANTE"] = "OUVINTE N\u00C3O PAGANTE";
    UserRoles["OUVINTE_PAGANTE"] = "OUVINTE PAGANTE";
    UserRoles["BANDA"] = "BANDA";
    UserRoles["ADMIN"] = "ADMIN";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
