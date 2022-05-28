import React, { FC, useState } from 'react';
import './postlist.scss'
import PostItem from "./postitem/PostItem";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../store/reducers/post/action-creators";
import { PostSortActions } from "../../store/reducers/post/types";
import Loader from "../loader/Loader";
import { motion } from "framer-motion";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const PostList: FC = () => {
    const { posts, status } = useSelector((state: RootState) => state.posts)
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch()
    const [sortType, setSortType] = useState<string>("time")
    // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    //     setValue(newValue);
    //     if (newValue == 0) {
    //         dispatch(setSort(PostSortActions.SORT_BY_TIME))
    //     }
    //     else if (newValue == 1) {
    //         dispatch(setSort(PostSortActions.SORT_BY_COMMENTS))
    //     }
    //     else if (newValue == 2) {
    //         dispatch(setSort(PostSortActions.SORT_BY_LIKES))

    //     }
    // };

    const latestSelected = () => {
        dispatch(setSort(PostSortActions.SORT_BY_TIME))
        setSortType("time")
    }

    const mostLikedSelected = () => {
        dispatch(setSort(PostSortActions.SORT_BY_LIKES))
        setSortType("like")
    }

    const mostCommentedSeleted = () => {
        dispatch(setSort(PostSortActions.SORT_BY_COMMENTS))
        setSortType("comment")
    }

    return (
        <div className="postListContainer">
            {/* <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Latest" {...a11yProps(0)} />
                        <Tab label="Hot" {...a11yProps(1)} />
                        <Tab label="Best" {...a11yProps(2)} />
                    </Tabs>
                </Box>
            </Box> */}

            <div className="selectBox">
                {sortType === "time" ?
                    <div className="latestSelect selected" onClick={latestSelected}>
                        Latest
                    </div>
                    :
                    <div className="latestSelect" onClick={latestSelected}>
                        Latest
                    </div>
                }
                {sortType === "like" ?
                    <div className="mostLikedSelect selected" onClick={mostLikedSelected}>
                        Most Liked

                    </div>
                    :
                    <div className="mostLikedSelect" onClick={mostLikedSelected}>
                        Most Liked

                    </div>
                }
                {sortType === "comment" ?
                    <div className="mostCommentedSelect selected" onClick={mostCommentedSeleted}>
                        Most Commented

                    </div>
                    :
                    <div className="mostCommentedSelect" onClick={mostCommentedSeleted}>
                        Most Commented

                    </div>
                }
            </div>
            <div className={'postList'}>
                {status !== 'succeeded' ? <Loader /> : posts.length === 0 ? <div className={'noPosts'}>No posts yet</div> :
                    posts.map(post =>
                        <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <PostItem displayImage={post.post_image ? true : false} post={post} />
                        </motion.div>)
                }
            </div>

        </div>
    );
};

export default PostList;