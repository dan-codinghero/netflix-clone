import React from 'react';

import './Faq.css';
import Accordion from '../Accordion/Accordion';

const Faq = (props) => {
    const { faqs = [], children, title } = props;
    return (
        <div className="faq">
            {title && <h1 className="faq__title">{title}</h1>}

            <div className="faq-accordion">
                <Accordion items={faqs} />
            </div>
            {children}
        </div>
    );
};

export default Faq;
