import React, { useState, useEffect } from 'react'
import DraftSidebar from "../../components/draftSidebar/DraftSidebar";
import DraftItem from "../../components/draftList/draftItem/DraftItem";
import "./draft.scss"
import { IDraft } from "../../types/draft-type";
import { DraftSortActions } from '../../store/reducers/draft/types';
import { useDispatch } from "react-redux";
import { fetchMyDrafts } from "../../store/reducers/draft/action-creators";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../hooks";
import MediaQuery from "react-responsive";


function Draft() {
    const dispatch = useDispatch()
    const [shownIndex, setShownIndex] = useState<number>(1)
    const { myDrafts } = useAppSelector(state => state.myDrafts)
    const { user } = useAppSelector(state => state.auth)

    useEffect(() => {
        if (user) {
            dispatch(fetchMyDrafts(user.id, DraftSortActions.SORT_BY_TIME_MY))
        }
    }, [user])

    
    return (
        <>
            <MediaQuery query="(min-width: 768px)">
                <div className="draftContainer">
                    <DraftSidebar isMobile={false}/>
                    <DraftItem isMobile={false}/>
                </div>
            </MediaQuery>


            <MediaQuery query="(max-width: 767px)">
                <div className="draftContainerMobile">
                    <DraftSidebar isMobile={true}/>
                    <DraftItem isMobile={true}/>
                </div>

            </MediaQuery>

        </>
    )
}

export default Draft