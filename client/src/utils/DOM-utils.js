export const getBoundingClientRect = (rect) => {
    return {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        x: rect.x,
        y: rect.y,
    };
};

export const getElementOffsetToWindow = (DOMRect) => {
    const rect = getBoundingClientRect(DOMRect);
    rect.xPosition = window.pageXOffset;
    rect.yPosition = window.pageYOffset;
    rect.top += rect.yPosition;
    rect.left += rect.xPosition;
    rect.right += rect.xPosition;
    rect.bottom += rect.yPosition;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
};

// export const getElementOffsetToWindow = (rect) => {
//     const
//     const xPosition = window.pageXOffset;
//     const yPosition = window.pageYOffset;
//     const top = rect.top + yPosition;
//     const left = rect.left + xPosition;
//     const right = rect.right + xPosition;
//     const bottom = rect.bottom + yPosition;
//     const x = left;
//     const y = top;
//     return { ...rect, top, right, bottom, left, x, y };
// };
