import React from 'react';

import './Notify.css';

const Notify = ({ type, children }) => {
    return <div className={`notify ${type}`}>{children}</div>;
};

export default Notify;
