import React, {FC, useEffect, useState} from 'react';
import './userPostList.scss'
import PostItem from "../postlist/postitem/PostItem";
import {IUser} from "../../types/user-type";
import {IPost} from "../../types/post-type";
import {useAppSelector} from "../../hooks";

interface UserPostListProps{
    user: IUser
    isMobile: boolean
}

const UserPostList: FC<UserPostListProps> = ({user, isMobile}) => {
    const {posts} = useAppSelector(state => state.posts)
    const [myPosts, setMyPosts] = useState<IPost[]>([])

    useEffect(() => {
        const filteredPosts = posts.filter((post) => (
            user.id == post.user.id
        ))
        setMyPosts(filteredPosts)
    }, [])



    return (
        <div className={`${isMobile? "userPostListMobile" : "userPostList"}`}>
            {
                myPosts.length > 0 ?

                myPosts.map(post => 
                    <div key={post.id} className={'userPostListItem'}>
                        <PostItem  post={post} isMobile={isMobile}/>
                    </div>
                )

                :
                <div className="noPostContainer">
                    <div className="text">
                        No Posts yet
                    </div>
                </div>
            }
        </div>
    );
};

export default UserPostList;