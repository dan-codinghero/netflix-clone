import React from 'react';
import { VscAdd, VscClose } from 'react-icons/vsc';
import './AccordionItem.css';

const AccordionItem = ({ item, onClick, isOpen, ...props }) => {
    return (
        <div className="accordion__item">
            <div className="accordion__header" onClick={() => onClick()}>
                <p className="accordion__header--left">{item.header}</p>
                <div className="accordion__header--right">{isOpen ? <VscClose /> : <VscAdd />}</div>
            </div>
            {isOpen ? <p className="accordion__body">{item.body}</p> : null}
        </div>
    );
};

export default AccordionItem;
