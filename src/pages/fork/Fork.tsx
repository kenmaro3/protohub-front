import React, { useEffect, useState } from 'react';
import './fork.scss'
import { Link, useParams, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useDispatch } from "react-redux";
import { fetchPostById, likePost, setIsLiked } from "../../store/reducers/currentPost/action-creators";
import { useAppSelector, useTitle } from "../../hooks";
import { formatDate } from "../../helpers";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModalWindow from "../../components/modalWindow/ModalWindow";
import PostService from "../../services/post-service";
import { useForm } from "react-hook-form";
import Button from "../../components/common/button/Button";
import { CircularProgress } from "@mui/material";

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/atom-one-dark.css';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { IPost } from '../../types/post-type'


hljs.registerLanguage('javascript', javascript);


const Fork = () => {
    const [description, setDescription] = useState<string>("")
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { post_id } = useParams()
    const dispatch = useDispatch()
    const [isError, setIsError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { post, error, isLiked } = useAppSelector(state => state.currentPost)
    const { user, isAuth } = useAppSelector(state => state.auth)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [postShown, setPostShown] = useState<IPost>()


    useTitle(post.title)


    useEffect(() => {

        (async () => {
            hljs.initHighlighting();
            const response = await PostService.getById(Number(post_id))
            setDescription(response.data.description)
            setPostShown(response.data)

        })()
        //hljs.initHighlighting.called = false;
    }, [])

    const addLike = () => {
        if (!isAuth) {
            setShowModal(true)
        } else if (!isLiked) {
            dispatch(likePost(Number(post_id)))
        }
    }

    const onSubmit = async (data: any) => {
        try {
            if (postShown == undefined) {
                return
            }

            console.log("clicked fork")
            console.log("post.id", postShown.id)
            console.log("post.user.id", postShown.user.id)
            console.log("user.id", user.id)
            if (description == null) {
                setDescription("")
            }
            const response = await PostService.createFork(postShown.id, postShown.user.id, user.id)
            console.log("response", response)
        } catch (e: any) {
        } finally {
        }
    }


    return (
        <div className={'forkContainer'}>
            <ModalWindow showModal={showModal} setShowModal={setShowModal} />
            <div className="forkHeader">
                <div className="forkHeaderLeft">

                    <div className={'headerLeftTitle'}>
                        <div className="username">
                            {postShown?.user?.user_name}
                        </div>
                        <div className="separation">
                            /
                        </div>
                        <div className="title">
                            {postShown?.title}
                        </div>
                    </div>

                    <div className="userInfo">
                        <img src={postShown?.user?.profile_picture} alt="forkPicture" />
                        <div className="username">
                            {post?.user?.user_name}
                        </div>

                        <div className="forkedDate">

                            {postShown?.date_and_time_published != undefined ?

                                <span className={'date'}>posted at {formatDate(postShown?.date_and_time_published!)}</span>
                                :
                                <></>

                            }
                        </div>

                    </div>
                </div>

                <div className="forkHeaderRight">
                    <div className={'forkActionsInfo'}>
                        <div className="forkFork">
                            <AccountTreeIcon />
                            <div className='actionTitle'>Fork</div>
                            <span className='count'>0</span>

                        </div>
                        <div className={'forkLike'}>
                            {isLiked ? <FavoriteIcon className={'liked'} /> :
                                <FavoriteBorderIcon onClick={addLike} className={'forkActionsIcon like'} />
                            }
                            <span className='count'>{postShown?.user_likes?.length}</span>
                        </div>
                        <div className={'forkComment'}>
                            <ChatBubbleOutlineIcon className={'forkActionsIcon'} />
                            <span className='count'>{postShown?.comments?.length}</span>
                        </div>


                    </div>

                </div>

            </div>
            <div className={'forkBody'}>
                <div className="forkBodyHeader">
                    <div className="title">Create a new fork</div>
                    <div className="body"><span className='italic'>A fork</span> is a copy of a repository. Forking a repository allows you to freely experiment with changes without affecting the original post.</div>
                </div>
                <div className="forkBodyMain">
                    <div className="originalContainer">
                        <h2>From</h2>
                        <div className="pathContainer">
                            <div className="title">
                                <div className="owner">Owner</div>
                                <div className="postName">Post</div>
                            </div>
                            <div className="value">
                                <div className="userInfo">
                                    <img className='profileImage' src={postShown?.user.profile_picture} alt="avatar" />
                                    <div className="owner">{postShown?.user.user_name}</div>

                                </div>
                                <div className="seperation">/</div>
                                <div className="postName">{postShown?.title}</div>
                            </div>

                        </div>
                    </div>
                    <div className="destinationContainer">
                        <h2>To</h2>
                        <div className="pathContainer">
                            <div className="title">
                                <div className="owner">Owner</div>
                                <div className="postName">Post</div>
                            </div>
                            <div className="value">
                                <div className="userInfo">
                                    <img className='profileImage' src={user.profile_picture} alt="avatar" />
                                    <div className="owner">{user.user_name}</div>

                                </div>
                                <div className="seperation">/</div>
                                <div className="postName">{postShown?.title}</div>
                            </div>

                        </div>
                    </div>
                    <div className="explanation">
                        By default, forks are named the same as their parent post.
                    </div>

                    {true ?
                        <></>
                        :
                        <div className="customDescription">
                            <div className="title">New Description <span className='optional'>(optional)</span></div>
                            <div className="form">
                                <input
                                    name={'description'}
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    className="field__input"
                                />
                            </div>
                        </div>

                    }

                </div>
                <div className="forkBodyFooter">
                    <Button
                        className="button"
                        handleClick={handleSubmit(onSubmit)}
                        text={'Create Fork'}
                        type="submit"
                        progress={isLoading && <CircularProgress style={{ color: 'white' }} size={20} />}
                    />

                </div>
            </div>
            {/* <LatestList /> */}
        </div>
    );

}

export default Fork;