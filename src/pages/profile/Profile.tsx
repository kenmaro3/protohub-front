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
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import MediaQuery from "react-responsive";

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
        else {
            setIsCurrentUser(true)
            setUserShown(user)

        }
    }, [user, user_id])

    const contentInside = () => {
        return (
            <>

            </>

        )
    }


    return (
        <>
            <MediaQuery query="(min-width: 768px)">
                <div className={'profileWrapper'}>
                    <div className={'profile'}>
                        <div className={'profileInfo'}>
                            <div className={'profileLeft'}>
                                <div className={'profileImage'}>
                                    <img
                                        src={file ? URL.createObjectURL(file) : userShown.profile_picture}
                                        alt="profileAvatar" />
                                </div>
                            </div>
                            <div className="profileRight">
                                <div className="mainContainer">
                                    <div className="name">
                                        {userShown.user_name}

                                    </div>
                                    <div className="description">
                                        {userShown.description}

                                    </div>
                                </div>
                                <div className="snsContainer">
                                    <div className="github">
                                        {userShown.github &&

                                            <a className='innerContainer' href={`https://github.com/${userShown.github}`} target="_blank">
                                                <span className='icon'>
                                                    <GitHubIcon />
                                                </span>
                                                <span className='value'>
                                                    {userShown.github}
                                                </span>
                                            </a>
                                        }

                                    </div>
                                    <div className="twitter">
                                        {userShown.twitter &&

                                            <a className='innerContainer' href={`https://twitter.com/${userShown.twitter}`} target="_blank">
                                                <span className='icon'>
                                                    <TwitterIcon />
                                                </span>
                                                <span className='value'>
                                                    {userShown.twitter}


                                                </span>

                                            </a>
                                        }

                                    </div>

                                </div>
                                <div className="webContainer">
                                    {userShown.website &&
                                        <a className='innerContainer' href={`${userShown.website}`} target="_blank">
                                            <span className='icon'>
                                                <LinkIcon />
                                            </span>
                                            <span className='value'>
                                                {userShown.website}
                                            </span>
                                        </a>
                                    }

                                </div>
                            </div>

                            {isCurrentUser &&

                                <div className="editButtonContainer">
                                    <Link to="/profile/edit">
                                        <button>Edit profile</button>
                                    </Link>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={'userPosts'}>
                        <h3>Published posts</h3>
                        {Object.keys(userShown).length > 0 && <UserPostList user={userShown} isMobile={false}/>}
                    </div>
                </div>

            </MediaQuery>



            <MediaQuery query="(max-width: 767px)">
                <div className={'profileWrapperMobile'}>
                    <div className={'profile'}>
                        <div className={'profileInfo'}>
                            <div className={'profileLeft'}>
                                <div className={'profileImage'}>
                                    <img
                                        src={file ? URL.createObjectURL(file) : userShown.profile_picture}
                                        alt="profileAvatar" />
                                </div>
                            </div>
                            <div className="profileRight">
                                <div className="mainContainer">
                                    <div className="name">
                                        <div className="text">
                                            {userShown.user_name}
                                        </div>

                                        {isCurrentUser &&

                                            <div className="editButtonContainer">
                                                <Link to="/profile/edit">
                                                    <button>Edit profile</button>
                                                </Link>
                                            </div>
                                        }
                                    </div>
                                    <div className="description">
                                        {userShown.description}

                                    </div>
                                </div>
                                <div className="snsContainer">
                                    <div className="github">
                                        {userShown.github &&

                                            <a className='innerContainer' href={`https://github.com/${userShown.github}`} target="_blank">
                                                <span className='icon'>
                                                    <GitHubIcon />
                                                </span>
                                                <span className='value'>
                                                    {userShown.github}
                                                </span>
                                            </a>
                                        }

                                    </div>
                                    <div className="twitter">
                                        {userShown.twitter &&

                                            <a className='innerContainer' href={`https://twitter.com/${userShown.twitter}`} target="_blank">
                                                <span className='icon'>
                                                    <TwitterIcon />
                                                </span>
                                                <span className='value'>
                                                    {userShown.twitter}


                                                </span>

                                            </a>
                                        }

                                    </div>

                                </div>
                                <div className="webContainer">
                                    {userShown.website &&
                                        <a className='innerContainer' href={`${userShown.website}`} target="_blank">
                                            <span className='icon'>
                                                <LinkIcon />
                                            </span>
                                            <span className='value'>
                                                {userShown.website}
                                            </span>
                                        </a>
                                    }

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className={'userPosts'}>
                        <h3>Published posts</h3>
                        {Object.keys(userShown).length > 0 ?
                        <UserPostList user={userShown} isMobile={true}/>

                        :

                        <div className="noPostContainer">
                            <div className="text">No Posts yet</div>
                        </div>
                    
                    }
                    </div>
                </div>

            </MediaQuery>

        </>
    );
};

export default Profile;