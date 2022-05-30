import React, { FC } from 'react';
import './home.scss'
import Sidebar from "../../components/sidebar/Sidebar";
import PostList from "../../components/postlist/PostList";
import SidebarRight from "../../components/sidebarRight/SidebarRight"
import MediaQuery from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

const Home: FC = () => {
    const { isAuth } = useSelector((state: RootState) => state.auth)
    return (
        <>
            <MediaQuery query="(min-width: 768px)">
                <div className={'homeContainer'}>
                    {isAuth && <Sidebar/>}
                    <PostList isMobile={false}/>
                    <SidebarRight />
                </div>
            </MediaQuery>

            <MediaQuery query="(max-width: 767px)">
                <div className={'homeContainer'}>
                    <PostList isMobile={true}/>
                </div>

            </MediaQuery>
        </>
    );
};

export default Home;