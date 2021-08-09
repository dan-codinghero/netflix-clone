// const actionTypes = { loop: 'SLIDER_LOOP', linear: 'SLIDER_LINEAR' };
export const DIRECTION_LEFT = 'left';
export const DIRECTION_RIGHT = 'right';

function getHighestIndex(totalItems, lowestVisibleIndex, itemsInRow) {
    return Math.min(totalItems, lowestVisibleIndex + 2 * itemsInRow + 1);
}

function getLowestIndex(lowestVisibleIndex, itemsInRow) {
    return Math.max(0, lowestVisibleIndex - itemsInRow - 1);
}

export function calculateNewIndex({ direction, itemsInRow, totalItems, currentIndex }) {
    if (direction === DIRECTION_RIGHT) {
        return (currentIndex + itemsInRow) % totalItems > totalItems - itemsInRow
            ? totalItems - itemsInRow
            : (currentIndex + itemsInRow) % totalItems;
    }
    if (direction === DIRECTION_LEFT) {
        return currentIndex === 0 ? totalItems - itemsInRow : currentIndex - itemsInRow < 0 ? 0 : currentIndex - itemsInRow;
    }
}

/**
 * calculate the slide percentage
 * @param {Object | Object{}} Object The values used to calculate transformation
 * @returns {Number}
 */
export function getSlidePercentage({ currentIndex, itemsInRow, totalItems, direction }) {
    //Allow user to also pass new index amd short circuit assignemnt
    const newIndex = calculateNewIndex({ direction, itemsInRow, totalItems, currentIndex });

    const isRTL = direction === DIRECTION_RIGHT ? true : false;
    const updatedIndex = newIndex === 0 && totalItems - itemsInRow === currentIndex && isRTL ? totalItems : newIndex;
    const oldIndex = currentIndex === 0 && totalItems - itemsInRow === newIndex && !isRTL ? totalItems : currentIndex;
    const movePercentage = ((oldIndex - updatedIndex) / itemsInRow) * 100;

    return isRTL ? -Math.abs(movePercentage) : Math.abs(movePercentage);
}

/**
 * calculate the slide percentage
 * @param {Object | Object{}} Object  The values used to calculate indexes that will be rendered
 * @returns {Object | Object []}
 */
export function getSliderIndexes({ enableLooping, itemsInRow, totalItems, currentIndex, hasMovedOnce }) {
    const items = Array.from({ length: totalItems }, (_, k) => k);
    let left = [];
    let middle = [];
    let right = [];

    const lowestIndex = getLowestIndex(currentIndex, itemsInRow);
    const highestIndex = getHighestIndex(totalItems, currentIndex, itemsInRow);

    const sliderItems = items.slice(lowestIndex, highestIndex);
    const indexPos = sliderItems.indexOf(currentIndex);

    middle = sliderItems.slice(indexPos, indexPos + itemsInRow);
    right = sliderItems.slice(indexPos + itemsInRow, highestIndex);

    //Refactor N.B view calcSliderOffset
    if (hasMovedOnce) {
        left = sliderItems.slice(0, indexPos);
        if (enableLooping) {
            left = lowestIndex === 0 && currentIndex !== 0 ? items.slice(-1).concat(left) : left;
            left = currentIndex === 0 ? items.slice(-itemsInRow - 1).concat(left) : left;
        }
    }

    if (highestIndex - currentIndex <= 2 * itemsInRow && enableLooping && totalItems > itemsInRow) {
        right = currentIndex + itemsInRow === totalItems ? right.concat(items.slice(0, itemsInRow + 1)) : right.concat(items.slice(0, 1));
    }

    return [left, middle, right];
}

export function calcSliderOffset({ currentIndex, enableLooping, itemsInRow, hasMovedOnce, totalItems }) {
    const lowestIndex = getLowestIndex(currentIndex, itemsInRow);

    if (!hasMovedOnce) return 0;

    if (!enableLooping) {
        return ((lowestIndex - currentIndex) / itemsInRow) * 100;
    }
    let offset = currentIndex - lowestIndex;
    offset = lowestIndex === 0 && currentIndex !== 0 ? offset + 1 : offset;
    offset = currentIndex === 0 ? itemsInRow + 1 + offset : offset;

    return -(offset / itemsInRow) * 100;
}

export function getAnimationStyle(percent) {
    if (!percent && percent !== 0) return null;
    const translate = ` translate3d(${percent}%, 0px, 0px)`;
    return ['-webkit-transform: ' + translate, '-ms-transform: ' + translate, 'transform: ' + translate].join(';');
}

export function getReactAnimationStyle(percent) {
    // if (!percent) return null;

    const translate = 'translate3d(' + percent + '%, 0px, 0px)';
    return {
        WebkitTransform: translate,
        MsTransform: translate,
        transform: translate,
    };
}

export const getItemsProps = (items, hasMovedOnce) => {
    let viewportIndex;
    let viewportPosition;
    let left = [];
    let middle = [];
    let right = [];

    items.forEach((slide, i) => {
        slide.forEach((_, j, arr) => {
            if (i === 0) {
                viewportPosition = j === arr.length - 1 ? 'leftPeek' : '';
                viewportIndex = j === arr.length - 1 ? 0 : '';
                left.push({ viewportIndex, viewportPosition });
            }
            if (i === 1) {
                viewportPosition = j === 0 ? 'leftEdge' : j === arr.length - 1 ? 'rightEdge' : 'middle';
                viewportIndex = hasMovedOnce ? j + 1 : j;
                middle.push({ viewportIndex, viewportPosition });
            }
            if (i === 2) {
                viewportPosition = j === 0 ? 'rightPeek' : '';
                viewportIndex = j === 0 ? items[1].length + 1 : '';
                right.push({ viewportIndex, viewportPosition });
            }
        });
    });

    return [left, middle, right];
};
