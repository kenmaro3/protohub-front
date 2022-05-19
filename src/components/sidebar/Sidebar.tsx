import React, { FC, useState } from 'react';
import './sidebar.scss'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import ModalWindow from "../modalWindow/ModalWindow";
import { useAppSelector } from "../../hooks";
import Sticky from 'react-sticky-el';
import PostItemSide from "../postlist/postitemside/PostItemSide";

const Sidebar: FC = () => {
    const { isAuth } = useSelector((state: RootState) => state.auth)
    const { user } = useAppSelector(state => state.auth)
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState<boolean>(false)
    const { posts } = useAppSelector(state => state.posts)
    const handleClick = (path: string) => {
        if (isAuth) {
            return navigate(`/${path}`)
        } else {
            setShowModal(true)
        }
    }

    return (
        <Sticky className='sidebarContainer'>
            <ModalWindow setShowModal={setShowModal} showModal={showModal} />
            <div className="inside">
                <div className='menu menuFlex'>
                    <h4>My Recent Posts</h4>

                    <button onClick={() => handleClick('create')} className={'newPostButton'}>New Post</button>
                </div>

                {
                    posts.map(post => post.user.id === user.id &&
                        <div key={post.id} className={'userPostListItem'}>
                            <PostItemSide post={post} />
                        </div>
                    )

                }
            </div>
        </Sticky>


    );
};

export default Sidebar;