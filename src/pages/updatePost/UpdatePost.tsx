import React, { FC, useEffect, useState } from 'react';
import './updatepost.scss'
import FileUpload from "../../components/fileUpload/FileUpload";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useForm } from "react-hook-form";
import PostService from "../../services/post-service";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTodayPosts, setAddPost } from "../../store/reducers/post/action-creators";
import { CircularProgress } from "@mui/material";
import { useTitle } from "../../hooks";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import DraftService from '../../services/draft-service';
import Card from "../../components/common/card/Card";
import MediaQuery from "react-responsive";

const UpdatePost: FC = () => {
    const { register, watch, handleSubmit, formState: { errors }, setValue } = useForm()
    const [file, setFile] = useState<any>(null)
    const { user } = useSelector((state: RootState) => state.auth)
    const [isError, setIsError] = useState<string>('')
    const [errMessages, setErrMessages] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [mdValue, setMdValue] = useState<string>("")


    const { post_id } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useTitle('Edit Post')


    useEffect(() => {
        (async () => {
            console.log("post Id", post_id)
            const response = await PostService.getById(Number(post_id))
            setValue("title", response.data.title)
            setValue("description", response.data.description)
            setMdValue(response.data.text)

        })();

    }, [post_id])


    const onSubmit = async (data: any) => {
        setIsLoading(true)
        try {
            console.log(typeof user.id);
            const response = await PostService.updatePost(file, String(post_id), data['title'], mdValue, user.id, data["description"])
            dispatch(setAddPost(response.data))
            dispatch(fetchTodayPosts(5))
            navigate(`/posts/${response.data.id}`)
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

    const onDraftSubmit = async (data: any) => {
        setIsLoading(true)
        try {
            const response = await DraftService.createDraft(data['title'], mdValue, user.id, data["description"])
            navigate(`/profile`)
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

    const isEditPermission = () => {
        if (user.posts === undefined) {
            return false;
        }
        const result = user.posts.filter(post => post.id === Number(post_id));
        return result.length > 0;
    };

    if (!isEditPermission()) {
        navigate(`/posts/${post_id}`);
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
                                Save as Draft{isLoading && <CircularProgress style={{ color: 'white' }} size={20} />}
                            </button>
                        </div>
                        <div className={'buttonContainer'}>
                            <button className='updateButton' onClick={handleSubmit(onSubmit)}>
                                Update Post  {isLoading && <CircularProgress style={{ color: 'white' }} size={20} />}
                            </button>
                        </div>
                    </div>

                </div>

                <div className="postInner">
                    <h2>Edit Post</h2>
                    <div className="fileUploadButton">
                        <FileUpload
                            displayImage={true}
                            handleFile={(file: File | undefined) => setFile(file)}
                        />

                    </div>

                    <div className="formGroup">
                        <div className="formGroupInfo">
                            <label className="title" htmlFor={"title"}>Title</label>
                            {errors["title"] && <p>{errors["title"].message}</p>}
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
                            <label className="title" htmlFor={"description"}>Description</label>
                            {errors["title"] && <p>{errors["title"].message}</p>}
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
                <div className={'updatePostContainer'}>
                    {contentInside()}
                </div>
            </MediaQuery>

            <MediaQuery query="(max-width: 767px)">
                <div className={'updatePostContainerMobile'}>
                    {contentInside()}
                </div>
            </MediaQuery>
        </>

    );
};

export default UpdatePost;