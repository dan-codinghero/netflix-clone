import React, { useEffect, useRef, useState } from 'react';
import './preview-modal.css';
import PreviewModalControls from './preview-modal-controls';
import PreviewModalTags from './preview-modal-tags';
import PreviewModalInfo from './preview-modal-meta';
import { getElementOffsetToWindow } from '../../utils/DOM-utils';
import { CSSTransition } from 'react-transition-group';

const PreviewModal = (props) => {
    const { video, titleCardRect, handleModalClose, viewportPosition } = props;

    const vid = require('../../assets/videos/demo.mp4').default;
    const playerRef = useRef(null);
    const modalRef = useRef();
    const infoRef = useRef();
    const modalTop = useRef(titleCardRect.top);
    const [isOpen, setIsOpen] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [openAnimationComplete, setOpenAnimationComplete] = useState(false);

    useEffect(() => {
        const player = playerRef.current;
        if (!player) return;

        const timerId = setTimeout(() => {
            player.play();
        }, 1000);

        function handleVideoLoad(e) {
            setVideoLoaded(true);
        }

        player.addEventListener('canplaythrough', handleVideoLoad);

        return () => {
            clearTimeout(timerId);
            player.removeEventListener('canplaythrough', handleVideoLoad);
        };
    }, []);

    useEffect(() => {
        if (!infoRef.current && !modalRef.current) return;
        const modalRect = getElementOffsetToWindow(modalRef.current.getBoundingClientRect());

        const infoRect = getElementOffsetToWindow(infoRef.current.getBoundingClientRect());
        const cardHeightScale = Math.trunc(titleCardRect.height) * 1.5;
        const totalHeight = cardHeightScale + infoRect.height;

        modalTop.current = modalRect.top - (totalHeight - titleCardRect.height) / 2;

        setIsOpen(true);
    }, [titleCardRect]);

    const defaultModalStyles = () => {
        return {
            opacity: 1,
            top: `${titleCardRect.top}px`,
            left: titleCardRect.left,
            width: `${titleCardRect.width}px`,
            boxShadow: `rgba(0, 0, 0, 0.75) 0px 3px 10px`,
            transformOrigin: `center center`,
            transition: `all 200ms ease-out`,
        };
    };

    const transitionModalStyles = () => {
        const modalWidth = Math.round(titleCardRect.width) * 1.5;
        let left = titleCardRect.left;
        const overflowX = modalWidth - titleCardRect.width;
        if (viewportPosition === 'middle') {
            left = `${titleCardRect.left - overflowX / 2}px`;
        }
        if (viewportPosition === 'rightEdge') {
            left = `${titleCardRect.left - overflowX}px`;
        }
        return {
            entering: { width: titleCardRect.width, top: titleCardRect.top, opacity: 1 },
            entered: { width: modalWidth, top: modalTop.current, left: left, opacity: 1 },
            exiting: { width: titleCardRect.width, top: titleCardRect.top, left: titleCardRect.left, opacity: 1 },
            exited: { width: titleCardRect.width, top: titleCardRect.top, left: titleCardRect.left, opacity: 1 },
        };
    };
    const defaultCardStyles = () => {
        return {
            width: `${titleCardRect.width}px`,
            height: `${titleCardRect.height}px`,
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: 'black',
            transition: `all 200ms ease-out`,
        };
    };

    const transitionCardStyles = () => {
        const modalWidth = Math.round(titleCardRect.width) * 1.5;
        const modalHeight = Math.round(titleCardRect.height) * 1.5;
        return {
            entering: { width: titleCardRect.width, height: titleCardRect.height },
            entered: { width: modalWidth, height: modalHeight },
            exiting: { width: titleCardRect.width, height: titleCardRect.height },
            exited: { width: titleCardRect.width, height: titleCardRect.height },
        };
    };

    const onModalClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            handleModalClose();
        }, 100);
    };

    const handleAnimationComplete = (e) => {
        setTimeout(() => {
            setOpenAnimationComplete(true);
        }, 1000);
    };

    return (
        <CSSTransition
            in={isOpen}
            timeout={2000}
            onEntered={handleAnimationComplete}
            addEndListener={(node, done) => {
                // use the css transitionend event to mark the finish of a transition
                done();
            }}
        >
            {(state) => (
                <div
                    className="preview-modal-container"
                    style={{
                        ...defaultModalStyles(),
                        ...transitionModalStyles()[state],
                    }}
                    onMouseLeave={onModalClose}
                    ref={modalRef}
                >
                    <div className="preview-modal">
                        <div
                            className="todo"
                            style={{
                                ...defaultCardStyles(),
                                ...transitionCardStyles()[state],
                            }}
                        >
                            <video
                                ref={playerRef}
                                muted
                                src={vid}
                                style={{
                                    position: 'absolute',
                                    top: '0',
                                    left: '0',
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    opacity: `${videoLoaded && openAnimationComplete ? 1 : 0}`,
                                    zIndex: `${videoLoaded && openAnimationComplete ? 100 : 0}`,
                                }}
                            ></video>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '0',
                                    left: '0',
                                    width: '100% ',
                                    height: '100%',
                                    overflow: 'hidden',
                                    opacity: `${!videoLoaded || !openAnimationComplete ? 1 : 0}`,
                                }}
                            >
                                <img
                                    style={{ display: 'block', width: '100% ', height: '100%' }}
                                    src={`https://image.tmdb.org/t/p/w500/${video.backdrop_path}`}
                                    alt=""
                                />
                            </div>
                        </div>

                        <div className="preview-info" style={{ lineHeight: '1.6' }} ref={infoRef}>
                            <PreviewModalControls />
                            <PreviewModalInfo />
                            <PreviewModalTags />
                        </div>
                    </div>
                </div>
            )}
        </CSSTransition>
    );
};

export default PreviewModal;
