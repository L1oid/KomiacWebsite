import React from 'react';

function UpButtonComponent() {
    const handleButtonClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <button className="page-button-up" onClick={handleButtonClick}>Вверх</button>
    )
}

export default UpButtonComponent;