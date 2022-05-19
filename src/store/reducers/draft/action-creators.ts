import {
    DraftActionsEnum,
    DraftsAction,
    DraftSortActions,
    SetAddDraft,
    SetError,
    SetIsLoading,
    SetDrafts,
    SetMyDrafts,
    SetStatus,
    UpdateDrafts
} from "./types";
import {IDraft} from "../../../types/draft-type";
import {IUser} from "../../../types/user-type";
import {AppDispatch} from "../../index";
import DraftService from "../../../services/draft-service";


export const setSort = (sortType: DraftSortActions): DraftsAction => {
    return {type: sortType}
}


export const setError = (error: string): SetError => {
    return {type: DraftActionsEnum.SET_ERROR, payload: error}
}

export const setIsLoading = (isLoading: boolean): SetIsLoading => {
    return {type: DraftActionsEnum.SET_IS_LOADING, payload: isLoading}
}

export const setDrafts = (posts: IDraft[]): SetDrafts => {
    return {type: DraftActionsEnum.SET_DRAFTS, payload: posts}
}

export const setMyDrafts = (posts: IDraft[]): SetMyDrafts => {
    return {type: DraftActionsEnum.SET_MYDRAFTS, payload: posts}
}

export const setStatus = (status: 'idle' | 'loading' | 'succeeded' | 'failed'): SetStatus => {
    return {type: DraftActionsEnum.SET_STATUS, payload: status}
}

export const setAddDraft = (post: IDraft): SetAddDraft => {
    return {type: DraftActionsEnum.ADD_DRAFT, payload: post}
}

export const setUpdateDrafts = (user: IUser): UpdateDrafts => {
    return {type: DraftActionsEnum.UPDATE_DRAFTS, payload: user}
}

export const fetchAllDrafts = (sortType: DraftSortActions) => async(dispatch: AppDispatch) => {
    dispatch(setStatus('loading'))
    try{
        const response = await DraftService.getAll()
        dispatch(setStatus('succeeded'))
        dispatch(setDrafts(response.data))
        dispatch(setSort(sortType))
    }catch(e: any){
        dispatch(setError(e.response.data.message))
        dispatch(setStatus('failed'))
    }
}

export const fetchMyDrafts = (user_id: number, sortType: DraftSortActions) => async(dispatch: AppDispatch) => {
    dispatch(setStatus('loading'))
    try{
        const response = await DraftService.getMyAll(user_id)
        dispatch(setStatus('succeeded'))
        dispatch(setMyDrafts(response.data))
        dispatch(setSort(sortType))
    }catch(e: any){
        dispatch(setError(e.response.data.message))
        dispatch(setStatus('failed'))
    }
}

