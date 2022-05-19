import React, { FC, useState, useEffect } from 'react';
import './profile.scss'
import FileUpload from "../../components/fileUpload/FileUpload";
import UserPostList from "../../components/userPostList/UserPostList";
import { useAppSelector } from "../../hooks";
import EditProfileForm from "../../components/editProfileForm/EditProfileForm";
import { Link, useParams } from "react-router-dom";
import NotFound from "../404/NotFound";
import { IUser } from "../../types/user-type";
import UserService from "../../services/user-service";

const Profile: FC = () => {
    const { user } = useAppSelector(state => state.auth)
    const [file, setFile] = useState<any>(null)
    const { user_id } = useParams()
    const [isCurrentUser, setIsCurrentUser] = useState<Boolean>(false)
    const [userShown, setUserShown] = useState<IUser>(user)


    useEffect(() => {
        if (user_id) {
            if (Number(user_id) == user.id) {
                setIsCurrentUser(true)
                setUserShown(user)
            }
            else {
                (async () => {
                    setIsCurrentUser(false)
                    const response = await UserService.getById(Number(user_id))
                    console.log("response: ", response)
                    setUserShown(response.data)
                })();
            }
        }
        else{
            setIsCurrentUser(true)
            setUserShown(user)

        }
    }, [user, user_id])



    return (
        <div className={'profileWrapper'}>
            <div className={'profile'}>
                {isCurrentUser
                    ? <h1>Welcome, {userShown.user_name}</h1>
                    : <h1>{userShown.user_name} 's Profile</h1>
                }
                <div className={'profileInfo'}>
                    <div className={'profileLeft'}>
                        <div className={'profileImage'}>
                            <img
                                src={file ? URL.createObjectURL(file) : userShown.profile_picture}
                                alt="profileAvatar" />
                        </div>
                        {isCurrentUser &&
                            <div className={'profileImageUpload'}>
                                <FileUpload
                                    displayImage={false}
                                    handleFile={(file: File | undefined) => setFile(file)} />
                            </div>

                        }
                    </div>
                    {isCurrentUser &&
                        <div className={'profileRight'}>
                            <h3>Information</h3>
                            <div className={'profileCredentials'}>
                                <EditProfileForm setFile={setFile} file={file} />
                            </div>
                        </div>

                    }
                </div>
            </div>
            <div className={'userPosts'}>
                <h3>Published posts</h3>
                {Object.keys(userShown).length > 0 && <UserPostList user={userShown} />}
            </div>
        </div>
    );
};

export default Profile;