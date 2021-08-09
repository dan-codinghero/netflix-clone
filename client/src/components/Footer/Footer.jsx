import React from 'react';
import { FaGlobe } from 'react-icons/fa';
import PropTypes from 'prop-types';

import './Footer.css';
import Select from '../UI/Select/Select';

const options = [
    {
        value: 'en',
        displayName: 'English',
    },
    {
        value: 'es',
        displayName: 'Español',
    },
];

const Footer = (props) => {
    const { links, className = '' } = props;

    return (
        <footer className={`footer ${className}`}>
            <div className="footer__container">
                <div className="footer__wrapper">
                    <div className="footer__top">
                        <p className="footer__title">Questions? Call +1 (408) 329-9526 (USA)</p>
                    </div>
                    <ul className="footer__items">
                        {links.map((link) => (
                            <li key={link.id} link={link.href} className="footer__item">
                                {link.text}
                            </li>
                        ))}
                    </ul>
                    <div className="lang-selection">
                        <Select Icon={FaGlobe} options={options}></Select>
                    </div>
                    <div className="footer__bottom">
                        <p translate="no">© {new Date().getFullYear()} Cineplex, Inc.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

Footer.propTypes = {
    links: PropTypes.array.isRequired,
};
export default Footer;
