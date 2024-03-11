import { Exclude } from "class-transformer";
import { User } from "../interfaces/user.interface";

export class UserEntity implements User {
    id: string;
    login: string;
    @Exclude()
    password: string;
    version: number;
    createdAt: number;
    updatedAt: number;
    
    constructor(partial: Partial<UserEntity>, date: number){
        this.id = partial.id;
        this.login = partial.login;
        this.password = partial.password;
        this.version = partial.version;
        this.createdAt = date;
        this.updatedAt = date;
    }
}
