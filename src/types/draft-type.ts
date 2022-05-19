import {IUser} from "./user-type";

export interface IDraft{
    id: number;
    title: string;
    text: string;
    date_and_time_published: Date;
    date_and_time_edited?: Date;
    user: IUser;
    description: string;
}