import {IPost} from "./post-type";

export interface IUser{
    id: number;
    user_name: string;
    email: string;
    role: string;
    profile_picture: string;
    posts: IPost[];
}