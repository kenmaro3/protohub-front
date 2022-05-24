import React, { FC, useEffect, useState, useRef } from 'react';
import './editProfileForm.scss'
import Button from "../common/button/Button";
import { setError, updateUser } from "../../store/reducers/auth/action-creators";
import { useAppSelector } from "../../hooks";
import { useDispatch } from "react-redux";
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import FileUpload from "../../components/fileUpload/FileUpload";
import AddIcon from '@mui/icons-material/Add';

interface EditProfileFormProps {
    file: File | null;
    setFile: any;
}

const EditProfileForm = () => {
    const [file, setFile] = useState<any>(null)
    const dispatch = useDispatch()
    const { user, error, isSuccess } = useAppSelector(state => state.auth)
    const [userInfo, setUserInfo] = useState({ user_name: '', email: '', description: '', github: '', twitter: '', website: '' })
    const hiddenFileInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setFile(null)
        dispatch(setError(''))
        if (Object.keys(user).length > 0) {
            setUserInfo({ ...user })
        }
    }, [user, dispatch])

    const onSubmit = (e: any) => {
        e.preventDefault()
        if (user.user_name === userInfo.user_name &&
            user.email === userInfo.email && !file && user.description === userInfo.description &&
            user.github === userInfo.github && user.twitter === userInfo.twitter && user.website === userInfo.website
        ) {
            dispatch(setError('Please, edit fields.'))
        } else {
            dispatch(updateUser(
                user.id, userInfo.user_name, userInfo.email, userInfo.description, file,
                userInfo.github, userInfo.twitter, userInfo.website
            ))
        }
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }
    const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const handleImageUpload = (file: File | undefined) => {
        console.log("here called upload")
        // setFile(file)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            console.log("yo1")
        const fileUploaded = event.target.files?.[0]
        if (fileUploaded) {
            console.log(URL.createObjectURL(fileUploaded))
            console.log("yo2")
            setFile(fileUploaded)
        }
        console.log("yo3")
        console.log(fileUploaded)
        // handleFile(fileUploaded)
    }

    const handleClick = () => {
        console.log("here1")
        hiddenFileInput.current?.click()
    }


    return (
        <div className="editProfileFormContainer">
            <form className={'editProfileForm'}>
                <div className="headerContainer">
                    <div className="title">
                        Settings
                    </div>
                    <div className={'submitContainer'}>
                        {/* <div className={'profileSaveButton'}> */}
                        {/* <Button className={"saveBtn"} handleClick={onSubmit} type={'submit'} text={'Save'} /> */}
                        <button className='button' onClick={onSubmit}>Update profile</button>
                        {isSuccess === 'success' && <span className={'submitSuccess'}>Changes saved!</span>}
                        {error && <span className={'submitError'}>{error}</span>}
                        {/* </div> */}
                    </div>
                </div>

                <div className="mainContainer">
                    <div className="imgContainer">
                        <div className={'profileImage'}>
                            <img
                                src={file ? URL.createObjectURL(file) : user.profile_picture}
                                alt="profileAvatar" />
                        </div>
                        <div className={'profileImageUpload'}>
                            {/* <FileUpload
                                displayImage={false}
                                handleFile={(file: File | undefined) => handleImageUpload(file)} /> */}
                                <div className="buttonContainer">
                                    <AddIcon />
                                    <button type="button" onClick={handleClick}>Update Image</button>
                                </div>
                            <input
                                type="file"
                                ref={hiddenFileInput}
                                style={{ display: 'none' }}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="inputContainer">
                        <div className="fieldContainer">
                            <div className="label">
                                User name
                            </div>
                            <input
                                className='input inputUsername'
                                name={'user_name'}
                                value={userInfo.user_name}
                                onChange={(e) => onChange(e)}
                            />
                        </div>

                        <div className="fieldContainer">
                            <div className="label">
                                Email addrress
                            </div>
                            <input
                                className='input inputEmail'
                                name={'email'}
                                value={userInfo.email}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                        <div className="fieldContainer">
                            <div className="label">
                                Description
                            </div>
                            <textarea
                                name={'description'}
                                value={userInfo.description}
                                onChange={(e) => onChangeTextArea(e)}
                                className="textarea"
                            />
                        </div>

                        <div className="snsContainer">
                            <div className="fieldContainer github">
                                <div className="label">
                                    <GitHubIcon />
                                    <span className="value">Github</span>
                                </div>
                                <input
                                    className='input inputSns'
                                    name={'github'}
                                    value={userInfo.github}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <div className="fieldContainer twitter">
                                <div className="label">
                                    <TwitterIcon />
                                    <span className='value'>Twitter</span>
                                </div>
                                <input
                                    className='input'
                                    name={'twitter'}
                                    value={userInfo.twitter}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>

                        </div>

                        <div className="fieldContainer">
                            <div className="label">
                                <LinkIcon />
                                <span className='value'>Website</span>
                            </div>
                            <input
                                className="input inputWebsite"
                                name={'website'}
                                value={userInfo.website}
                                onChange={(e) => onChange(e)}
                            />
                        </div>

                        <div className="footer">
                            On your profile, above excluding email address will be shown.

                        </div>

                    </div>

                </div>

            </form>

        </div>
    );
};

export default EditProfileForm;