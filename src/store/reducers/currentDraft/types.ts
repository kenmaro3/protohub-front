import {IDraft} from "../../../types/draft-type";

export interface CurrentDraftState{
    draft: IDraft;
    error: string;
    addCommentStatus: 'default' | 'success' | 'failed',
}

export enum CurrentDraftEnum{
    SET_ERROR = 'SET_ERROR',
    SET_DRAFT = 'SET_DRAFT',
}


export interface SetError{
    type: CurrentDraftEnum.SET_ERROR,
    payload: string;
}

export interface SetDraft{
    type: CurrentDraftEnum.SET_DRAFT,
    payload: IDraft
}

export type CurrentDraftAction =  SetError | SetDraft 