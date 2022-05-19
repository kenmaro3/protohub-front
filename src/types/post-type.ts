import {IComment} from "./comment-type";
import {IUser} from "./user-type";
import {ILike} from "./like-type";

export interface IPost{
    id: number;
    title: string;
    text: string;
    date_and_time_published: Date;
    post_image: string;
    comments: IComment[];
    user_likes: ILike[];
    user: IUser;
    parent: IPost;
    children: IPost[];
    description: string;
}