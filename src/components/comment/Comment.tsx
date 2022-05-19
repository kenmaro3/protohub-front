import React, { FC, useState, useEffect } from 'react';
import './comment.scss'
import { IComment } from "../../types/comment-type";
import { formatDate } from "../../helpers";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PostService from "../../services/post-service";
import { useAppSelector, useTitle } from "../../hooks";
import { useNavigate } from "react-router-dom";
import CommentMenu from '../commentMenu/CommentMenu';

interface CommentProps {
    comment: IComment
}

interface CommentPopUpProps {
    actions: Map<string, any>
}


const Comment: FC<CommentProps> = ({ comment }) => {
    const { user, isAuth } = useAppSelector(state => state.auth)

    const navigate = useNavigate()

    const handleEdit = () => {
        console.log("edit clicked of", comment.id)
    }

    const handleDelete = () => {
        console.log("delete clicked of", comment.id)
        PostService.deleteCommentById(String(comment.id))
        navigate(`/posts/${comment.post.id}`)

    }


    const [functionsForCommentMenu, setFunctionsForCommentMenu] = useState<Map<string, any>>(new Map([]))
    useEffect(() => {
        setFunctionsForCommentMenu(functionsForCommentMenu.set("Edit Comment", handleEdit))
        setFunctionsForCommentMenu(functionsForCommentMenu.set("Delete Comment", handleDelete))
    }, [])

    return (
        <div className="commentContainer">


            <div className={'comment'}>
                <img src={comment.user.profile_picture} alt="avatar" />
                <div className={'commentAuthor'}>
                    <span className={'commentAuthorName'}>{comment.user.user_name} • <span className={'commentDate'}>{formatDate(comment.date_and_time_published)}</span></span>
                    <div className={'commentText'}>{comment.text}</div>
                    <div className="reproducibility">
                        <span className='title'>Reproducibility</span>
                        <>
                            {(() => {
                                console.log(comment.reproducibility)
                                if(comment.reproducibility === undefined || comment.reproducibility === null){
                                    return(
                                        <span className='value null'>not mentioned</span>
                                    )
                                }
                                else if(comment.reproducibility === true){
                                    return(
                                        <span className='value true'>reproduced</span>
                                    )
                                }
                                else if(comment.reproducibility === false){
                                    return(
                                        <span className='value false'>not reproduced</span>
                                    )
                                }
                            })()}
                        </>
                    </div>
                    <div className="timeCost">
                        <span className='title'>Time Cost</span>
                        <>
                            {(() => {
                                console.log("here", comment.time_cost)
                                if(comment.time_cost === undefined || comment.time_cost === null){
                                    return(
                                        <span className='value null'>not mentioned</span>
                                    )
                                }
                                else if(comment.time_cost === "extremely_low"){
                                    return(
                                        <span className='value extremelyLow'>extremely_low</span>
                                    )
                                }
                                else if(comment.time_cost === "low"){
                                    return(
                                        <span className='value low'>low</span>
                                    )
                                }
                                else if(comment.time_cost === "medium"){
                                    return(
                                        <span className='value medium'>medium</span>
                                    )
                                }
                                else if(comment.time_cost === "high"){
                                    return(
                                        <span className='value high'>high</span>
                                    )
                                }
                                else if(comment.time_cost === "extremely_high"){
                                    return(
                                        <span className='value extremelyHigh'>extremely_high</span>
                                    )
                                }
                            })()}
                        </>
                    </div>
                </div>
            </div>

            <div className="right">
                <CommentMenu user={user} functions={functionsForCommentMenu}>
                    <div className="commentMoreIcon">
                        <MoreVertIcon />
                    </div>

                </CommentMenu>

            </div>

        </div>
    );
};

export default Comment;