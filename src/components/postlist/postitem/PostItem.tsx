import React, { FC } from 'react';
import './postitem.scss'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Link } from "react-router-dom";
import { IPost } from "../../../types/post-type";
import { formatDate } from "../../../helpers";
import TimeAgo from 'javascript-time-ago';
import ReactTimeAgo from 'react-time-ago';
import en from 'javascript-time-ago/locale/en.json';
TimeAgo.addLocale(en)

interface PostItemProps {
    post: IPost;
    displayImage?: boolean;
}

const PostItem: FC<PostItemProps> = ({ post, displayImage }) => {

    return (
        <div className="postItemContainer">
            <div className={'authorInfo'}>
                <img className='profileImage' src={post.user.profile_picture} alt="avatar" />
                <div className={'authorDescription'}>
                    <span className={'itemListHeader'}>
                        <Link to={`/profiles/${post.user.id}`} className="globalLink">
                            <span className='authorName'>
                                {post.user.user_name}
                            </span>
                        </Link>
                        <span className='authorAction'>
                            published post
                        </span>
                    </span>
                </div>
                {/* <span className={'postDate'}>{formatDate(post.date_and_time_published)}</span> */}
                <span className='postDate' ><ReactTimeAgo date={post.date_and_time_published} locale="en-US" /></span>
            </div>

            <div className={'postItem'}>
                <div className="postItemContainer">
                    <Link to={`/posts/${post.id}`} className={'globalLink'}>
                        <div className={'postInfoTitle'}>
                            <h2>{post.title}</h2>
                        </div>
                    </Link>
                    <div className={'postReactions'}>
                        <div className={'postReactionsInfo'}>
                            <>
                                <FavoriteBorderIcon className={'postReactionsIcon'} />
                                {(() => {
                                    if (post.user_likes != undefined) {
                                        return (
                                            <span>{post.user_likes.length} Likes</span>
                                        )
                                    }
                                    else {
                                        return (
                                            <span>0 Likes</span>
                                        )

                                    }

                                })()}
                            </>
                        </div>
                        <div className={'postReactionsInfo'}>
                            <>
                                <ChatBubbleOutlineIcon className={'postReactionsIcon'} />
                                {(() => {
                                    if (post.comments != undefined) {
                                        return (
                                            <span>{post.comments.length} Comments</span>
                                        )
                                    }
                                    else {
                                        return (
                                            <span>0 Comments</span>
                                        )

                                    }

                                })()}
                            </>
                        </div>
                    </div>
                </div>
                {displayImage && <img width={200} height={100} className='postImg' src={`${post.post_image}`} alt="postPicture" />}
            </div>

        </div>
    );
};

export default PostItem;