import React, { FC, useState, useEffect } from 'react';
import './treeinfo.scss'
import { IPost } from '../../types/post-type';
import { IUser } from '../../types/user-type';
import { Link, useParams, useNavigate } from "react-router-dom";

interface TreeInfoProps {
    owner: IUser;
    parent?: IPost;
    parentUser?: IUser;
    child?: IPost[];

}

const TreeInfo: FC<TreeInfoProps> = ({ parent, parentUser, owner, child}) => {
    return (
        <div className="treeInfoContainer">
            <h3>Fork Information</h3>

            <div className="parentInfo">
                {(parent && parent != undefined) ?

                    <>
                        <span className='header'>forked from</span>
                        <Link to={`/profiles/${parentUser?.id}`} className="globalLink">
                            <span className='fromUser'>{parentUser?.user_name!}</span>
                        </Link>
                        <span className='separation'>/</span>
                        <Link to={`/posts/${parent?.id}`} className="globalLink">
                            <span className='fromPost'>{parent?.title!}</span>
                        </Link>

                    </>
                    :

                    <>
                    <span className='title'>original post</span>
                    <span className='separation'>by</span>
                    <Link to={`/profiles/${owner.id}`} className="globalLink">
                        <span className='fromUser'>{owner.user_name}</span>
                    </Link>

                    </>
                }

            </div>

            <div className="childInfo">
                <span className='title'>forked</span>
                <span className='separation'>by</span>
                <span className='number'>{child?.length} posts</span>

            </div>


        </div>
    );
};

export default TreeInfo;