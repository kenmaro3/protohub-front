import React, { FC, useState, useEffect } from 'react';
import './searchpostlist.scss'
import PostItem from "../postlist/postitem/PostItem";
import { motion } from "framer-motion";

import { IPost } from '../../types/post-type';


interface SearchPostListProps {
    propPosts: IPost[];
    isMobile: boolean;
    
}


const SearchPostList: FC<SearchPostListProps> = ({propPosts, isMobile}) => {
    const [posts, setPosts] = useState<IPost[]>([])
    const [postsCount, setPostsCount] = useState<number>(0)

    useEffect(() => {
        if (propPosts != undefined) {

            setPosts(propPosts)
            setPostsCount(propPosts.length)
        }
    }, [propPosts])

    return (
        <div className={`${isMobile? "searchPostListContainerMobile" : "searchPostListContainer"}`}>
            <div className="searchPostListHeader">
                {postsCount} Posts Found

            </div>
            <div className={'postList'}>
                {
                    posts.map(post =>
                        <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <PostItem displayImage={post.post_image ? true : false} post={post} isMobile={isMobile}/>
                        </motion.div>)

                }
            </div>

        </div>
    );
};

export default SearchPostList;