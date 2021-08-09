import { useEffect, useState } from 'react';

function useDelayRender(isMounted = true, delayTime = { enter: 0, exit: 0 }) {
    const [shouldRender, setShouldRender] = useState(false);

    const { enter, exit } = delayTime;
    useEffect(() => {
        let timeoutId;
        if (isMounted && !shouldRender) {
            if (enter) timeoutId = setTimeout(() => setShouldRender(true), enter);
            else setShouldRender(true);
        } else if (!isMounted && shouldRender) {
            if (exit) timeoutId = setTimeout(() => setShouldRender(false), exit);
            else setShouldRender(false);
        }
        return () => clearTimeout(timeoutId);
    }, [isMounted, enter, exit, shouldRender]);
    return shouldRender;
}

export default useDelayRender;
