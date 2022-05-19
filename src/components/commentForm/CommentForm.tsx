import React, { FC, useState } from 'react';
import './commentform.scss'
import Button from "../common/button/Button";
import { useAppSelector } from "../../hooks";
import { useDispatch } from "react-redux";
import { createComment } from "../../store/reducers/currentPost/action-creators";
import Select from 'react-select'

const CommentForm: FC = () => {
    const reproducibilitiyOption = [
        { value: 'True', label: 'Reproducible' },
        { value: 'False', label: 'Not Reproducible' },
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

    const onReprChange = (value: any): void => {
        console.log("selected", value.value)
        setReprSelected(value.value)
    }
    const onTimeCostChange = (value: any): void => {
        console.log("selectedTime", value.value)
        setTimeCostSelected(value.value)
    }

    const onSubmit = () => {
        if (text.length > 15) {
            setError('')
            setText('')
            dispatch(createComment(text, reprSelected, timeCostSelected, post.id, user.id))
        } else {
            setError('Comment must contain at least 15 characters')
        }

    }

    return (
        <div className={'commentForm'}>
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
            <div className={'sendButton'}><Button disabled={!isAuth} handleClick={onSubmit} text={'Send'} /></div>
        </div>
    );
};

export default CommentForm;