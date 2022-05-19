import React, { FC, useEffect, useState } from 'react';
import './editProfileForm.scss'
import Button from "../common/button/Button";
import { setError, updateUser } from "../../store/reducers/auth/action-creators";
import { useAppSelector } from "../../hooks";
import { useDispatch } from "react-redux";

interface EditProfileFormProps {
    file: File | null;
    setFile: any;
}

const EditProfileForm: FC<EditProfileFormProps> = ({ file, setFile }) => {
    const dispatch = useDispatch()
    const { user, error, isSuccess } = useAppSelector(state => state.auth)
    const [userInfo, setUserInfo] = useState({ user_name: '', email: '' })

    useEffect(() => {
        setFile(null)
        dispatch(setError(''))
        if (Object.keys(user).length > 0) {
            setUserInfo({ ...user })
        }
    }, [user, dispatch, setFile])

    const onSubmit = (e: any) => {
        e.preventDefault()
        if (user.user_name === userInfo.user_name &&
            user.email === userInfo.email && !file
        ) {
            dispatch(setError('Please, edit fields.'))
        } else {
            dispatch(updateUser(user.id, userInfo.user_name, userInfo.email, file))
        }
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }
    return (
        <form className={'editProfileForm'}>
            <label className="field field_v1">
                <input
                    name={'user_name'}
                    value={userInfo.user_name}
                    onChange={(e) => onChange(e)}
                    className="field__input"
                />
                <span className="field__label-wrap">
                    <span className="field__label">User Name</span>
                </span>
            </label>
            <label className="field field_v2">
                <input
                    name={'email'}
                    value={userInfo.email}
                    onChange={onChange}
                    className="field__input"
                />
                <span className="field__label-wrap">
                    <span className="field__label">Email</span>
                </span>
            </label>
            <div className={'submitProfileChanges'}>
                <div className={'profileSaveBtn'}>
                    <Button className={"saveBtn"} handleClick={onSubmit} type={'submit'} text={'Save'} />
                </div>
                {isSuccess === 'success' && <span className={'submitSuccess'}>Changes saved!</span>}
                {error && <span className={'submitError'}>{error}</span>}
            </div>
        </form>
    );
};

export default EditProfileForm;