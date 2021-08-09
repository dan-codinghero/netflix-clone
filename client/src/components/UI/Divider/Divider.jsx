import React from 'react';

import './Divider.css';

const Divider = (props) => {
    const { size = 'xs', theme = 'dark' } = props;
    return <div className={`divider divider--${size} divider--${theme}`}></div>;
};

export default Divider;
