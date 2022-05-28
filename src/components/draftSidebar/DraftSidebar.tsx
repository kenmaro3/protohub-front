import React, { FC, useState } from 'react';
import './draftsidebar.scss'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import ModalWindow from "../modalWindow/ModalWindow";
import { useAppSelector } from "../../hooks";
import Sticky from 'react-sticky-el';
import DraftItemSide from "../draftList/draftItemSide/DraftItemSide";
import { IDraft } from "../../types/draft-type";
import { fetchDraftById } from "../../store/reducers/currentDraft/action-creators"

interface DraftSidebarProp{
    isMobile: boolean
}


const DraftSidebar: FC<DraftSidebarProp> = ({isMobile}) => {
    const { isAuth } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState<boolean>(false)
    const { myDrafts } = useAppSelector(state => state.myDrafts)
    const handleClick = (path: string) => {
        if (isAuth) {
            return navigate(`/${path}`)
        } else {
            setShowModal(true)
        }
    }
    const itemClickHandler = (draft: IDraft) => {
        console.log(`dispatch draft: ${draft.id} / ${draft.title}`)
        dispatch(fetchDraftById(draft.id))

    }

    return (
        <Sticky className={`${isMobile? "draftSidebarContainerMobile" : "draftSidebarContainer"}`}>
            <div className="inside">
                <ModalWindow setShowModal={setShowModal} showModal={showModal} />
                <div className="headerContainer">

                    <div className='menu menuFlex'>
                        <h4>My Drafts</h4>

                        <button onClick={() => handleClick('create')} className={'newPostButton'}>New Post</button>
                    </div>
                </div>
                
                {myDrafts.map(draft =>
                    <div onClick={() => itemClickHandler(draft)} key={draft.id} className={'userDraftListItem'}>
                        <DraftItemSide draftItem={draft} isMobile={isMobile}/>
                    </div>
                )}

            </div>
        </Sticky>


    );
};

export default DraftSidebar;