import React, { FC, useState, useEffect } from 'react';
import './searchpostlist.scss'
import PostItem from "../postlist/postitem/PostItem";
import { motion } from "framer-motion";

import { IPost } from '../../types/post-type';


interface SearchPostListProps {
    posts: IPost[];
}


const SearchPostList: FC<SearchPostListProps> = (props) => {
    const [posts, setPosts] = useState<IPost[]>([])
    const [postsCount, setPostsCount] = useState<number>(0)

    useEffect(() => {
        if (props.posts != undefined) {

            setPosts(props.posts)
            setPostsCount(props.posts.length)
            console.log("posts from prop", props.posts)
        }
    }, [props])

    return (
        <div className="searchPostListContainer">
            <div className="searchPostListHeader">
                {postsCount} Posts Found

            </div>
            <div className={'postList'}>
                {
                    posts.map(post =>
                        <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <PostItem displayImage={post.post_image ? true : false} post={post} />
                        </motion.div>)

                }
            </div>

        </div>
    );
};

export default SearchPostList;