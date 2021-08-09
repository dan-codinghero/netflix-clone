import React from 'react';

const Billboard = (props) => {
    const { children } = props;
    return (
        <div style={{ marginTop: '0' }}>
            <div
                style={{
                    paddingBottom: '45%',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        height: '56.25vw',
                        width: '100%',
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Billboard;
