import React, { useEffect, useState, useRef } from "react";
import "./profilemenu.scss";
import listenForOutsideClick from "../../utils/listen-for-outside-clicks";

const Menu = () => {
  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(listenForOutsideClick(listening, setListening, menuRef, setIsOpen));

  return (
    <div ref={menuRef} className={isOpen ? "m-menu -active" : "m-menu "}>
      <div onClick={toggle}> Open Menu </div>
      <ul className="m-menu__list">
        <li className="m-menu__item">
          <div className="m-menu__link">Log Out</div>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
