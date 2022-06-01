import React, {FC} from 'react'
import "./news.scss";

interface NewsProp{
    isMobile: boolean;
}

const News: FC<NewsProp> = ({isMobile}) => {
    return (
        <div className={`${isMobile ? "newsContainerMobile" : "newsContainer"}`}>
            <div className="main">
                <div className="header">
                    <div className="small">
                        Our News
                    </div>
                    <div className="big">
                        News related to ProtoHub
                    </div>
                </div>
                <div className="mainComponents">
                    <div className="components">
                        <div className="icon">

                        </div>
                        <div className="title">
                            Comming
                        </div>
                        <div className="description">
                            

                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default News