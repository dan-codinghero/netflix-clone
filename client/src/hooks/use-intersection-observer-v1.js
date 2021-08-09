import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (
    options = {
        threshold: 0,
        root: null,
        rootMargin: '0%',
    }
) => {
    const [inView, setInView] = useState({});
    const [node, setNode] = useState();
    const entry = useRef();

    const observer = useRef();

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new window.IntersectionObserver(([nodeEntry]) => {
            entry.current = nodeEntry;
            setInView(nodeEntry.isIntersecting);
        }, options);

        if (node) observer.current.observe(node);

        return () => {
            observer.current.disconnect();
        };
    }, [node, options]);

    return [setNode, entry.current, inView, node];
};
