import React, {FC} from 'react';
import './button.scss'

interface ButtonProps{
    text: string;
    handleClick?: (e: React.MouseEvent) => any;
    progress?: any;
    outlined?: boolean;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean
    className?: string
}

const Button: FC<ButtonProps> = ({text, handleClick, progress, outlined, type, disabled, className}) => {
    return (
            <button className={className} disabled={disabled} type={type} onClick={handleClick}>{text} {progress && progress}</button>
    );
};

export default Button;