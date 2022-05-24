import React, { FC, useState } from 'react';
import './createpost.scss'
import FileUpload from "../../components/fileUpload/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useForm } from "react-hook-form";
import PostService from "../../services/post-service";
import DraftService from '../../services/draft-service';
import { useNavigate } from "react-router-dom";
import { fetchTodayPosts, setAddPost } from "../../store/reducers/post/action-creators";
import { setAddDraft} from "../../store/reducers/draft/action-creators";
import { CircularProgress } from "@mui/material";
import { useTitle } from "../../hooks";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import Card from "../../components/common/card/Card";


const CreatePost: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [file, setFile] = useState<any>(null)
    const { user } = useSelector((state: RootState) => state.auth)
    const [isError, setIsError] = useState<string>('')
    const [errMessages, setErrMessages] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [mdValue, setMdValue] = useState<string>("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useTitle('Create new')


    const onSubmit = async (data: any) => {
        // const stringFromHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        setIsLoading(true)
        try {
            //const response = await PostService.createPost(file, data['Title'], stringFromHtml, user.id, data['Description'])
            const response = await PostService.createPost(file, data['title'], mdValue, user.id, data['description'])
            dispatch(setAddPost(response.data))
            dispatch(fetchTodayPosts(5))
            navigate(`/posts/${response.data.id}`)
        } catch (e: any) {
            const response = e.response.data.message
            if (Array.isArray(response)) setIsError(response[0])
            else setIsError(response)
            console.log(e.response)
            console.log(e.response.data.message)
            setErrMessages(e.response.data.message);
        } finally {
            setIsLoading(false)
        }
    }

    const onDraftSubmit = async (data: any) => {
        // const stringFromHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        setIsLoading(true)
        try {
            const response = await DraftService.createDraft(data['title'], mdValue, user.id, data["description"])
            dispatch(setAddDraft(response.data))
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

    return (
        <div className={'createPostContainer'}>
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
                            Create Post  {isLoading && <CircularProgress style={{ color: 'white' }} size={20} />}
                        </button>
                    </div>


                </div>

            </div>
            <div className={'postInner'}>
                <h2>Create New Post</h2>
                <FileUpload
                    displayImage={true}
                    handleFile={(file: File | undefined) => setFile(file)}
                />
                <div className="formGroup">
                    <div className="formGroupInfo">
                        <label htmlFor={"title"}>Title</label>
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
                        <label htmlFor={"description"}>Description</label>
                        {errors["title"] && <p>{errors["title"].message}</p>}
                    </div>
                    <input
                        {...register("description", {
                            required: { value: false, message: 'Required field' },
                            maxLength: 100,
                            validate: {
                                lessThanTen: (value) =>
                                    parseInt(value.length) < 100 || 'Must be less than 100 characters',
                            },
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
        </div >

    );
};

export default CreatePost;