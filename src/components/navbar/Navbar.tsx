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

const Navbar: FC = () => {
    const navigate = useNavigate()
    const { isAuth, user } = useAppSelector(state => state.auth)
    const dispatch = useDispatch()

    const [functionsForProfileMenu, setFunctionsForProfileMenu] = useState<Map<string, any>>(new Map([]))

    const handleLogout = () => {
        dispatch(logout())
        dispatch(setIsAuth(false))
        navigate('/login')
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

    return (
        <div className={'navbar'}>
            <div className={'left'}>
                <Link to={'/'} className={'globalLink'}>
                    <NewspaperIcon className={'icon'} />
                </Link>
                {/* <h1 className={'title'}>ProtoHub</h1> */}
                <SearchBar placeholder='Search or jump to...' />
            </div>
            <div className={'right'}>
                {isAuth ?
                    <ProfileMenu user={user} functions={functionsForProfileMenu}>
                        <div className="navbarProfileImageContainer">
                            <img className='profileImage' src={user.profile_picture} alt="avatar" />
                            <span className="caret caret-reversed"></span>
                        </div>
                    </ProfileMenu>
                    :
                    <>
                        <Link to={'/login'}>
                            {/* <Button variant="outlined">Log in</Button> */}
                            <button className={'loginButton'}>Log in</button>
                        </Link>
                        <Link to={'/register'}>
                            {/* <Button variant="outlined">Create account</Button> */}
                            <button className={'signupButton'}>Create account</button>
                        </Link>
                    </>
                }

            </div>
        </div>
    );
};

export default Navbar;