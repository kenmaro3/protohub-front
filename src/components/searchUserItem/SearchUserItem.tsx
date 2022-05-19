
import React, { FC } from 'react';
import './searchuseritem.scss'
import { Link } from "react-router-dom";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { IUser } from '../../types/user-type';

TimeAgo.addDefaultLocale(en)

interface SearchUserItemProps {
    user: IUser;
    displayImage?: boolean;
}

const SearchUserItem: FC<SearchUserItemProps> = ({ user, displayImage }) => {

    return (
        <div className="searchUserItemContainer">
            <div className={'authorInfoSide'}>
                <img className='profileImage' src={user.profile_picture} alt="avatar" />
                <div className={'authorDescription'}>
                    <span className={'itemListHeader'}>
                        <Link to={`/profiles/${user.id}`} className="globalLink">
                            <span className='authorName'>
                                {user.user_name}
                            </span>
                        </Link>
                    </span>
                </div>
            </div>

        </div>

    );
};

export default SearchUserItem;