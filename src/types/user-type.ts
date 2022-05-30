import {IPost} from "./post-type";
import { IDraft } from "./draft-type";

export interface IUser{
    id: number;
    user_name: string;
    email: string;
    role: string;
    description: string;
    profile_picture: string;
    github: string;
    twitter: string;
    website: string;
}