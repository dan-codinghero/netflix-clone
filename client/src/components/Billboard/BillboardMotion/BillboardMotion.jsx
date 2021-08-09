import React from 'react';
import './BillboardMotion.css';

const BillboardMotion = (props) => {
    const { titleImage, children } = props;
    return (
        <div className="banner-motion">
            <div className="banner-motion__title">
                <img src={titleImage} alt="" />
            </div>
            <div className="banner-motion__synopsis">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi unde enim sit nobis fugit! Aspernatur distinctio modi explicabo ullam
                repellendus?
            </div>
            {children}
        </div>
    );
};

export default BillboardMotion;
