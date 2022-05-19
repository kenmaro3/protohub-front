import React, {FC} from 'react';
import './home.scss'
import Sidebar from "../../components/sidebar/Sidebar";
import PostList from "../../components/postlist/PostList";
import SidebarRight from "../../components/sidebarRight/SidebarRight"

const Home: FC = () => {
    return (
        <div className={'home'}>
            <Sidebar/>
            <PostList/>
            <SidebarRight/>
        </div>
    );
};

export default Home;