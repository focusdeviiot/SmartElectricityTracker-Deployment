import { Role } from "./role";

export interface DecodeToken {
    username: string;
    name: string;
    role: Role;
    exp: Date;
}