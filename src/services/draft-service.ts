import api from "../http";
import {IDraft} from "../types/draft-type";
import {AxiosResponse} from "axios";
import {IComment} from "../types/comment-type";
import {IUser} from "../types/user-type";
import {ILike} from "../types/like-type";

export default class DraftService{
    static async createDraft(title: string, text: string, user_id: number, description: string){
        // const formData = new FormData()
        // formData.append('title', title)
        // formData.append('text', text)
        // formData.append('description', description)
        // formData.append('user_id', user_id.toString())
        // console.log("here===============", formData)
        return api.post<IDraft>('/drafts/create', {title, text, user_id, description})
    }
    

    static async updateDraft(draft_id: string, title: string, text: string, user_id: number, description: string){
        // const formData = new FormData()
        // formData.append('draft_id', draft_id)
        // formData.append('title', title)
        // formData.append('text', text)
        // formData.append('description', description)
        // formData.append('user_id', user_id.toString())
        return api.post<IDraft>('/drafts/update', {draft_id, title, description, text, user_id})
    }

    static async getAll(): Promise<AxiosResponse<IDraft[]>>{
        return api.get<IDraft[]>('/drafts')
    }

    static async getMyAll(user_id: number): Promise<AxiosResponse<IDraft[]>>{
        return api.get<IDraft[]>(`/drafts/user/${user_id}`)
    }

    static async getById(draft_id: number): Promise<AxiosResponse<IDraft>>{
        return api.get<IDraft>(`/drafts/draft/${draft_id}`)
    }
    
    static async getDraftByKeyword(keyword: string): Promise<AxiosResponse<IDraft[]>>{
        return api.get<IDraft[]>(`/drafts/keyword/${keyword}`)
    }

    static async deleteById(draft_id: number): Promise<void>{
        api.delete<IDraft>(`/drafts/draft/${draft_id}`)
    }

    static async getTodayDrafts(quantity: number): Promise<AxiosResponse<IDraft[]>>{
        return api.get<IDraft[]>(`/drafts/today?quantity=${quantity}`)
    }
    

    static updateDraftsById(user: IUser, drafts: IDraft[]): IDraft[]{
        return drafts.map(draft => {
            if(draft.user.id === user.id){
                draft.user = user
                return draft
            }
            return draft
        })
    }

    static orderByTime(drafts: IDraft[]): IDraft[]{
        console.log("called!!!!")
        console.log('before', drafts)
        const tmp = drafts.sort((a, b) =>
            // new Date(b.date_and_time_edited ? b.date_and_time_edited : b.date_and_time_published).getTime() -
            // new Date(a.date_and_time_edited ? a.date_and_time_edited : a.date_and_time_published).getTime())

            // new Date(a.date_and_time_edited ? a.date_and_time_edited : a.date_and_time_published).getTime()-
            // new Date(b.date_and_time_edited ? b.date_and_time_edited : b.date_and_time_published).getTime())

            // new Date(a.date_and_time_published).getTime()-
            // new Date(b.date_and_time_published).getTime())

            new Date(b.date_and_time_published).getTime()-
            new Date(a.date_and_time_published).getTime())
        
        console.log("after", tmp)
        return tmp
    }

}