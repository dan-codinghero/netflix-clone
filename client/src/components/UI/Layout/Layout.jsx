import React from 'react';

import './Layout.css';

const Layout = ({ theme = 'dark', children, extraClasses = '' }) => {
    return <div className={`layout layout--${theme} ${extraClasses}`}>{children}</div>;
};

export default Layout;
