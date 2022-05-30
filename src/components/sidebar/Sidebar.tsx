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
    const myRecentPosts = posts.filter(post => post.user.id === user.id).slice(0,10);

    return (
        <Sticky className='sidebarContainer'>
            <ModalWindow setShowModal={setShowModal} showModal={showModal} />
            <div className="inside">
                <h4 className="menu">My Recent Posts</h4>

                {
                    myRecentPosts.map(post => 
                        <div key={post.id} className={'userPostListItem'}>
                            <PostItemSide post={post} />
                        </div>
                    )
                }
                {/* {
                    posts.map(post => post.user.id === user.id &&
                        <div key={post.id} className={'userPostListItem'}>
                            <PostItemSide post={post} />
                        </div>
                    )
                } */}
            </div>
        </Sticky>


    );
};

export default Sidebar;