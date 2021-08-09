import React from 'react';
import PropTypes from 'prop-types';

import './Accordion.css';
import AccordionItem from './AccordionItem';
import useAccordion, { singleReducer } from './hooks/use-accordion';

const Accordion = ({ items }) => {
    const { openedIndexes, toggleIndex } = useAccordion(singleReducer);

    return (
        <div className="accordion">
            <div className="accordion__text">
                <div className="accordion__items">
                    {items.map((item, index) => (
                        <AccordionItem key={item.id} item={item} onClick={() => toggleIndex(index)} isOpen={openedIndexes.includes(index)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

Accordion.propTypes = {
    title: PropTypes.string,
    items: PropTypes.array.isRequired,
};
export default Accordion;
