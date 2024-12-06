import React, { useState } from 'react';

interface CaseProps {
    id: number;
    isOpen: boolean;
    style: string;
    onClick: () => void;
    canOpen: boolean;
}

const CaseComponent: React.FC<CaseProps> = ({ id, isOpen, style, onClick, canOpen }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        if (canOpen && !isOpen && !isAnimating) {
            setIsAnimating(true);
            setTimeout(() => {
                setIsAnimating(false);
                onClick();
            }, 1000);
        }
    };

    return (
        <div
            className={`absolute ${style} text-3xl border-black/40 flex items-center justify-center shadow-md rounded-xl border-2 overflow-hidden cursor-pointer ${isAnimating && 'animate-open-case'}`}
            onClick={handleClick}
        >
            <div className={`absolute ${!isOpen && 'bottom-2 left-2 text-black/60'} text-3xl font-bold font-christmas`}>
                {isOpen ? `🎁` : id}
            </div>
            {!isOpen && (
                <div className="absolute right-[-1.5rem] top-1/2 transform -translate-y-1/2 w-10 h-10 shadow-md rounded-full border-2 border-black/20"></div>
            )}
        </div>
    );
};

export default CaseComponent;