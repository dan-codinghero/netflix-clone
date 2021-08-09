import React from 'react';
import { AiFillCaretDown } from 'react-icons/ai';

import './Select.css';
import PropTypes from 'prop-types';

const Select = (props) => {
    const { Icon, options } = props;
    return (
        <div className="ui-select-wrapper">
            <div className="select-picker">
                {Icon && <Icon className="select-icon" />}
                <select className="select">
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.displayName}
                        </option>
                    ))}
                </select>
                <AiFillCaretDown className="select-chevron" />
            </div>
        </div>
    );
};
Select.propTypes = {
    Icon: PropTypes.elementType,
    options: PropTypes.array.isRequired,
};
export default Select;
