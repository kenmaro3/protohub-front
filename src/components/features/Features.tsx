import React, {FC} from 'react'
import "./features.scss";

import Vector from '../../assets/key-feature/vector.svg';
import Editing from '../../assets/key-feature/editing.svg';
import Speed from '../../assets/key-feature/speed.svg';

interface FeaturesProp {
    isMobile: boolean
}

const Features: FC<FeaturesProp> = ({isMobile}) => {
    return (
        <div className={`${isMobile ? "featuresContainerMobile" : "featuresContainer"}`}>
            <div className="main">
                <div className="header">
                    <div className="small">
                        What you can do with ProroHub
                    </div>
                    <div className="big">
                        Find the hint to bring your idea to the world
                    </div>
                </div>
                <div className="mainComponents">
                    <div className="components">
                        <div className="icon">
                            <img src={Speed} alt="Icon" />
                        </div>
                        <div className="title">
                            Reproducibility attached to the blog

                        </div>
                        <div className="description">
                            We value on reproducibility and time cost for the prototyping.
                            Reproducibility along the time line is shown to allow reader to have better idea about the post.
                        </div>

                    </div>
                    <div className="components">
                        <div className="icon">
                            <img src={Editing} alt="Icon" />
                        </div>
                        <div className="title">
                            Fork post to make the post better and customized
                        </div>
                        <div className="description">
                            Forking feature allows prototyper to freely modify the post to improve reproducibility.
                            Such as version controll, dependances can be customized in each post.
                        </div>

                    </div>
                    <div className="components">
                        <div className="icon">
                            <img src={Vector} alt="Icon" />
                        </div>
                        <div className="title">
                            Connect with other prototypers
                        </div>
                        <div className="description">
                            ProtoHub allows you to connect with all the prototyper in the world.
                            Expose yourself.
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Features