import React, { useEffect, useState, FC } from 'react';
import './card.scss';

interface CardProps{
    messages: string[];
    handleClick: () => void;
    className?: string;
}

const Card: FC<CardProps> = ({messages, handleClick, className}) => {
    return (
        <div className="cardContainer">
            <div className="messages">
                {messages.map(msg => <p>{msg}</p>)}
            </div>
            <button className="close" onClick={handleClick}>x</button>
        </div>
    );
};

export default Card;