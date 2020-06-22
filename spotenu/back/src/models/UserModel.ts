export class UserModel {
    constructor(private name: string, private email: string, private nickname: string,
        private id: string, private role: string, private approved: number, private description?: string) { }

    public getName() {
        return this.name
    }

    public getEmail() {
        return this.email
    }

    public getNickname() {
        return this.nickname
    }

    public getRole() {
        return this.role
    }

    public getDescription() {
        return this.description
    }

    public getApproval() {
        return this.seTApproval(this.approved)
    }

    private seTApproval(status: number) {
        if (status === 1) {
            return true
        }
        else {
            return false
        }
    }
}

export enum UserRoles {
    OUVINTE_NAO_PAGANTE = 'OUVINTE NÃO PAGANTE',
    OUVINTE_PAGANTE = 'OUVINTE PAGANTE',
    BANDA = 'BANDA',
    ADMIN = 'ADMIN'
}