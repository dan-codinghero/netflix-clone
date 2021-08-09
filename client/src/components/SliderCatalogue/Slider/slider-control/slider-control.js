import React from 'react';
import './slider-control.css';

const SliderControl = (props) => {
    const { children, className } = props;

    return (
        <div className={`slider-control ${className}`} onClick={props.onClick}>
            <div className="slider-control-arrow">{children}</div>
        </div>
    );
};

export default SliderControl;
/* 
 <div
            className={`slider-control slider-control--${direction}`}
            onClick={() => props.onClick(direction)}
        >
            <div className="slider-control-arrow">{children}</div>
        </div>
*/
