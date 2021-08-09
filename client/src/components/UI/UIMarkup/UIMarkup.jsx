import React from 'react';

const UIMarkup = ({ className, tagName, text }) => {
    const element = React.createElement(tagName, { className }, text);
    return element;
};

export default UIMarkup;
