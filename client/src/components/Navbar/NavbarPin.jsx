import React, { useRef } from 'react';
// import { useIntersectionObserver } from '../../hooks/use-intersection-observer';
import useIntersectionObserver from '../../hooks/use-intersection-observer';

const NavbarPin = ({ children }) => {
    const navbarRef = useRef();

    const entry = useIntersectionObserver(navbarRef, { threshold: 1 });

    const isSticky = !entry?.isIntersecting && entry?.intersectionRect?.top === 0;

    const style = isSticky
        ? { top: '0', position: 'fixed', background: 'rgb(20, 20, 20)' }
        : { top: '0', position: 'fixed', background: 'transparent' };
    return (
        <div className="navbar-pin" ref={navbarRef}>
            <div className={`navbar-pin-container`} style={style}>
                {children}
            </div>
        </div>
    );
};

export default NavbarPin;
