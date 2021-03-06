import React, { FC, useState, useRef, useEffect } from 'react';
import './navbar.scss'
import NewspaperIcon from '@mui/icons-material/Newspaper';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout, setIsAuth } from "../../store/reducers/auth/action-creators";
import { useAppSelector } from "../../hooks";
import SearchBar from '../searchBar/SearchBar';
import ProfileMenu from '../profileMenu/ProfileMenu';
import logoPng from "../../images/nav_logo.png";
import MediaQuery from "react-responsive";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import ModalWindow from "../modalWindow/ModalWindow";

interface NavBarProp {
    isMobile: boolean
}

const Navbar: FC<NavBarProp> = ({ isMobile }) => {
    const navigate = useNavigate()
    const { isAuth, user } = useAppSelector(state => state.auth)
    const [showModal, setShowModal] = useState<boolean>(false)
    const dispatch = useDispatch()

    const [functionsForProfileMenu, setFunctionsForProfileMenu] = useState<Map<string, any>>(new Map([]))
    const [isSearchShow, setIsSearchShow] = useState<boolean>(false)

    const searchClicked = () => {
        setIsSearchShow(!isSearchShow)
    }

    const handleLogout = () => {
        dispatch(logout())
        dispatch(setIsAuth(false))
        navigate('/')
    }
    const jumpToProfile = () => {
        navigate(`/profile`)
    }

    const jumpToDrafts = () => {
        navigate(`/drafts`)
    }

    useEffect(() => {
        setFunctionsForProfileMenu(functionsForProfileMenu.set("Your profile", jumpToProfile))
        setFunctionsForProfileMenu(functionsForProfileMenu.set("Your drafts", jumpToDrafts))
        setFunctionsForProfileMenu(functionsForProfileMenu.set("Sign out", handleLogout))
    }, [])

    const handleClick = (path: string) => {
        if (isAuth) {
            return navigate(`/${path}`)
        } else {
            setShowModal(true)
        }
    }

    return (
        <>
            <MediaQuery query="(min-width: 768px)">
                <div className={'navbar'}>
                    <ModalWindow setShowModal={setShowModal} showModal={showModal} />
                    <div className={'left'}>
                        <Link to={'/'} className={'globalLink'}>
                            <img src={logoPng} alt="" width="100px" />
                        </Link>
                        {/* <h1 className={'title'}>ProtoHub</h1> */}
                        <SearchBar placeholder='Search or jump to...' isMobile={false} />
                    </div>
                    <div className={'right'}>
                        {isAuth ?
                            <div className='rightMenu'>
                                <ProfileMenu user={user} functions={functionsForProfileMenu} isMobile={true}>
                                    <div className="navbarProfileImageContainer">
                                        <img className='profileImage' src={user.profile_picture} alt="avatar" />
                                        <span className="caret caret-reversed"></span>
                                    </div>
                                </ProfileMenu>
                                <button onClick={() => handleClick('create')} className={'newPostButton'}>New Post</button>
                            </div>
                            :
                            <>
                                <Link to={'/login'}>
                                    {/* <Button variant="outlined">Log in</Button> */}
                                    <button className={'loginButton'}>Log in</button>
                                </Link>
                                <Link to={'/register'}>
                                    {/* <Button variant="outlined">Create account</Button> */}
                                    <button className={'signupButton'}>Sign up</button>
                                </Link>
                            </>
                        }

                    </div>
                </div>

            </MediaQuery>

            <MediaQuery query="(max-width: 767px)">
                <div className={'navbarMobile'}>
                    <div className="top">
                        <div className={'left'}>
                            <Link to={'/'} className={'globalLink'}>
                                <img src={logoPng} alt="" width="80px" />
                            </Link>
                            {/* <h1 className={'title'}>ProtoHub</h1> */}
                            <IconButton onClick={searchClicked} className="searchIconTop">
                                <SearchIcon />
                            </IconButton>
                        </div>
                        <div className={'right'}>
                            {
                                (() => {
                                    if (isAuth) {
                                        if (isSearchShow) {
                                            return (
                                                <>
                                                    <div className="searchContainer">
                                                        <SearchBar placeholder='Search or jump to...' isMobile={true} />
                                                    </div>
                                                    <ProfileMenu user={user} functions={functionsForProfileMenu} isMobile={true}>
                                                        <div className="navbarProfileImageContainer">
                                                            <img className='profileImage' src={user.profile_picture} alt="avatar" />
                                                            <span className="caret caret-reversed"></span>
                                                        </div>
                                                    </ProfileMenu>
                                                </>
                                            )
                                        }
                                        else {
                                            return (
                                                <ProfileMenu user={user} functions={functionsForProfileMenu} isMobile={true}>
                                                    <div className="navbarProfileImageContainer">
                                                        <img className='profileImage' src={user.profile_picture} alt="avatar" />
                                                        <span className="caret caret-reversed"></span>
                                                    </div>
                                                </ProfileMenu>

                                            )

                                        }
                                    }
                                    else {
                                        if (isSearchShow) {
                                            return (
                                                <div className="searchContainer">
                                                    <SearchBar placeholder='Search or jump to...' isMobile={true} />
                                                </div>
                                            )
                                        }
                                        else {
                                            return (
                                                <div className="buttonContainer">
                                                    <Link className='link' to={'/login'}>
                                                        {/* <Button variant="outlined">Log in</Button> */}
                                                        <button className={'loginButton'}>Log in</button>
                                                    </Link>
                                                    <Link className="link" to={'/register'}>
                                                        {/* <Button variant="outlined">Create account</Button> */}
                                                        <button className={'signupButton'}>Sign up</button>
                                                    </Link>

                                                </div>


                                            )
                                        }

                                    }

                                })()

                            }

                        </div>

                    </div>
                </div>

            </MediaQuery>
        </>
    );
};

export default Navbar;