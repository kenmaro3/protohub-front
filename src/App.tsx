import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {checkAuth} from "./store/reducers/auth/action-creators";
import AppRoutes from "./components/routes/AppRoutes";
import {fetchAllPosts, fetchTodayPosts} from "./store/reducers/post/action-creators";
import {PostSortActions} from "./store/reducers/post/types";
import {DraftSortActions} from "./store/reducers/draft/types";
import FallbackComponent from "./components/errorFallback/FallbackComponent";
import {ErrorBoundary} from "react-error-boundary";
import {useNavigate} from "react-router-dom";
import { fetchAllDrafts, fetchMyDrafts } from './store/reducers/draft/action-creators';
import { RootState } from "./store";
import {useAppSelector} from "./hooks";


const App: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuth } = useSelector((state: RootState) => state.auth)
  const {user} = useAppSelector(state => state.auth)

  useEffect(() => {
    console.log("dispatch called")
    console.log(`auth: ${isAuth}, user: ${user}`)
    dispatch(fetchAllPosts(PostSortActions.SORT_BY_TIME))

    if(isAuth && user){
      console.log("dispatch for mydrafts called")
      dispatch(fetchMyDrafts(user.id, DraftSortActions.SORT_BY_TIME_MY))
    }

    dispatch(fetchTodayPosts(5))
    if(localStorage.getItem('token')){
        dispatch(checkAuth())
    }
  }, [dispatch])

  return(
      <ErrorBoundary FallbackComponent={FallbackComponent} onReset={() => navigate('/')}>
        <AppRoutes/>
      </ErrorBoundary>
  )
};

export default App;
