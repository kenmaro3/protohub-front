import React, { useEffect, useState } from 'react';
import './post.scss'
import { Link, useParams, useNavigate } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Comment from "../../components/comment/Comment";
import CommentForm from "../../components/commentForm/CommentForm";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useDispatch } from "react-redux";
import { fetchPostById, likePost, unLikePost, setIsLiked, deleteComment, updateComment } from "../../store/reducers/currentPost/action-creators";
import { deletePost } from '../../store/reducers/post/action-creators';
import NotFound from "../404/NotFound";
import Loader from "../../components/loader/Loader";
import { useAppSelector, useTitle } from "../../hooks";
import { formatDate } from "../../helpers";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModalWindow from "../../components/modalWindow/ModalWindow";
import PostService from "../../services/post-service";

import TreeInfo from "../../components/treeInfo/TreeInfo"
import ReproducibilityList from "../../components/reproducibilityList/ReproducibilityList"
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/atom-one-dark.css';
import PostMenu from '../../components/postMenu/PostMenu';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PostInfo from '../../components/postInfo/PostInfo';
import { IPost } from '../../types/post-type';
import { IUser } from '../../types/user-type';
import MDEditor, { ICommand } from "@uiw/react-md-editor";
import { IComment } from '../../types/comment-type';

import {
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton,
} from "react-share";


hljs.registerLanguage('javascript', javascript);


const Post = () => {
    const { post_id } = useParams()
    const dispatch = useDispatch()
    const { post, error, isLiked } = useAppSelector(state => state.currentPost)
    const { user, isAuth } = useAppSelector(state => state.auth)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [reprList, setReprList] = useState<number[]>([])
    const [reprMapOkay, setReprMapOkay] = useState<Map<string, number>>(new Map([]))
    const [reprMapNotOkay, setReprMapNotOkay] = useState<Map<string, number>>(new Map([]))
    const [timeCostList, setTimeCostList] = useState<number[]>([])

    const [likesCount, setLikesCount] = useState<number>(0)
    const [reprCount, setReprCount] = useState<number>(0)
    const [forksCount, setForksCount] = useState<number>(0)

    const [isParentExist, setIsParentExist] = useState<boolean>(false)
    const [parent, setParent] = useState<IPost>()
    const [parentUser, setParentUser] = useState<IUser>()
    const [isChildExist, setIsChildExist] = useState<boolean>(false)
    const [child, setChild] = useState<IPost[]>([])
    const [childUser, setChildUser] = useState<IUser[]>()

    const [functionsForPostMenu, setFunctionsForPostMenu] = useState<Map<string, any>>(new Map([]))

    const [isCommentUpdate, setIsCommentUpdate] = useState<boolean>(false)
    const [commentForUpdate, setCommentForUpdate] = useState<IComment>()

    const navigate = useNavigate()
    useTitle(post.title)

    useEffect(() => {
        (async () => {
            setFunctionsForPostMenu(functionsForPostMenu.set("Edit Post", handleEdit))
            setFunctionsForPostMenu(functionsForPostMenu.set("Delete Post", handleDelete))

            const parentTree = await PostService.getParentTreeById(Number(post_id))
            if (parentTree.data.parent) {
                setIsParentExist(true)
                setParent(parentTree.data.parent)
                const retrievedParent = await PostService.getById(parentTree.data.parent.id)
                setParentUser(retrievedParent.data.user)

            }
            console.log("parentTree", parentTree)

            const childTree = await PostService.getChildTreeById(Number(post_id))
            if (childTree.data.children) {
                setIsChildExist(true)
                setChild(childTree.data.children)
                const retrievedChild = childTree.data.children.map(async (child) => {
                    const res = await PostService.getById(child.id)
                    return res.data
                })
                const childUserTmp = retrievedChild.map(async (child) => {
                    const tmp = (await child).user
                    return tmp

                })
                console.log("childTree", childTree)

            }

        })()

    }, [])

    useEffect(() => {
        configureReprList()
        configureTimeCostList()

        configureCountForInfo()

    }, [post])

    const handleDelete = () => {
        //PostService.deleteById(Number(post_id))
        dispatch(deletePost(Number(post_id)))
        navigate("/")
    }

    const handleEdit = () => {
        navigate(`/posts/${post_id}/edit`)
    }

    const commentDeleteHandler = (comment_id: number) => {
        dispatch(deleteComment(comment_id))
    
    }

    const commentUpdateHandler = (comment: IComment) => {
        setIsCommentUpdate(true)
        setCommentForUpdate(comment)

        // const repr = comment.reproducibility ? "True" : "False" 
        // dispatch(updateComment(
        //     comment.text, repr, comment.time_cost, post.id,
        //     comment.user.id, comment.id
        // ))
    
    }

    const configureCountForInfo = () => {
        if (post.user_likes != undefined && post.comments != undefined) {
            setLikesCount(post.user_likes.length)
            setReprCount(post.comments.length)
            setForksCount(1)
        }

    }

    const configureReprList = () => {
        var okayTotal = 0
        var notOkayTotal = 0

        if (post.comments != undefined) {
            var tmpDataOkay: Map<string, number> = new Map([])
            var tmpDataNotOkay: Map<string, number> = new Map([])
            post.comments.forEach((comment) => {
                const date = new Date(comment.date_and_time_published)
                const tmpString = `${date.getFullYear()}-${date.getMonth() + 1}`
                if (comment.reproducibility === true) {
                    okayTotal += 1
                    if (tmpDataOkay.has(tmpString)) {
                        tmpDataOkay.set(tmpString, tmpDataOkay.get(tmpString)! + 1)
                    }
                    else {
                        tmpDataOkay.set(tmpString, 1)
                    }
                    if (tmpDataNotOkay.has(tmpString)) {
                    }
                    else {
                        tmpDataNotOkay.set(tmpString, 0)
                    }
                }
                else if (comment.reproducibility === false) {
                    notOkayTotal += 1
                    if (tmpDataOkay.has(tmpString)) {
                    }
                    else {
                        tmpDataOkay.set(tmpString, 0)
                    }
                    if (tmpDataNotOkay.has(tmpString)) {
                        tmpDataNotOkay.set(tmpString, tmpDataNotOkay.get(tmpString)! + 1)
                    }
                    else {
                        tmpDataNotOkay.set(tmpString, 1)
                    }
                }
            })
            setReprMapOkay(tmpDataOkay)
            setReprMapNotOkay(tmpDataNotOkay)
            setReprList([okayTotal, notOkayTotal])
        }
    }

    const configureTimeCostList = () => {
        var eLowTotal = 0
        var lowTotal = 0
        var mediumTotal = 0
        var highTotal = 0
        var eHightTotal = 0

        if (post.comments != undefined) {
            post.comments.forEach((comment) => {
                if (comment.time_cost === "extremely_low") {
                    eLowTotal += 1
                }
                else if (comment.time_cost === "low") {
                    lowTotal += 1
                }
                else if (comment.time_cost === "medium") {
                    mediumTotal += 1
                }
                else if (comment.time_cost === "high") {
                    highTotal += 1
                }
                else if (comment.time_cost === "extremely_high") {
                    eHightTotal += 1
                }
            })

            setTimeCostList([eLowTotal, lowTotal, mediumTotal, highTotal, eHightTotal])

        }


    }


    const forkClicked = () => {
        navigate(`/posts/${post.id}/fork`)
    }

    useEffect(() => {
        hljs.initHighlighting();
        //hljs.initHighlighting.called = false;
    }, [])

    useEffect(() => {
        dispatch(setIsLiked(false))
        dispatch(fetchPostById(Number(post_id)))
    }, [post_id, dispatch, user])

    if (error) {
        return <NotFound />
    }

    if (Object.keys(post).length === 0 || post.id !== Number(post_id)) {
        return <Loader />
    }

    const addLike = () => {
        console.log(user.id);
        if (!isAuth) {
            setShowModal(true)
        } else if (!isLiked) {
            dispatch(likePost(Number(post_id)))
        }
        else if (isLiked) {
            const myLike = post.user_likes.filter(like => {
                return like.user.id == user.id
            })
            if (myLike.length == 0) {

            }
            else {
                dispatch(unLikePost(user.id, myLike[0].id))
            }
        }
    }



    return (
        <div className={'postContainer'}>
            <ModalWindow showModal={showModal} setShowModal={setShowModal} />
            <div className="postHeader">
                <div className="postHeaderLeft">

                    <div className={'headerLeftTitle'}>
                        <Link to={`/profiles/${post?.user?.id}`} className="globalLink">
                            <div className="username no_hightlights">
                                {post?.user?.user_name}
                            </div>
                        </Link>
                        <div className="separation">
                            /
                        </div>
                        <div className="title">
                            【{post.title}】
                        </div>
                    </div>


                    {isParentExist ?

                        <div className="forkInfo">
                            <span className='header'>forked from</span>
                            <Link to={`/profiles/${parentUser?.id}`} className="globalLink">
                                <span className='fromUser'>{parentUser?.user_name!}</span>
                            </Link>
                            <span className='separation'>/</span>
                            <Link to={`/posts/${parent?.id}`} className="globalLink">
                                <span className='fromPost'>{parent?.title!}</span>
                            </Link>

                        </div>

                        :

                        <div className="userInfo">
                            <img className="image" src={post?.user.profile_picture} alt="postPicture" />
                            <Link to={`/profiles/${post?.user.id}`} className="globalLink">
                                <div className="username">
                                    {post?.user?.user_name}
                                </div>
                            </Link>

                            <div className="postedDate">

                                <span className={'date'}>posted at {formatDate(post.date_and_time_published)}</span>
                            </div>

                        </div>

                    }

                </div>

                <div className="postHeaderRight">
                    <div className={'postActionsInfo'}>
                        <div className="postFork" onClick={forkClicked}>
                            <AccountTreeIcon />
                            <div className='actionTitle'>Fork</div>
                            <span className='count'>0</span>

                        </div>

                        <div className={'postLike'} onClick={addLike}>
                            {isLiked ? <FavoriteIcon className={'liked'} /> :
                                <FavoriteBorderIcon className={'postActionsIcon like'} />
                            }
                            <span className='count'>{post.user_likes.length}</span>
                        </div>
                        <div className={'postComment'}>
                            <ChatBubbleOutlineIcon className={'postActionsIcon'} />
                            <span className='count'>{post.comments.length}</span>
                        </div>
                    </div>

                </div>

            </div>
            <div className={'postBody'}>
                <div className="postBodyLeft">
                    <div className={'postBodyMain'}>
                        {post.post_image && <img src={`${post.post_image}`} alt="postPicture" />}
                        <div className={'postInfo'}>
                            <h1 className="title">
                                {post.title}
                            </h1>
                            <div className="postShareContainer">
                                <div className="item">
                                    <FacebookShareButton url={`https://protohub.tech/posts/${post.id}`} title={`Sharing the post 【${post.title}】from @protohub`}>
                                        <FacebookIcon size={30} round />
                                    </FacebookShareButton>
                                </div>

                                <div className="item">
                                    <TwitterShareButton
                                        url={`https://protohub.tech/posts/${post.id}`}
                                        title={`Sharing the post 【${post.title}】from @protohub`}
                                        via={post.user.user_name}
                                    >
                                        <TwitterIcon size={30} round />
                                    </TwitterShareButton>

                                </div>
                            </div>
                            {user.id === post.user.id &&
                                <div className="right">
                                    <PostMenu user={user} functions={functionsForPostMenu}>
                                        <div className="postAction">
                                            <MoreVertIcon />
                                        </div>
                                    </PostMenu>
                                </div>
                            }
                        </div>

                        <MDEditor.Markdown
                            style={{ padding: 40 }}
                            source={post.text}
                            linkTarget="_blank"
                        // previewOptions={{
                        //   linkTarget: "_blank"
                        // }}
                        />

                    </div>
                    <div className={'postComments'}>
                        <h2>Comments</h2>
                        {!isCommentUpdate ?
                            <CommentForm />
                        :
                            <CommentForm commentForUpdate={commentForUpdate}/>

                        }
                        <div className={'commentsList'}>
                            {post.comments.length > 0
                                ?
                                post.comments.map(comment => <Comment comment={comment} deleteFunction={commentDeleteHandler} updateFunction={commentUpdateHandler}/>)
                                :
                                <div className={'noComments'}>No comments yet</div>
                            }
                        </div>
                    </div>

                </div>

                <div className="postBodyRight">
                    <div>
                        {post.description ?
                            <PostInfo description={post.description} likesCount={likesCount} reproducedCount={reprCount} forksCount={forksCount} />
                            :
                            <PostInfo likesCount={likesCount} reproducedCount={reprCount} forksCount={forksCount} />
                        }
                        {(parent && parent !== undefined) && (parentUser && parentUser !== undefined) ?
                            <TreeInfo parent={parent} parentUser={parentUser} owner={post.user} child={child} />
                            :
                            <TreeInfo owner={post.user} child={child} />
                        }
                        <ReproducibilityList reprList={reprList} timeCostList={timeCostList} reprMapOkay={reprMapOkay} reprMapNotOkay={reprMapNotOkay} />
                    </div>

                </div>

            </div>
        </div>
    );

}

export default Post;