import React, { Fragment } from 'react';

import titleImage from '../../assets/images/video-cards/alice-in-borderland-title.webp';

import BillboardBanner from '../Billboard/BillboardBanner/BillboardBanner';
import BillboardMotion from '../Billboard/BillboardMotion/BillboardMotion';
import BillboardCta from '../Billboard/BillboardCta/BillboardCta';
import Billboard from '../Billboard/Billboard';
import { useItemsInRow } from './use-items-in-row'; //move to slider hooks
import SliderCatalogue from '../SliderCatalogue/SliderCatalogue';
import { useGetVideosQuery } from '../../api/video.api';

const BrowseContent = (props) => {
    const { data: videos, error, isLoading } = useGetVideosQuery();
    console.log(videos);

    const itemsInRow = useItemsInRow();

    return (
        <Fragment>
            <Billboard>
                <BillboardBanner>
                    <BillboardMotion titleImage={titleImage} hasMotionVideo={true}>
                        <BillboardCta />
                    </BillboardMotion>
                </BillboardBanner>
            </Billboard>
            {error ? (
                <div>Oh no, there was an error</div>
            ) : isLoading ? (
                <div>Loading...</div>
            ) : videos ? (
                <Fragment>
                    <SliderCatalogue rowNum={1} itemsInRow={itemsInRow} videos={[...videos.results].splice(0, 12)} hideRowHeader />
                    <SliderCatalogue rowNum={1} itemsInRow={itemsInRow} videos={[...videos.results].splice(0, 12)} hideRowHeader />
                </Fragment>
            ) : null}
        </Fragment>
    );
};

export default BrowseContent;
