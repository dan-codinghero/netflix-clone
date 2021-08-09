import React from 'react';

import './PreviewModalContainer.css';

const PreviewModalContainer = (props) => {
    const { children, style, onHoverEnd } = props;

    return (
        <div className="preview-modal-container" style={style} onMouseLeave={onHoverEnd}>
            {children}
        </div>
    );
};

export default PreviewModalContainer;
/*const PreviewModalContainer = React.forwardRef((props, ref) => {
    const { children, style } = props;

    return (
        <div className="preview-modal-container" style={style} ref={ref}>
            {children}
        </div>
    );
}); */
