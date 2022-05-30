import React, { FC, useEffect, useState, useRef, ReactNode } from "react";
import "./infomenu.scss";
import listenForOutsideClick from "../../utils/listen-for-outside-clicks";

interface InfoMenuProps {
    info: string;
    isMobile: boolean;
    children?: ReactNode;
}

const InfoMenu: FC<InfoMenuProps> = ({children, isMobile, info}) => {
  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [functions, setFunctions] = useState<Map<string, any>>(new Map([]));

  useEffect(listenForOutsideClick(listening, setListening, menuRef, setIsOpen));

  const getClassName = () => {
    if(isOpen && isMobile){
      return "infoMenuContainerMobile -active"
    }
    else if(!isOpen && isMobile){
      return "infoMenuContainerMobile"
    }
    else if(isOpen && !isMobile){
      return "infoMenuContainer -active"
    }
    else if(!isOpen && !isMobile){
      return "infoMenuContainer"
    }
  }

  return (
    <div ref={menuRef} className={getClassName()}>
      <div onClick={toggle}>
        {children}
      </div>
      <div className="containerOutside">
        <div className="containerInside">
          <div className="itemContainer">
            <div className="content" dangerouslySetInnerHTML={{ __html: info }} />

          </div>

        </div>

      </div>
    </div>
  );
};

export default InfoMenu;
