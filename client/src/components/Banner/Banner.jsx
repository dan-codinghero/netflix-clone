import React from 'react';
import './Banner.css';

const Banner = (props) => {
    const { children } = props;

    return <div className="banner">{children}</div>;
};

export default Banner;
