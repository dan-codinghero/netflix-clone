import { useReducer } from 'react';

const actionTypes = { toggleIndex: 'toggleIndex' };

export const accordionReducer = (openedIndexes, action) => {
    switch (action.type) {
        case actionTypes.toggleIndex:
            const isOpen = openedIndexes.includes(action.index);
            return isOpen
                ? openedIndexes.filter((i) => i !== action.index)
                : [...openedIndexes, action.index];

        default: {
            throw new Error(
                `Unhandled type in accordionReducer: ${action.type}`
            );
        }
    }
};

export function singleReducer(openIndexes, action) {
    if (action.type === actionTypes.toggleIndex) {
        const isOpen = openIndexes.includes(action.index);
        if (!isOpen) {
            return [action.index];
        }
        return [];
    }
}

function useAccordion({ reducer = singleReducer } = {}) {
    const [openedIndexes, dispatch] = useReducer(reducer, []);

    const toggleIndex = (index) => {
        dispatch({ type: actionTypes.toggleIndex, index });
    };
    return { openedIndexes, toggleIndex };
}

export default useAccordion;
