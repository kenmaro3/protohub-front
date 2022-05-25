import React, { FC } from 'react';
import './layout.scss'
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

interface LayoutProps {
    children: React.ReactChild
}

const Layout: FC<LayoutProps> = ({ children }) => {

    return (
        <div className={'layoutContainer'}>
            <Navbar />
            <div className={'main'}>
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;