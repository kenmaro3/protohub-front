import {CurrentDraftEnum, SetError, SetDraft} from "./types";
import {IDraft} from "../../../types/draft-type";
import {AppDispatch, RootState} from "../../index";
import DraftService from "../../../services/draft-service";

export const setError = (error: string): SetError => {
    return {type: CurrentDraftEnum.SET_ERROR, payload: error}
}
export const setDraft = (draft: IDraft): SetDraft => {
    return {type: CurrentDraftEnum.SET_DRAFT, payload: draft}
}


export const fetchDraftById = (draft_id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setError(''))
    try{
        const user = getState().auth.user
        const response = await DraftService.getById(draft_id)
        if(response.data){
            dispatch(setDraft(response.data))
        }else{
            dispatch(setError('Error'))
        }
    }catch(e: any){
        dispatch(setError('Error'))
    }
}