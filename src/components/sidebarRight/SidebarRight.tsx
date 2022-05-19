import React, { FC, useState } from 'react';
import './sidebarright.scss'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import ModalWindow from "../modalWindow/ModalWindow";
import Sticky from 'react-sticky-el';
import LatestList from '../latestlist/LatestList';

const SidebarRight: FC = () => {
    const { isAuth } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState<boolean>(false)
    const handleClick = (path: string) => {
        if (isAuth) {
            return navigate(`/${path}`)
        } else {
            setShowModal(true)
        }
    }

    return (
        <Sticky className='sidebarRight'>
            <ModalWindow setShowModal={setShowModal} showModal={showModal} />
            <LatestList />
        </Sticky>


    );
};

export default SidebarRight;