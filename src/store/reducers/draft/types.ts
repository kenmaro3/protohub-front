import {IDraft} from "../../../types/draft-type";
import {IUser} from "../../../types/user-type";

export interface DraftState{
    isLoading: boolean;
    error: string;
    drafts: IDraft[];
    myDrafts: IDraft[];
    sortType: DraftSortActions;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}


export enum DraftSortActions{
    SORT_BY_TIME = 'SORT_BY_TIME',
    SORT_BY_TIME_MY = 'SORT_BY_TIME_MY',
}

export enum DraftActionsEnum{
    SET_IS_LOADING = 'SET_IS_LOADING',
    SET_ERROR = 'SET_ERROR',
    SET_DRAFTS = 'SET_DRAFTS',
    SET_MYDRAFTS = 'SET_MYDRAFTS',
    ADD_DRAFT = 'ADD_DRAFT',
    SET_STATUS = 'SET_STATUS',
    UPDATE_DRAFTS = 'UPDATE_DRAFTS',
}

export interface UpdateDrafts{
    type: DraftActionsEnum.UPDATE_DRAFTS,
    payload: IUser
}


export interface SetStatus{
    type: DraftActionsEnum.SET_STATUS,
    payload: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface SetAddDraft{
    type: DraftActionsEnum.ADD_DRAFT;
    payload: IDraft;
}

export interface SetSort{
    type: DraftSortActions
}

export interface SetIsLoading{
    type: DraftActionsEnum.SET_IS_LOADING,
    payload: boolean
}
export interface SetError{
    type: DraftActionsEnum.SET_ERROR,
    payload: string
}
export interface SetDrafts{
    type: DraftActionsEnum.SET_DRAFTS,
    payload: IDraft[]
}

export interface SetMyDrafts{
    type: DraftActionsEnum.SET_MYDRAFTS,
    payload: IDraft[]
}

export type DraftsAction =
    SetIsLoading |
    SetError |
    SetDrafts |
    SetMyDrafts |
    SetSort |
    SetAddDraft |
    SetStatus |
    UpdateDrafts