import {CurrentDraftAction, CurrentDraftEnum, CurrentDraftState} from "./types";
import {IDraft} from "../../../types/draft-type";

const initialState: CurrentDraftState = {
    error: '',
    draft: {} as IDraft,
    addCommentStatus: 'default',
}

export default function currentDraftReducer(state = initialState, action: CurrentDraftAction): CurrentDraftState{
    switch (action.type){
        case CurrentDraftEnum.SET_ERROR:
            return {...state, error: action.payload}
        case CurrentDraftEnum.SET_DRAFT:
            return {...state, draft: action.payload}
        default:
            return state
    }
}