import React, { FC, useEffect, useState } from 'react';
import './draftitem.scss'
import { Link, useParams, useNavigate } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppSelector, useTitle } from "../../../hooks";
import ModalWindow from "../../../components/modalWindow/ModalWindow";
import DraftService from "../../../services/draft-service";

import 'highlight.js/styles/atom-one-dark.css';
import PostMenu from '../../../components/postMenu/PostMenu';
import MDEditor from "@uiw/react-md-editor";
import { useDispatch } from 'react-redux';
import { fetchDraftById } from '../../../store/reducers/currentDraft/action-creators';

const DraftItem: FC = () => {
    const dispatch = useDispatch()
    const { user, isAuth } = useAppSelector(state => state.auth)
    const { draft } = useAppSelector(state => state.currentDraft)
    const { myDrafts } = useAppSelector(state => state.myDrafts)
    const [showModal, setShowModal] = useState<boolean>(false)

    const [functionsForDraftMenu, setFunctionsForDraftMenu] = useState<Map<string, any>>(new Map([]))

    const navigate = useNavigate()

    const handleDelete = () => {
        DraftService.deleteById(draft.id)
        navigate("/")
    }

    const handleEdit = () => {
        navigate(`/drafts/${draft.id}/edit`)
    }

    useEffect(() => {

        (async () => {
            setFunctionsForDraftMenu(functionsForDraftMenu.set("Edit Draft", handleEdit))
            setFunctionsForDraftMenu(functionsForDraftMenu.set("Delete Draft", handleDelete))
        })()

    }, [])

    useEffect(() => {
        console.log("myDrafts: ", myDrafts)
        if (myDrafts.length > 0) {
            dispatch(fetchDraftById(myDrafts[0].id))
        }

    }, [myDrafts])


    return (
        <div className={'draftItemContainer'}>
            <ModalWindow showModal={showModal} setShowModal={setShowModal} />
            <div className={'draftBody'}>
                <div className={'draftBodyMain'}>
                    <div className={'draftInfo'}>
                        <h1 className="title">
                            {draft?.title}
                        </h1>
                        <div className="right">
                            <PostMenu user={user} functions={functionsForDraftMenu}>
                                <div className="draftAction">
                                    <MoreVertIcon />
                                </div>

                            </PostMenu>

                        </div>
                    </div>

                    <MDEditor.Markdown
                        style={{ padding: 40 }}
                        source={draft?.text}
                        linkTarget="_blank"
                    // previewOptions={{
                    //   linkTarget: "_blank"
                    // }}
                    />

                </div>


            </div>
        </div>
    );

}

export default DraftItem;