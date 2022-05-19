import {DraftActionsEnum, DraftsAction, DraftSortActions, DraftState} from "./types";
import DraftService from "../../../services/draft-service";

const initialState: DraftState = {
    error: '',
    isLoading: false,
    drafts: [],
    myDrafts: [],
    sortType: DraftSortActions.SORT_BY_TIME,
    status: 'idle',
}

export default function draftsReducer(state = initialState, action: DraftsAction): DraftState{
    switch(action.type){
        case DraftActionsEnum.UPDATE_DRAFTS:
            return {...state, drafts: DraftService.updateDraftsById(action.payload, state.drafts)}
        case DraftActionsEnum.ADD_DRAFT:
            return {...state, drafts: state.drafts.concat(action.payload)}
        case DraftActionsEnum.SET_STATUS:
            return {...state, status: action.payload}
        case DraftActionsEnum.SET_ERROR:
            return {...state, error: action.payload}
        case DraftActionsEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        case DraftActionsEnum.SET_DRAFTS:
            return {...state, drafts: action.payload}
        case DraftActionsEnum.SET_MYDRAFTS:
            return {...state, myDrafts: action.payload}
        case DraftSortActions.SORT_BY_TIME:
            return {...state, sortType: DraftSortActions.SORT_BY_TIME, drafts: DraftService.orderByTime(state.drafts)}
        case DraftSortActions.SORT_BY_TIME_MY:
            return {...state, sortType: DraftSortActions.SORT_BY_TIME_MY, drafts: DraftService.orderByTime(state.myDrafts)}
        default:
            return state
    }
}