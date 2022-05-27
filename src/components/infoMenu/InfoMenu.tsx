import React, { FC, useEffect, useState, useRef, ReactNode } from "react";
import "./infomenu.scss";
import listenForOutsideClick from "../../utils/listen-for-outside-clicks";

interface InfoMenuProps {
    info: string;
    children?: ReactNode;
}

const InfoMenu: FC<InfoMenuProps> = ({children, info}) => {
  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [functions, setFunctions] = useState<Map<string, any>>(new Map([]));

  useEffect(listenForOutsideClick(listening, setListening, menuRef, setIsOpen));

  return (
    <div ref={menuRef} className={isOpen ? "infoMenuContainer -active" : "infoMenuContainer "}>
      <div onClick={toggle}>
        {children}
      </div>
      <div className="containerOutside">
        <div className="containerInside">
          <div className="itemContainer">
            <div dangerouslySetInnerHTML={{ __html: info }} />

          </div>

        </div>

      </div>
    </div>
  );
};

export default InfoMenu;
