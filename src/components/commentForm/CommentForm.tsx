import React, { FC, useEffect, useState } from 'react';
import './commentform.scss'
import Button from "../common/button/Button";
import { useAppSelector } from "../../hooks";
import { useDispatch } from "react-redux";
import { createComment, updateComment} from "../../store/reducers/currentPost/action-creators";
import Select from 'react-select'
import { IComment } from '../../types/comment-type';

interface CommentFormProps{
    commentForUpdate?: IComment
    isMobile: boolean
}

const CommentForm: FC<CommentFormProps> = ({commentForUpdate, isMobile}) => {
    const reproducibilitiyOption = [
        { value: 'True', label: 'Reproducible' },
        // { value: 'False', label: 'Not Reproducible' },
        { value: '', label: 'Not Reproducible' },
    ]

    const timeCostOption = [
        { value: 'extremely_low', label: 'Extremely Low' },
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'extremely_high', label: 'Extremely High' },
    ]

    const { user, isAuth } = useAppSelector(state => state.auth)
    const { post, addCommentStatus } = useAppSelector(state => state.currentPost)
    const dispatch = useDispatch()
    const [text, setText] = useState<string>('')
    const [error, setError] = useState<string>('')

    const [reprSelected, setReprSelected] = useState<string>("null")
    const [timeCostSelected, setTimeCostSelected] = useState<string>("null")
    const [isUpdate, setIsUpdate] = useState<boolean>(false)

    useEffect(() => {
        if(commentForUpdate != undefined){
            // setReprSelected(commentForUpdate.reproducibility ? "True" : "False")
            setReprSelected(commentForUpdate.reproducibility ? "True" : "")
            setTimeCostSelected(commentForUpdate.time_cost)
            setText(commentForUpdate.text)
            setIsUpdate(true)
        }

    }, [commentForUpdate])


    const onReprChange = (value: any): void => {
        setReprSelected(value.value)
    }
    const onTimeCostChange = (value: any): void => {
        setTimeCostSelected(value.value)
    }

    const onSubmit = () => {
        if (text.length > 15) {
            setError('')
            setText('')

            if (!isUpdate){
                dispatch(createComment(text, reprSelected, timeCostSelected, post.id, user.id))
            }
            else{
                if(commentForUpdate != undefined){
                    dispatch(updateComment(text, reprSelected, timeCostSelected, post.id, user.id, commentForUpdate.id))
                }
                else{
                    setError("cannot update comment")
                }

            }
        } else {
            setError('Comment must contain at least 15 characters')
        }

    }

    return (
        <div className={`${isMobile? "commentFormMobile" : "commentForm"}`}>
            {addCommentStatus === 'success' && <div className={'commentValidationSuccess'}>Comment posted!</div>}
            {error && <div className={'commentValidationError'}>{error}</div>}

            <div className="selectContainerWhole">
                <div className="selectContainer">
                    <div className="reproducibilityContainer">
                        <div>Reproducibility of this post</div>

                        <Select className="reproducibilitySelect" options={reproducibilitiyOption} onChange={onReprChange}/>
                    </div>
                </div>
                <div className="selectContainer">
                    <div className="timeCostContainer">
                        <div>Time Cost of this post</div>
                        <Select className="timeCostSelect" options={timeCostOption} onChange={onTimeCostChange}/>
                    </div>
                </div>

            </div>
            <textarea
                value={text}
                disabled={!isAuth}
                onChange={(e: any) => setText(e.target.value)}
                placeholder={isAuth ? 'Share your expressions...' : 'Please, log in.'}
                className={'commentFormArea'}
            />
            { !isUpdate ?
                <div className={'sendButton'}><Button disabled={!isAuth} handleClick={onSubmit} text={'Send'} /></div>
            :
                <div className={'sendButton'}><Button disabled={!isAuth} handleClick={onSubmit} text={'Update'} /></div>


            }
        </div>
    );
};

export default CommentForm;