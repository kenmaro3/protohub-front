import React, { FC } from 'react';
import './footer.scss'


const Footer: FC = () => {
    return (
        <div className={'footerContainer'}>
            <div className="logo">
                Blog platform for all who loves prototyping.

            </div>
            <div className="links">
                <div className="contents">
                    <div className="header">About</div>
                    <div className="content">
                        <a href="" target="_blank" rel="noopener noreferrer">About ProtoHub</a>
                    </div>
                    <div className="content">
                        <a href="" target="_blank" rel="noopener noreferrer">FAQ</a>
                    </div>
                    <div className="content">
                        <a href="" target="_blank" rel="noopener noreferrer" >Release Log</a>
                    </div>
                    <div className="content">
                        <a href="" target="_blank" rel="noopener noreferrer">Road Map</a>
                    </div>

                </div>
                <div className="contents">
                    <div className="header">Legal</div>
                    <div className="content">
                        <a href="" target="_blank" rel="noopener noreferrer">Term of use</a>
                    </div>
                    <div className="content">
                        <a href="" target="_blank" rel="noopener noreferrer">Privacy policy</a>
                    </div>

                </div>
                <div className="contents">
                    <div className="header">Links</div>
                    <div className="content">
                        <a href="" target="_blank" rel="noopener noreferrer">Twitter</a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Footer;