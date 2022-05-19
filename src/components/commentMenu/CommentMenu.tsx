import React, { FC, useEffect, useState, useRef, ReactNode } from "react";
import "./commentmenu.scss";
import listenForOutsideClick from "../../utils/listen-for-outside-clicks";
import { IUser } from "../../types/user-type";

interface CommentMenuProps {
  children?: ReactNode;
  functions: Map<string, any>;
  user: IUser;
}

const CommentMenu: FC<CommentMenuProps> = (props) => {
  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<IUser>();
  const toggle = () => setIsOpen(!isOpen);

  const [functions, setFunctions] = useState<Map<string, any>>(new Map([]));

  useEffect(listenForOutsideClick(listening, setListening, menuRef, setIsOpen));

  useEffect(() => {
    setFunctions(props.functions)
    setUser(props.user)

  }, [props])

  const itemClicked = (key: string) => {
    console.log("here clicked")
    functions.get(key)()
  }

  return (
    <div ref={menuRef} className={isOpen ? "commentMenu -active" : "commentMenu "}>
      <div onClick={toggle}>
        {props.children}
      </div>
      <div className="containerOutside">
        <div className="containerInside">
          <div className="itemContainer">
            {Array.from(functions.keys()).map(key => {
              return (
                <div className="itemButtonContainer">
                  <button className="itemButton" onClick={() => itemClicked(key)}>

                    <div className="itemTitle">{key}</div>
                  </button>

                </div>
              )
            })}

          </div>

        </div>

      </div>
    </div>
  );
};

export default CommentMenu;
