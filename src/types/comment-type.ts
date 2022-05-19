import {IUser} from "./user-type";
import {IPost} from "./post-type";

export interface IComment{
    id: number;
    text: string;
    date_and_time_published: Date;
    user: IUser;
    post: IPost;
    reproducibility: boolean;
    time_cost: string;
}