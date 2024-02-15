import React from 'react';
import {Outlet} from "react-router-dom";

import HeaderComponent from "../../components/layout/header/component";
import FooterComponent from "../../components/layout/footer/component";

function Layout() {
    return (
        <div>
            <HeaderComponent />
            <Outlet />
            <FooterComponent />
        </div>
    )
}

export default Layout;