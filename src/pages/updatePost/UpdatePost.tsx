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
import DraftService from '../../services/draft-service';
import Card from "../../components/common/card/Card";
import MediaQuery from "react-responsive";
import {useAppSelector} from "../../hooks";

const UpdatePost: FC = () => {
    const { register, watch, handleSubmit, formState: { errors }, setValue } = useForm()
    const [file, setFile] = useState<any>(null)
    const { user } = useSelector((state: RootState) => state.auth)
    const [isError, setIsError] = useState<string>('')
    const [errMessages, setErrMessages] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [mdValue, setMdValue] = useState<string>("")

    const {posts} = useAppSelector(state => state.posts)


    const { post_id } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useTitle('Edit Post')


    useEffect(() => {
        (async () => {
            const isEditPermission = () => {
                const result = posts.filter(post => post.id === Number(post_id));
                if(result.length === 0){
                    return false
                }
                else{
                    return result[0].user.id === user.id
                }
            };

            if (!isEditPermission()) {
                navigate(`/posts/${post_id}`);
            }
            else {
                const response = await PostService.getById(Number(post_id))
                setValue("title", response.data.title)
                setValue("description", response.data.description)
                setMdValue(response.data.text)

            }

        })();

    }, [post_id, posts])


    const onSubmit = async (data: any) => {
        const res = window.confirm("Are you sure to update this post?")
        if(!res){
            return
        }
        setIsLoading(true)
        try {
            const response = await PostService.updatePost(file, String(post_id), data['title'], mdValue, user.id, data["description"])
            dispatch(setAddPost(response.data))
            dispatch(fetchTodayPosts(5))
            navigate(`/posts/${response.data.id}`)
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
        const res = window.confirm("Are you sure to write this post to draft?")
        if(!res){
            return
        }
        setIsLoading(true)
        try {
            const response = await DraftService.createDraft(data['title'], mdValue, user.id, data["description"])
            navigate(`/profile`)
        } catch (e: any) {
            const response = e.response.data.message
            if (Array.isArray(response)) setIsError(response[0])
            else setIsError(response)
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
                    {/* <div className="fileUploadButton">
                        <FileUpload
                            displayImage={true}
                            handleFile={(file: File | undefined) => setFile(file)}
                        />

                    </div> */}

                    
                    <div className="formGroup">
                        <div className="formGroupInfo">
                            <label className='title' htmlFor={"title"}>Title</label>
                            {errors["title"] && <p>{errors["title"].message}</p>}
                        </div>
                        <input
                            {...register("title", {
                                required: { value: true, message: 'Required field' },
                                // maxLength: 60,
                            })}
                        />

                    </div>

                    <div className="formGroup">
                        <div className="formGroupInfo">
                            <label className='title' htmlFor={"description"}>Description</label>
                            {errors["description"] && <p>{errors["description"].message}</p>}
                        </div>
                        <input
                            {...register("description", {
                                required: { value: false, message: 'Required field' },
                                // maxLength: 100,
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