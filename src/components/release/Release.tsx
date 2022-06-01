import React, {FC} from 'react'
import "./release.scss"

interface ReleaseProp{
    isMobile: boolean;
}

const Release: FC<ReleaseProp> = ({isMobile}) => {
    return (
        <div className={`${isMobile ? "releaseContainerMobile" : "releaseContainer"}`}>
            <div className="main">
                <div className="header">
                    <div className="small">
                        Platform Updates
                    </div>
                    <div className="big">
                        Released versions
                    </div>
                </div>
                <div className="mainComponents">
                    <div className="components">
                        <div className="icon">

                        </div>
                        <div className="title">
                            Version 0.0.0 (Jun 3rd, 2022)

                        </div>
                        <div className="description">
                            Launched beta version.

                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Release