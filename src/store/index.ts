import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk'
import authReducer from "./reducers/auth";
import postsReducer from "./reducers/post";
import draftsReducer from "./reducers/draft";
import currentDraftReducer from "./reducers/currentDraft";
import currentPostReducer from "./reducers/currentPost";

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer,
    drafts: draftsReducer,
    myDrafts: draftsReducer,
    currentDraft: currentDraftReducer,
    currentPost: currentPostReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch