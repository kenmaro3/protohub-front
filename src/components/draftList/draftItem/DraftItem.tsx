import React, { FC, useEffect, useState } from 'react';
import './draftitem.scss'
import { Link, useParams, useNavigate } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppSelector, useTitle } from "../../../hooks";
import ModalWindow from "../../../components/modalWindow/ModalWindow";
import DraftService from "../../../services/draft-service";
import { RootState } from "../../../store";

import 'highlight.js/styles/atom-one-dark.css';
import PostMenu from '../../../components/postMenu/PostMenu';
import MDEditor from "@uiw/react-md-editor";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDraftById } from '../../../store/reducers/currentDraft/action-creators';
import { deleteDraft } from '../../../store/reducers/draft/action-creators';
import { unSetDraft } from '../../../store/reducers/currentDraft/action-creators';

interface DraftItemProp {
    isMobile: boolean;
}

const DraftItem: FC<DraftItemProp> = ({ isMobile }) => {
    const dispatch = useDispatch()
    const { user, isAuth } = useAppSelector(state => state.auth)
    const { draft } = useSelector((state: RootState) => state.currentDraft)
    const { myDrafts } = useSelector((state: RootState) => state.myDrafts)
    const [showModal, setShowModal] = useState<boolean>(false)

    const [functionsForDraftMenu, setFunctionsForDraftMenu] = useState<Map<string, any>>(new Map([]))

    const navigate = useNavigate()


    useEffect(() => {

        (async () => {
            const handleDelete = () => {
                dispatch(deleteDraft(draft.id))
                dispatch(unSetDraft(draft.id))
                navigate("/")

            }

            const handleEdit = () => {
                navigate(`/drafts/${draft.id}/edit`)
            }
            setFunctionsForDraftMenu(functionsForDraftMenu.set("Edit Draft", handleEdit))
            setFunctionsForDraftMenu(functionsForDraftMenu.set("Delete Draft", handleDelete))
        })()

    }, [draft])

    useEffect(() => {
        if (myDrafts.length > 0) {
            dispatch(fetchDraftById(myDrafts[0].id))
        }

    }, [myDrafts])


    return (
        <div className={`${isMobile ? "draftItemContainerMobile" : "draftItemContainer"}`}>
            <ModalWindow showModal={showModal} setShowModal={setShowModal} />
            <div className={'draftBody'}>
                <div className={'draftBodyMain'}>
                    <div className={'draftInfo'}>
                        <h1 className="title">
                            {draft?.title}
                        </h1>
                        <div className="right">
                            <PostMenu user={user} functions={functionsForDraftMenu} isMobile={isMobile}>
                                <div className="draftAction">
                                    <MoreVertIcon />
                                </div>

                            </PostMenu>

                        </div>
                    </div>

                    {!isMobile ?
                        <MDEditor.Markdown
                            style={{ padding: 40 }}
                            source={draft?.text}
                            linkTarget="_blank"
                            className='editor'
                        />
                        :
                        <MDEditor.Markdown
                            style={{ padding: 10 }}
                            source={draft?.text}
                            linkTarget="_blank"
                            className='editor'
                        />

                    }

                </div>
            </div>
        </div>
    );

}

export default DraftItem;