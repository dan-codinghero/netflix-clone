import React, { useCallback, useEffect, useRef, useState } from 'react';
import './PreviewModal.css';
import PreviewModalControls from './PreviewModalControls';
import PreviewModalTags from './PreviewModalTags';
import PreviewModalInfo from './PreviewModalMeta';
import { getElementOffsetToWindow } from '../../utils/DOM-utils';
import { useSpring, animated } from 'react-spring';

const SCALE = 1.5;

const PreviewModal = (props) => {
    const { video, titleCardRect, handleModalClose, viewportPosition } = props;

    const vid = require('../../assets/videos/demo.mp4').default;
    const playerRef = useRef(null);
    const modalRef = useRef();
    const infoRef = useRef();
    const previewModalRect = useRef({ ...titleCardRect });

    const [isOpen, setIsOpen] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [showModalCard, setShowModalCard] = useState(false);

    // const [expanded, setExpanded] = useState(false);

    const modalProps = useSpring({
        width: isOpen ? previewModalRect.current.width : titleCardRect.width,
        height: isOpen ? previewModalRect.current.height : titleCardRect.height,
        top: isOpen ? previewModalRect.current.top : titleCardRect.top,
        left: isOpen ? previewModalRect.current.left : titleCardRect.left,
        // transform: isOpen ? 'scaleX(1)' : 'scaleX(0.85)',
        onRest: (state) => {
            if (state.finished) setShowModalCard(true); //setShowModalCard((prevState) => !prevState);
        },
    });

    const onModalClose = useCallback(() => {
        setIsOpen(false);
        setShowModalCard(false);
        setTimeout(() => {
            handleModalClose();
        }, 200);
    }, [handleModalClose]);

    useEffect(() => {
        const player = playerRef.current;
        if (!player) return;

        function handleVideoLoad(e) {
            setVideoLoaded(true);
        }

        // function handleResize(e) {
        //     setShowModalCard(false);
        // }
        player.addEventListener('canplaythrough', handleVideoLoad);
        window.addEventListener('resize', onModalClose);

        return () => {
            window.removeEventListener('resize', onModalClose);
            player.removeEventListener('canplaythrough', handleVideoLoad);
        };
    }, [onModalClose]);

    useEffect(() => {
        const player = playerRef.current;
        if (!player) return;

        if (videoLoaded) player.play();
    }, [videoLoaded]);

    useEffect(() => {
        if (!infoRef.current && !modalRef.current) return;
        const modalRect = getElementOffsetToWindow(modalRef.current.getBoundingClientRect());

        const infoRect = getElementOffsetToWindow(infoRef.current.getBoundingClientRect());
        const cardHeightScale = Math.trunc(titleCardRect.height) * SCALE;
        const totalHeight = cardHeightScale + infoRect.height;

        previewModalRect.current.top = modalRect.top - (totalHeight - titleCardRect.height) / 2;
        previewModalRect.current.width = Math.round(titleCardRect.width) * SCALE;
        previewModalRect.current.height = Math.round(titleCardRect.height) * SCALE;

        const overflowX = previewModalRect.current.width - titleCardRect.width;
        if (viewportPosition === 'middle') {
            previewModalRect.current.left = titleCardRect.left - overflowX / 2;
        }
        if (viewportPosition === 'rightEdge') {
            previewModalRect.current.left = titleCardRect.left - overflowX;
        }

        setIsOpen(true);
    }, [titleCardRect, viewportPosition]);

    // const onExpanded = () => {
    //     previewModalRect.current.top += 100;
    //     previewModalRect.current.width *= 1.5;
    //     previewModalRect.current.height *= 1.5;
    //     setExpanded(true);
    // };

    const { height, width, left, top } = modalProps;

    return (
        <animated.div className="preview-modal-container" style={{ top, left, width }} onMouseLeave={onModalClose} ref={modalRef}>
            <div className="preview-modal">
                <animated.div className="todo" style={{ overflow: 'hidden', position: 'relative', backgroundColor: 'black', height, width }}>
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
                            opacity: `${videoLoaded && showModalCard ? 1 : 0}`,
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
                            opacity: `${!videoLoaded || !showModalCard ? 1 : 0}`,
                        }}
                    >
                        <img
                            style={{ display: 'block', width: '100% ', height: '100%' }}
                            src={`https://image.tmdb.org/t/p/w500/${video.backdrop_path}`}
                            alt=""
                        />
                    </div>
                </animated.div>

                <div className="preview-info" style={{ lineHeight: '1.6', width: '100%' }} ref={infoRef}>
                    <PreviewModalControls />
                    <PreviewModalInfo />
                    <PreviewModalTags />
                </div>
            </div>
        </animated.div>
    );
};

export default PreviewModal;
