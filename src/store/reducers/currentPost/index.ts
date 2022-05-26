import {CurrentPostAction, CurrentPostEnum, CurrentPostState} from "./types";
import {IPost} from "../../../types/post-type";

const initialState: CurrentPostState = {
    error: '',
    post: {} as IPost,
    addCommentStatus: 'default',
    isLiked: false
}

export default function currentPostReducer(state = initialState, action: CurrentPostAction): CurrentPostState{
    switch (action.type){
        case CurrentPostEnum.SET_IS_LIKED:
            return {...state, isLiked: action.payload}
        case CurrentPostEnum.SET_ERROR:
            return {...state, error: action.payload}
        case CurrentPostEnum.SET_POST:
            return {...state, post: action.payload}
        case CurrentPostEnum.ADD_COMMENT:
            return {...state, post: {...state.post, comments: state.post.comments.concat(action.payload)}}
        case CurrentPostEnum.DELETE_COMMENT:
            const tmp1 = state.post.comments.filter((comment) => (
                comment.id != action.payload
            ))
            return {...state, post: {...state.post, comments: tmp1}}
        case CurrentPostEnum.UPDATE_COMMENT:
            const tmp2 = state.post.comments.filter((comment) => (
                comment.id != action.payload.id
            ))
            return {...state, post: {...state.post, comments: tmp2.concat(action.payload)}}
        case CurrentPostEnum.SET_COMMENT_STATUS:
            return {...state, addCommentStatus: action.payload}
        default:
            return state
    }
}