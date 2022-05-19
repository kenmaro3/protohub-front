import React, { FC, useState, useEffect } from 'react';
import './searchuserlist.scss'
import { motion } from "framer-motion";

import { IUser } from '../../types/user-type';
import SearchUserItem from '../../components/searchUserItem/SearchUserItem'

interface SearchUserListProps{
    users: IUser[];
}

const SearchUserList: FC<SearchUserListProps> = (props) => {
    const [users, setUsers] = useState<IUser[]>([])
    const [usersCount, setUsersCount] = useState<number>(0)

    useEffect(() => {
        if (props.users != undefined) {
            setUsers(props.users)
            setUsersCount(props.users.length)
        }
    }, [props])

    return (
        <div className="searchUserListContainer">
            <div className="searchUserListHeader">
                {usersCount} Users Found

            </div>
            <div className={'userList'}>
                {
                    users.map(user =>
                        <motion.div key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <SearchUserItem displayImage={user.profile_picture ? true : false} user={user} />
                        </motion.div>)

                }
            </div>

        </div>
    );
};

export default SearchUserList;