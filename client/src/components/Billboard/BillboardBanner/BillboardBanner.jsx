import React from 'react';
import imgSrc from '../../../assets/images/video-cards/alice-in-borderland-banner.webp';
import './BillboardBanner.css';

const BillboardBanner = (props) => {
    return (
        <div className="billboard">
            <img className="billboard-image" src={imgSrc} alt="" />
            <div className="img-gradient"></div>
            {props.children}
        </div>
    );
};

export default BillboardBanner;
