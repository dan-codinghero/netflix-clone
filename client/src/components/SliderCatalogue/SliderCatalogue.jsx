import React, { useEffect, useState } from 'react';

import './SliderCatalogue.css';
import Slider from './Slider/Slider';
import SliderItem from './Slider/SliderItem/SliderItem';
import { getSliderIndexes, calculateNewIndex, getItemsProps } from './slider-utils';

const ENABLE_LOOPING = true;

const SliderCatalogue = (props) => {
    // debugger;
    const { title = 'Popular on Cineplex', videos, itemsInRow, rowNum, hideRowHeader } = props;
    const totalItems = videos.length;
    const [lowestVisibleIndex, setLowestVisibleIndex] = useState(0);
    const [hasMovedOnce, setHasMovedOnce] = useState(false);

    useEffect(() => {
        if (ENABLE_LOOPING) return;
        if (lowestVisibleIndex + itemsInRow > totalItems && !(totalItems < itemsInRow)) {
            setLowestVisibleIndex(totalItems - itemsInRow);
        }
    }, [itemsInRow, lowestVisibleIndex, totalItems]);

    const sliderItems = getSliderIndexes({ enableLooping: ENABLE_LOOPING, itemsInRow, totalItems, currentIndex: lowestVisibleIndex, hasMovedOnce });

    const sliderItemsProps = getItemsProps(sliderItems, hasMovedOnce);
    const handleSliderMove = (e, direction) => {
        const newIndex = calculateNewIndex({ direction: direction, itemsInRow, totalItems, currentIndex: lowestVisibleIndex });
        setLowestVisibleIndex(newIndex);
        setHasMovedOnce(true);
    };

    const renderSliderItems = () => {
        const itemsProps = sliderItemsProps.flat();
        return sliderItems.flat().map((item, index) => {
            return (
                <SliderItem
                    key={`${videos[item].id}_${index}`}
                    video={videos[item]}
                    viewportIndex={itemsProps[index].viewportIndex}
                    viewportPosition={itemsProps[index].viewportPosition}
                />
            );
        });
    };

    return (
        <div className="slider-catalogue">
            {hideRowHeader && <SliderCatalogue.Header title={title} />}

            <div className="row-container" id={`row-${rowNum}`}>
                <div className="row-content slider-hover-trigger-layer">
                    <Slider
                        totalItems={totalItems}
                        itemsInRow={itemsInRow}
                        enableLooping={ENABLE_LOOPING}
                        handleSliderMove={handleSliderMove}
                        activeRowItemIndex={lowestVisibleIndex}
                        hasMovedOnce={hasMovedOnce}
                    >
                        {renderSliderItems()}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

SliderCatalogue.Header = function Header({ title }) {
    return (
        <h2 className="slider-catalogue__header">
            <span className="slider-catalogue__title">{title}</span>
        </h2>
    );
};

export default SliderCatalogue;
