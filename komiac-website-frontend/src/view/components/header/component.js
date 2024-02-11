import React from 'react';

import './style.css';
import {Link} from "react-router-dom";

function HeaderComponent() {
    return (
        <div className='header'>
            <div className="header-container">
                <Link className="header-title" to={"/"}>Технический портал</Link>
                <div className="header-menu">
                    <Link to="/medical_organizations" className="header-menu-button">Медицинские подразделения</Link>
                </div>
            </div>
        </div>
    )
}

export default HeaderComponent;