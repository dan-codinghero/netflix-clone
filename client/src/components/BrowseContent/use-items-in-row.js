import { useEffect, useRef, useState } from 'react';

export const useItemsInRow = () => {
    const [itemsInRow, setItemsInRow] = useState(0);
    const windowWidthRef = useRef(0);

    // Calculate items per row
    useEffect(() => {
        const calculateItemsInRow = () => {
            if (windowWidthRef.current === window.innerWidth) {
                return;
            }
            windowWidthRef.current = window.innerWidth;
            if (windowWidthRef.current <= 500) {
                setItemsInRow(2);
            } else if (windowWidthRef.current > 500 && windowWidthRef.current <= 800) {
                setItemsInRow(3);
            } else if (windowWidthRef.current > 800 && windowWidthRef.current <= 1200) {
                setItemsInRow(4);
            } else if (windowWidthRef.current > 1200 && windowWidthRef.current <= 1400) {
                setItemsInRow(5);
            } else if (windowWidthRef.current > 1400) {
                setItemsInRow(6);
            }
        };

        calculateItemsInRow();

        window.addEventListener('resize', calculateItemsInRow);
        return () => {
            window.removeEventListener('resize', calculateItemsInRow);
        };
    }, []);
    return itemsInRow;
};
