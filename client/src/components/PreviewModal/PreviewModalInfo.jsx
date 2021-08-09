import React from 'react';

const PreviewModalInfo = React.forwardRef((props, ref) => {
    const { children } = props;
    return (
        <div className="preview-info" style={{ lineHeight: '1.6' }} ref={ref}>
            {children}
        </div>
    );
});

export default PreviewModalInfo;
