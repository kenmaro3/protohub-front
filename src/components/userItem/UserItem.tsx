
import React, { FC } from 'react';
import './useritem.scss'
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { IUser } from '../../types/user-type';

TimeAgo.addDefaultLocale(en)

interface UserItemProps {
    user: IUser;
    displayImage?: boolean;
}

const UserItem: FC<UserItemProps> = ({ user, displayImage }) => {

    return (
        <div className="userItemContainer">
            <div className={'authorInfoSide'}>
                <img className='profileImage' src={user.profile_picture} alt="avatar" />
                <div className={'authorDescription'}>
                    <span className={'itemListHeader'}>
                        <span className='authorName'>
                            {user.user_name}
                        </span>
                    </span>
                </div>
            </div>

        </div>

    );
};

export default UserItem;