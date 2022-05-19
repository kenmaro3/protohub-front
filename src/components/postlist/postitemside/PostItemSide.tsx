import React, { FC } from 'react';
import './postitemside.scss'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Link } from "react-router-dom";
import { IPost } from "../../../types/post-type";
import { formatDate } from "../../../helpers";
import TimeAgo from 'javascript-time-ago';
import ReactTimeAgo from 'react-time-ago';
import en from 'javascript-time-ago/locale/en.json';
TimeAgo.addDefaultLocale(en)

interface PostItemProps {
    post: IPost;
    displayImage?: boolean;
}

const PostItem: FC<PostItemProps> = ({ post, displayImage }) => {

    return (
        <div className={'authorInfoSide'}>
            <img className='profileImage' src={post.user.profile_picture} alt="avatar" />
            <div className={'authorDescription'}>
                <span className={'itemListHeader'}>
                    <Link to={`/profiles/${post.user.id}`} className={'globalLink'}>
                        <span className='authorName'>
                            {post.user.user_name}
                        </span>
                    </Link>
                </span>
            </div>
            <Link to={`/posts/${post.id}`} className={'globalLink'}>
                <span className='postTitle' >/{post.title}</span>
            </Link>
        </div>
    );
};

export default PostItem;