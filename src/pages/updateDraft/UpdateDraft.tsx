import React, { FC, useEffect, useState } from 'react';
import './updatedraft.scss'
import FileUpload from "../../components/fileUpload/FileUpload";


import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMyDrafts, setAddDraft } from "../../store/reducers/draft/action-creators";
import { fetchTodayPosts, setAddPost } from "../../store/reducers/post/action-creators";
import { CircularProgress } from "@mui/material";
import { useTitle } from "../../hooks";
import MDEditor from "@uiw/react-md-editor";
import DraftService from '../../services/draft-service';
import PostService from '../../services/post-service';
import { DraftSortActions } from '../../store/reducers/draft/types';
import { useAppSelector } from "../../hooks";
import Card from "../../components/common/card/Card";
import MediaQuery from "react-responsive";

const UpdateDraft: FC = () => {
    const { register, watch, handleSubmit, formState: { errors }, setValue } = useForm()
    const [file, setFile] = useState<any>(null)
    const { user } = useSelector((state: RootState) => state.auth)
    const [isError, setIsError] = useState<string>('')
    const [errMessages, setErrMessages] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [mdValue, setMdValue] = useState<string>("")
    const { myDrafts } = useAppSelector(state => state.myDrafts)

    const { draft_id } = useParams()
    const [userId, setUserId] = useState<number>(-1);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useTitle('Edit Draft')

    useEffect(() => {
        const loadDraftForUpdate = async () => {
            const isEditPermission = () => {
                const result = myDrafts.filter(draft => draft.id === Number(draft_id));
                return result.length > 0;
            };

            if (!isEditPermission()) {
                navigate(`/`);
            }
            else {
                const result = myDrafts.filter(draft => draft.id === Number(draft_id));
                setValue("title", result[0].title)
                setValue("description", result[0].description)
                setMdValue(result[0].text)
            }
        }
        loadDraftForUpdate()

    }, [draft_id, user, myDrafts])


    const onSubmit = async (data: any) => {
        const res = window.confirm("Are you sure to post?")
        if(!res){
            return
        }
        // const stringFromHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        setIsLoading(true)
        try {
            const response = await PostService.createPost(file, data['title'], mdValue, user.id, data["description"])
            dispatch(setAddPost(response.data))
            dispatch(fetchTodayPosts(5))
            navigate(`/`)
        } catch (e: any) {
            const response = e.response.data.message
            if (Array.isArray(response)) setIsError(response[0])
            else setIsError(response)
            setErrMessages(e.response.data.message);
        } finally {
            setIsLoading(false)
        }
    }

    const onDraftSubmit = async (data: any) => {
        const res = window.confirm("Are you sure to update this draft?")
        if(!res){
            return
        }
        // const stringFromHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        setIsLoading(true)
        try {
            const response = await DraftService.updateDraft(draft_id!, data['title'], mdValue, user.id, data["description"])
            dispatch(fetchMyDrafts(user.id, DraftSortActions.SORT_BY_TIME_MY))
            navigate(`/drafts`)
        } catch (e: any) {
            const response = e.response.data.message
            if (Array.isArray(response)) setIsError(response[0])
            else setIsError(response)
            console.log(e.response)
            setErrMessages(e.response.data.message);
        } finally {
            setIsLoading(false)
        }
    }

    const cardClick = () => {
        setIsError("");
    };

    const contentInside = () => {
        return (
            <>
                {isError && <Card messages={errMessages} handleClick={cardClick} className="alertCard"></Card>}
                <div className="header">
                    <div className="actionContainer">
                        <div className={'buttonContainer'}>
                            <button className='draftButton' onClick={handleSubmit(onDraftSubmit)}>
                                Update Draft{isLoading && <CircularProgress style={{ color: 'white' }} size={20} />}
                            </button>
                        </div>
                        <div className={'buttonContainer'}>
                            <button className='updateButton' onClick={handleSubmit(onSubmit)}>
                                Create Post{isLoading && <CircularProgress style={{ color: 'white' }} size={20} />}
                            </button>
                        </div>

                    </div>

                </div>

                <div className="postInner">
                    <h2>Edit Draft</h2>
                    {/* <FileUpload
                        displayImage={true}
                        handleFile={(file: File | undefined) => setFile(file)}
                    /> */}

                    <div className="formGroup">
                        <div className="formGroupInfo">
                            <label className='title' htmlFor={"title"}>Title</label>
                            {/* {errors["title"] && <p>{errors["title"].message}</p>} */}
                        </div>
                        <input
                            {...register("title", {
                                required: { value: true, message: 'Required field' },
                                maxLength: 60,
                            })}
                        />

                    </div>

                    <div className="formGroup">
                        <div className="formGroupInfo">
                            <label className='title' htmlFor={"description"}>Description</label>
                            {/* {errors["title"] && <p>{errors["title"].message}</p>} */}
                        </div>
                        <input
                            {...register("description", {
                                required: { value: false, message: 'Required field' },
                                maxLength: 100,
                            })}
                        />

                    </div>

                    <div className="markDownEditorContainer">
                        <MDEditor
                            height={document.documentElement.clientHeight - 150}
                            value={mdValue}
                            onChange={(val) => { setMdValue(val!); }}
                        // previewOptions={{
                        //     rehypePlugins: [[rehypeSanitize]],
                        // }}

                        />
                    </div>

                </div>
            </>

        )
    }

    return (
        <>
            <MediaQuery query="(min-width: 768px)">
                <div className={'updateDraftContainer'}>
                    {contentInside()}
                </div>
            </MediaQuery>
            <MediaQuery query="(max-width: 767px)">
                <div className={'updateDraftContainerMobile'}>
                    {contentInside()}
                </div>
            </MediaQuery>
        </>
    );
};

export default UpdateDraft;