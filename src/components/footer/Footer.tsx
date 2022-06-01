import React, { FC } from 'react';
import './footer.scss'

interface FooterProps{
    isMobile: boolean
}

const Footer: FC<FooterProps> = ({isMobile}) => {
    return (
        <div className={`${isMobile? "footerContainerMobile" : "footerContainer"}`}>
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
                        <a href="https://docs.google.com/document/d/e/2PACX-1vQ_UsqIWxb9jA1hfOOrJDLBleqo9Y6TDpRWzyljth4fZ9-c8FPhrFjlneHyauS71MZe_NpNkiUp68sa/pub" target="_blank" rel="noopener noreferrer">Term of use (in Japanese)</a>
                    </div>
                    <div className="content">
                        <a href="https://docs.google.com/document/d/e/2PACX-1vQFLDSkXYztURT9pfMdSsiMdYMCJfp7u1Tj3-HgagzmgxnZkd-tdho0_QEOyH8gQWHOol-KJS4eknXo/pub" target="_blank" rel="noopener noreferrer">Privacy policy (in Japanese)</a>
                    </div>

                </div>
                <div className="contents">
                    <div className="header">Links</div>
                    <div className="content">
                        <a href="https://twitter.com/protohub_tech" target="_blank" rel="noopener noreferrer">Twitter</a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Footer;