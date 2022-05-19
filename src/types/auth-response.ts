import {IUser} from "./user-type";


export interface AuthResponse{
    access_token: string;
    refresh_token: string;
    user: IUser;
}