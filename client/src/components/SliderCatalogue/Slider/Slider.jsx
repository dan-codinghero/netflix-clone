import React, { Fragment, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import './Slider.css';
import { calcSliderOffset, DIRECTION_LEFT, DIRECTION_RIGHT, getSlidePercentage, getReactAnimationStyle } from '../slider-utils';
// import { getReactAnimationStyle } from '../../../utils/slider-utils';

const Slider = function Slider(props) {
    const { enableLooping, totalItems, itemsInRow, children, activeRowItemIndex, hasMovedOnce, handleSliderMove } = props;

    const [isAnimating, setIsAnimating] = useState(false);

    const slideMoveProps = useRef({ direction: null });

    const getComputedOffset = () => {
        const offset = calcSliderOffset({ currentIndex: activeRowItemIndex, enableLooping, itemsInRow, hasMovedOnce, totalItems });

        if (!isAnimating) return offset;

        const { direction } = slideMoveProps.current;

        return offset + getSlidePercentage({ direction, itemsInRow, totalItems, currentIndex: activeRowItemIndex });
    };

    const sliderOffset = getComputedOffset();

    const showPreviousBtn = Math.abs(sliderOffset) !== 0 ? true : false;
    const showNextBtn = !enableLooping
        ? totalItems > itemsInRow && totalItems !== activeRowItemIndex + itemsInRow
        : enableLooping && totalItems > itemsInRow;

    const onSliderTransitionEnd = (e) => {
        // debugger;
        // if (!slideMoveProps.current.direction) return;
        // const { direction } = slideMoveProps.current;
        // handleSliderMove(e, direction);
        // setIsAnimating(false);
        // slideMoveProps.current.direction = null;
    };

    const onSliderControlClick = (e, direction) => {
        // debugger;

        slideMoveProps.current.direction = direction;
        setIsAnimating(true);

        // Alternative approach to update instead of transition end listener
        setTimeout(() => {
            ReactDOM.unstable_batchedUpdates(() => {
                handleSliderMove(e, direction);
                setIsAnimating(false);
                slideMoveProps.current.direction = null;
            });
        }, 750);
    };

    <div className={`slider-control slider-control--${DIRECTION_LEFT}`} onClick={(e) => onSliderControlClick(e, DIRECTION_LEFT)}>
        <div className="slider-control-arrow">
            <FaChevronLeft />
        </div>
    </div>;
    return (
        <Fragment>
            <div className="slider">
                {showPreviousBtn && (
                    <div className={`slider-control slider-control--${DIRECTION_LEFT}`} onClick={() => onSliderControlClick(DIRECTION_LEFT)}>
                        <div className="slider-control-arrow">
                            <FaChevronLeft />
                        </div>
                    </div>
                )}
                <div className="slider-mask">
                    <div
                        className={`slider-content${isAnimating ? ' animating' : ''}`}
                        style={getReactAnimationStyle(sliderOffset)}
                        onTransitionEnd={onSliderTransitionEnd}
                    >
                        {children}
                    </div>
                </div>
                {showNextBtn && (
                    <div className={`slider-control slider-control--${DIRECTION_RIGHT}`} onClick={(e) => onSliderControlClick(e, DIRECTION_RIGHT)}>
                        <div className="slider-control-arrow">
                            <FaChevronRight />
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default Slider;
// <SliderControl className={`slider-control--${DIRECTION_LEFT}`} onClick={() => onSliderControlClick(DIRECTION_LEFT)}>
//                         <FaChevronLeft />
//                     </SliderControl>
