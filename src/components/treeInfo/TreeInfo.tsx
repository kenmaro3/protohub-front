import React, { FC, useState, useEffect } from 'react';
import './treeinfo.scss'
import { IPost } from '../../types/post-type';
import { IUser } from '../../types/user-type';
import { Link, useParams, useNavigate } from "react-router-dom";
import InfoMenu from '../infoMenu/InfoMenu';
import InfoIcon from '@mui/icons-material/Info';

interface TreeInfoProps {
    owner: IUser;
    parent?: IPost;
    parentUser?: IUser;
    child?: IPost[];
    isMobile: boolean;

}

const TreeInfo: FC<TreeInfoProps> = ({ parent, parentUser, owner, child, isMobile}) => {
    const infoContent = "Fork shows other user make new post from your post. <br/><br/>\n\
        new forked post might have nice updates added by the user<br/><br/>\n\
        Let's have a look!!\
        "
    return (
        <div className="treeInfoContainer">
            <div className="header">
                <h3>Fork Information</h3>
                <InfoMenu info={infoContent} isMobile={isMobile}>
                    <div className="infoMark"><InfoIcon /></div>

                </InfoMenu>


            </div>
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