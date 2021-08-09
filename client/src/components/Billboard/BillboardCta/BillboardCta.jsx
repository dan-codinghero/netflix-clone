import React from 'react';
import { GrPlayFill } from 'react-icons/gr';
import { ImInfo } from 'react-icons/im';
import './BillboardCta.css';

const BillboardCta = () => {
    return (
        <div className="banner-info__buttons">
            <div className="banner-info__buttons--play">
                <button className="button button--primary button--sm">
                    <GrPlayFill
                        style={{
                            margin: '0 .8rem 0 0',
                        }}
                    />
                    Play
                </button>
            </div>
            <div className="banner-info__buttons--info">
                <button className="button button--secondary button--sm">
                    <ImInfo
                        fontWeight="bold"
                        style={{
                            margin: '0 .8rem 0 0',
                        }}
                    />
                    More Info
                </button>
            </div>
        </div>
    );
};

export default BillboardCta;
