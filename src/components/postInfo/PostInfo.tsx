import React, { FC, useState, useEffect } from 'react';
import { useAppSelector, useTitle } from "../../hooks";
import './postinfo.scss'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

interface PostInfoProps{
    description?: string;
    likesCount: number;
    reproducedCount: number;
    forksCount: number;
}


const PostInfo: FC<PostInfoProps> = ({description, likesCount, reproducedCount, forksCount}) => {

    return (
        <div className="postInfoContainer">
            <h3>About</h3>
            <div className='shortDescription'>{description ? description : "No Description"}</div>
            <div className="infoList">
                <div className="infoItem">
                    <FavoriteBorderIcon />
                    <span className='count'>{likesCount}</span>
                    <span className="title">likes</span>
                </div>
                <div className="infoItem">
                    <DoneOutlineIcon/>
                    <span className='count'>{reproducedCount}</span>
                    <span className="title">comments</span>
                </div>
                <div className="infoItem">
                    <AccountTreeIcon/>
                    <span className='count'>{forksCount}</span>
                    <span className="title">forks</span>
                </div>
            </div>

        </div>
    );
};

export default PostInfo;