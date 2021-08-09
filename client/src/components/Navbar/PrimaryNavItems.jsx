import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import navLinks from '../../fixtures/navbar-links.json';
import { STATE_SLICE } from '../../store/state-configuration';

const PrimaryNavItems = (props) => {
    const { isSignedIn } = useSelector((state) => state[STATE_SLICE.AUTH.name]);

    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownActive, setDropdownActive] = useState(false);

    const timerIdRef = useRef();

    useEffect(() => {
        return () => {
            clearTimeout(timerIdRef.current);
        };
    }, []);

    const onDropdownIconMouseOver = () => {
        setShowDropdown(true);
    };

    const onDropdownIconMouseOut = () => {
        timerIdRef.current = setTimeout(() => {
            setShowDropdown(false);
        }, 500);
    };

    const onDropdownMouseOut = () => {
        setDropdownActive(false);
    };

    const renderDropdownItems = () => {
        return (
            <ul className="sub-menu__items" onMouseEnter={() => setDropdownActive(true)} onMouseLeave={() => onDropdownMouseOut()}>
                <div className="sub-menu__pointer"></div>
                <div className="sub-menu__top-bar"></div>

                {navLinks.map((link) => (
                    <li className="sub-menu__item" key={link.text}>
                        <NavLink to={link.href}>{link.text}</NavLink>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        isSignedIn && (
            <div className="main-nav__primary">
                <ul className="nav-items">
                    <li className="nav-item sub-menu">
                        <Link
                            className="menu-trigger"
                            to=""
                            onMouseEnter={onDropdownIconMouseOver}
                            onMouseLeave={onDropdownIconMouseOut}
                            onClick={(e) => e.preventDefault()}
                        >
                            Browse
                        </Link>
                        {showDropdown || dropdownActive ? renderDropdownItems() : null}
                    </li>
                    {navLinks.map((link) => (
                        <li className="nav-item" key={link.text}>
                            <NavLink activeClassName="nav-item--active" to={link.href}>
                                {link.text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        )
    );
};

export default PrimaryNavItems;
