import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getElementOffsetToWindow } from '../../../../utils/DOM-utils';
import './SliderItem.css';

import PreviewModal from '../../../PreviewModal/PreviewModal';
import Modal from '../../../UI/Modal/Modal';
import useDelayRender from '../../../../hooks/use-delay-render';

//BUG: Modal opens if user scrolls after mouse enter events triggers
const SliderItem = (props) => {
    const { video, viewportPosition, viewportIndex } = props;

    const [showModal, setShowModal] = useState(false);
    const renderModal = useDelayRender(showModal, { enter: 500 });

    const sliderImageRef = useRef();

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        if (renderModal) return;
        setShowModal(false);
    };

    const getTitleCardRect = () => {
        return getElementOffsetToWindow(sliderImageRef.current.getBoundingClientRect());
    };

    return (
        <React.Fragment>
            {renderModal && (
                <Modal>
                    <PreviewModal
                        video={video}
                        handleModalClose={() => setShowModal(false)}
                        titleCardRect={getTitleCardRect()}
                        viewportIndex={viewportIndex}
                        viewportPosition={viewportPosition}
                    />{' '}
                </Modal>
            )}

            <div className={`slider-item slider-item-${viewportIndex}`}>
                <div className="tracking-context" data-ui-tracking-context={`video_id:${video.id}`} data-tracking-uuid="">
                    <Link to="/" tabIndex="0" onMouseEnter={handleShowModal} onMouseLeave={handleModalClose}>
                        <img
                            className="slider-image"
                            src={`https://image.tmdb.org/t/p/w500/${video.backdrop_path}`}
                            alt={video.title}
                            ref={sliderImageRef}
                        ></img>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SliderItem;
