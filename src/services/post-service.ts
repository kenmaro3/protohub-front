import api from "../http";
import {IPost} from "../types/post-type";
import {AxiosResponse} from "axios";
import {IComment} from "../types/comment-type";
import {IUser} from "../types/user-type";
import {ILike} from "../types/like-type";

export default class PostService{
    static async createPost(picture: any, title: string, text: string, user_id: number, description: string){
        const formData = new FormData()
        formData.append('picture', picture)
        formData.append('title', title)
        formData.append('text', text)
        formData.append('description', description)
        formData.append('user_id', user_id.toString())
        console.log("formData3", formData)
        return api.post<IPost>('/posts/create', formData)
    }
    
    static async createFork(original_post_id: number, original_user_id: number, destination_user_id: number){
        // TODO why didn't this work?
        // const formData = new FormData()
        // formData.append('original_user_id', original_user_id.toString())
        // formData.append('original_post_id', original_post_id.toString())
        // formData.append('destination_user_id', destination_user_id.toString())
        // return api.post<IPost>('/posts/fork', formData)

        return api.post<IPost>('/posts/fork', {original_post_id, original_user_id, destination_user_id})
    }

    static async updatePost(picture: any, post_id: string, title: string, text: string, user_id: number, description: string){
        const formData = new FormData()
        formData.append('picture', picture)
        formData.append('post_id', post_id)
        formData.append('title', title)
        formData.append('text', text)
        formData.append('description', description)
        formData.append('user_id', user_id.toString())
        return api.post<IPost>('/posts/update', formData)
    }

    static async getAll(): Promise<AxiosResponse<IPost[]>>{
        return api.get<IPost[]>('/posts')
    }

    static async getById(post_id: number): Promise<AxiosResponse<IPost>>{
        return api.get<IPost>(`/posts/post/${post_id}`)
    }
    
    static async getParentById(post_id: number): Promise<AxiosResponse<IPost[]>>{
        return api.get<IPost[]>(`/posts/parent/${post_id}`)
    }

    static async getParentTreeById(post_id: number): Promise<AxiosResponse<IPost>>{
        return api.get<IPost>(`/posts/parenttree/${post_id}`)
    }

    static async getChildTreeById(post_id: number): Promise<AxiosResponse<IPost>>{
        return api.get<IPost>(`/posts/childtree/${post_id}`)
    }

    static async getPostByKeyword(keyword: string): Promise<AxiosResponse<IPost[]>>{
        return api.get<IPost[]>(`/posts/keyword/${keyword}`)
    }

    static async deleteById(post_id: number): Promise<void>{
        api.delete<IPost>(`/posts/post/${post_id}`)
    }

    static async createComment(text: string, reproducibility: string, time_cost: string,  post_id: number, user_id: number): Promise<AxiosResponse<IComment>> {
        return api.post<IComment>('/comments', {text, reproducibility, time_cost, post_id, user_id})
    }
    static async deleteCommentById(comment_id: string): Promise<void> {
        api.delete<IComment>(`/comments/comment/${comment_id}`)
    }

    static async getTodayPosts(quantity: number): Promise<AxiosResponse<IPost[]>>{
        return api.get<IPost[]>(`/posts/today?quantity=${quantity}`)
    }
    
    static async likePost(user_id: number, post_id: number): Promise<AxiosResponse<ILike>>{
        return api.post<ILike>('/likes', {user_id, post_id})
    }

    static async unLikePost(like_id: number): Promise<void>{
        api.delete<ILike>(`/likes/like/${like_id}`)
    }

    static updatePostsById(user: IUser, posts: IPost[]): IPost[]{
        return posts.map(post => {
            if(post.user.id === user.id){
                post.user = user
                return post
            }
            return post
        })
    }

    static updatePostByComment(comment: IComment, posts: IPost[]): IPost[]{
        return posts.map(post => {
            if(post.id === comment.post.id){
                post.comments.push(comment)
                return post
            }
            return post
        })
    }

    static updatePostByLike(like: ILike, posts: IPost[]): IPost[]{
        return posts.map(post => {
            if(post.id === like.post.id){
                post.user_likes.push(like)
                return post
            }
            return post
        })
    }

    static orderByLikes(posts: IPost[]): IPost[]{
        return posts.sort((a,b) =>
            b.user_likes.length - a.user_likes.length)
    }
    static orderByComments(posts: IPost[]): IPost[]{
        return posts.sort((a, b) =>
            b.comments.length - a.comments.length);
    }
    static orderByTime(posts: IPost[]): IPost[]{
        return posts.sort((a, b) =>
            new Date(b.date_and_time_published).getTime() -
            new Date(a.date_and_time_published).getTime())
    }
}