import React from 'react';
import './PreviewModalMeta.css';

const PreviewModalMeta = () => {
    return (
        <div className="video-meta-data">
            <div className="meta-data--firstline">
                <span className="meta meta--match-score">98% Match</span>
            </div>
            <div className="meta-data--secondline">
                <span className="meta meta--rating">18+</span>
                <span className="meta">2hr 17m</span>
            </div>
        </div>
    );
};

export default PreviewModalMeta;
