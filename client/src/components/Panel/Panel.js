import React from 'react';

import './Panel.css';

const Panel = (props) => {
    return <div className={`section-panel`}>{props.children}</div>;
};

export default Panel;
