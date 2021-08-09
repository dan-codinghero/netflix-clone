import { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = (
    ref,
    options = {
        threshold: [1],
        root: null,
        rootMargin: '0%',
    }
) => {
    const [intersectionObserverEntry, setIntersectionObserverEntry] = useState({});

    const { threshold, root, rootMargin } = options;
    const oberserOptions = useRef({ threshold, root, rootMargin });

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new window.IntersectionObserver(
            ([entry]) => {
                setIntersectionObserverEntry(entry);
            },
            {
                threshold: oberserOptions.current.threshold,
                root: oberserOptions.current.root,
                rootMargin: oberserOptions.current.rootMargin,
            }
        );

        observer.observe(node);

        return () => {
            setIntersectionObserverEntry(null);
            observer.disconnect();
        };
    }, [ref, oberserOptions, root, rootMargin]);

    return intersectionObserverEntry;
};

export default useIntersectionObserver;
