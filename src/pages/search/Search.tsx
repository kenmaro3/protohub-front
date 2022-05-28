import React, { FC, useEffect, useState } from 'react';
import './search.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import PostService from "../../services/post-service"
import { IPost } from '../../types/post-type';
import { IUser } from '../../types/user-type';
import UserService from '../../services/user-service';
import SearchLeftList from "../../components/searchLeftList/SearchLeftList"
import SearchPostList from "../../components/searchPostList/SearchPostList"
import SearchUserList from "../../components/searchUserList/SearchUserList"
import MediaQuery from "react-responsive";

const Search: FC = () => {
    const search = useLocation().search;

    const navigate = useNavigate()

    const queryString = new URLSearchParams(search);
    const [posts, setPosts] = useState<IPost[]>([])
    const [users, setUsers] = useState<IUser[]>([])
    const [type, setType] = useState<string>("posts")
    const [contentsToLeftList, setContentsToLeftList] = useState<Map<string, number>>(new Map([]))
    const [functionsToLeftList, setFunctionToLeftList] = useState<Map<string, any>>(new Map([]))

    const queryStringHandler = async () => {

        if (queryString.get("q")) {
            const keyword = queryString.get("q") ?? ""
            const response = await PostService.getPostByKeyword(keyword)
            setPosts(response.data)

            const jumpToPosts = () => {
                navigate(`/search?q=${keyword}&type=posts`)
            }
            setFunctionToLeftList(functionsToLeftList.set("posts", jumpToPosts))
        }
        if (queryString.get("q")) {
            const keyword = queryString.get("q") ?? ""
            const response = await UserService.getByKeyword(keyword)
            setUsers(response.data)

            const jumpToUsers = () => {
                navigate(`/search?q=${keyword}&type=users`)
            }
            setFunctionToLeftList(functionsToLeftList.set("users", jumpToUsers))
        }
        if (queryString.get("type")) {
            setType(queryString.get("type") ?? "posts")
        }

    }


    useEffect(() => {
        queryStringHandler()
    }, [])

    useEffect(() => {
        queryStringHandler()
    }, [search])

    useEffect(() => {
        console.log("posts", posts)
        setContentsToLeftList(contentsToLeftList.set("posts", posts.length))

    }, [posts])

    useEffect(() => {
        console.log("users", users)
        setContentsToLeftList(contentsToLeftList.set("users", users.length))

    }, [users])


    return (
        <>
            <MediaQuery query="(min-width: 768px)">
                <div className={'searchContainer'}>
                    <SearchLeftList contents={contentsToLeftList} functions={functionsToLeftList} />

                    {(() => {
                        if (type == "posts") {
                            return (
                                <SearchPostList propPosts={posts} isMobile={false}/>
                            )
                        }
                        else {
                            return (
                                <SearchUserList propUsers={users} isMobile={false}/>
                            )
                        }
                    })()}
                </div>
            </MediaQuery>
            <MediaQuery query="(max-width: 767px)">
                <div className={'searchContainerMobile'}>
                    <SearchLeftList contents={contentsToLeftList} functions={functionsToLeftList} />

                    {(() => {
                        if (type == "posts") {
                            return (
                                <SearchPostList propPosts={posts} isMobile={true}/>
                            )
                        }
                        else {
                            return (
                                <SearchUserList propUsers={users} isMobile={true}/>
                            )
                        }
                    })()}
                </div>

            </MediaQuery>

        </>
    );
};

export default Search;