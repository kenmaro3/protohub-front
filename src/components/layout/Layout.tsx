import React, { FC } from 'react';
import './layout.scss'
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import MediaQuery from "react-responsive";

interface LayoutProps {
    children: React.ReactChild
}

const Layout: FC<LayoutProps> = ({ children }) => {

    return (
        <div className={'layoutContainer'}>
            <MediaQuery query="(min-width: 768px)">
                <Navbar isMobile={false}/>
            </MediaQuery>
            <MediaQuery query="(max-width: 767px)">
                <Navbar isMobile={true}/>

            </MediaQuery>

            <div className={'main'}>
                {children}
            </div>

            <MediaQuery query="(min-width: 768px)">
                <Footer isMobile={false}/>
            </MediaQuery>
            <MediaQuery query="(max-width: 767px)">
                <Footer isMobile={true}/>
            </MediaQuery>
        </div>
    );
};

export default Layout;