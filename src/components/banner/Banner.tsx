import React, { FC } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import "./banner.scss"
import NewReleasesIcon from '@mui/icons-material/NewReleases';

interface BannerProp {
    isMobile: boolean;
}

const Banner: FC<BannerProp> = ({ isMobile }) => {
    return (
        <div className={`${isMobile ? "bannerContainerMobile" : "bannerContainer"}`}>
            <div className="main">
                <div className="left">
                    <div className="title">
                        Maximize the developer's prototyping experiences

                    </div>
                    <div className="subtitle">
                        This is where the idea becomes prototype to bring the new value to the world.
                        All the developer's prototyping experience can be shared, improved and maintained in this platform.


                    </div>
                    <div className="signUp">
                        {/* <input type="text" placeholder='Email adress'/> */}
                        <Link className='link' to="/home">
                            Go To ProtoHub
                        </Link>

                    </div>

                </div>
                <div className="right">
                </div>
            </div>
            <div className="footer">
                <div className="text">
                    <NewReleasesIcon />
                    <div className="title">
                        beta version available
                    </div>
                </div>
                {/* <div className="users">
                    <div className="number">
                        100
                    </div>
                    <div className="title">
                        users
                    </div>

                </div>
                <div className="posts">
                    <div className="number">
                        120
                    </div>
                    <div className="title">
                        posts
                    </div>

                </div>
                <div className="forks">
                    <div className="number">
                        120

                    </div>
                    <div className="title">
                        forks

                    </div>
                    
                </div> */}

            </div>

        </div>

    )
}

export default Banner