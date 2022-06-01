import React from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import Banner from "../../components/banner/Banner";
import Features from '../../components/features/Features';
import News from '../news/News';
import Release from '../release/Release';
import MediaQuery from "react-responsive";

import "./top.scss"

const Top = () => {
    return (
        <>
            <MediaQuery query="(min-width: 768px)">
                <div className='topContainer'>
                    <Banner isMobile={false}/>
                    <Features isMobile={false}/>
                    <Release isMobile={false}/>
                    <News isMobile={false}/>
                </div>
            </MediaQuery>

            <MediaQuery query="(max-width: 767px)">
                <div className='topContainer'>
                    <Banner isMobile={true}/>
                    <Features isMobile={true}/>
                    <Release isMobile={true}/>
                    <News isMobile={true}/>
                </div>

            </MediaQuery>

        </>
    )
}

export default Top