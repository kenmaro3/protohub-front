import api from "../http";
import {IUser} from "../types/user-type";
import {AxiosResponse} from "axios";

export default class UserService{

    static async updateUser(
        user_id: number, user_name: string, email: string, description?: string, picture?: any,
        github?: string, twitter?: string, website?: string
        ): Promise<AxiosResponse<IUser>>{
        const formData = new FormData()
        formData.append('user_id', user_id.toString())
        formData.append('user_name', user_name)
        formData.append('email', email)
        if(description){
            formData.append('description', description)
        }
        if(picture){
            formData.append('picture', picture)
        }
        if(github){
            formData.append('github', github)
        }
        if(twitter){
            formData.append('twitter', twitter)
        }
        if(website){
            formData.append('website', website)
        }

        return api.put<IUser>('/auth/update', formData)
    }

    static async getById(user_id: number): Promise<AxiosResponse<IUser>>{
        return api.get<IUser>(`/users/user/${user_id}`)
    }

    static async getByKeyword(keyword: string): Promise<AxiosResponse<IUser[]>>{
        return api.get<IUser[]>(`/users/keyword/${keyword}`)
    }
}