import React from 'react';

import './Navbar.css';
import Logo from '../UI/Logo/Logo';

const Navbar = (props) => {
    const { children } = props;

    return (
        <nav className={`main-nav`}>
            <div className="main-nav__wrapper">
                <div className="main-nav__brand">{<Logo />}</div>
                {children}
            </div>
        </nav>
    );
};

export default Navbar;
