import React, { FC, useEffect, useState, useRef, ReactNode } from "react";
import "./postmenu.scss";
import listenForOutsideClick from "../../utils/listen-for-outside-clicks";
import { IUser } from "../../types/user-type";

interface PostMenuProps {
  children?: ReactNode;
  functions: Map<string, any>;
  user: IUser;
  isMobile: boolean;
}

const PostMenu: FC<PostMenuProps> = (props) => {
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
    functions.get(key)()
  }

  const getClassName = () => {
    if(isOpen){
      if(props.isMobile){
        return "postMenuMobile -active"
      }
      else{
        return "postMenu -active"
      }
    }
    else{
      if(props.isMobile){
        return "postMenuMobile"
      }
      else{
        return "postMenu"
      }

    }
  }

  return (
    <div ref={menuRef} className={getClassName()}>
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

export default PostMenu;
