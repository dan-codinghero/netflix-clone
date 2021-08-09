import React from 'react';

import './Logo.css';
import LogoImage from '../../../assets/images/logo-200.png';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div className="logo">
            <Link to="/">
                <img src={LogoImage} alt="" />
            </Link>
        </div>
    );
};

export default Logo;
