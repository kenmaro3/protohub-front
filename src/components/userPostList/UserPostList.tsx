import React, {FC} from 'react';
import './userPostList.scss'
import PostItem from "../postlist/postitem/PostItem";
import {IUser} from "../../types/user-type";
import {useAppSelector} from "../../hooks";

interface UserPostListProps{
    user: IUser
    isMobile: boolean
}

const UserPostList: FC<UserPostListProps> = ({user, isMobile}) => {
    const {posts} = useAppSelector(state => state.posts)

    return (
        <div className={`${isMobile? "userPostListMobile" : "userPostList"}`}>
            {
                posts.map(post => post.user.id === user.id &&
                    <div key={post.id} className={'userPostListItem'}>
                        <PostItem  post={post} isMobile={isMobile}/>
                    </div>
                )
            }
        </div>
    );
};

export default UserPostList;