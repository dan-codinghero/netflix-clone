import React from 'react';
import Panel from '../Panel/Panel';

import PropTypes from 'prop-types';

import './StoryCard.css';

const StoryCard = (props) => {
    const { card } = props;
    const imageSource = require(`../../assets/images/${card.image}`).default;
    return (
        <Panel>
            <div key={card.id} className={`story-card ${card.direction}`}>
                <div className="story-card__text">
                    <h1 className="story-card__title">{card.title}</h1>
                    <h2 className="story-card__sub-title">{card.subTitle}</h2>
                </div>
                <div className="story-card__image">
                    <img src={imageSource} alt={card.alt} />
                </div>
            </div>
        </Panel>
    );
};

StoryCard.propTypes = {
    card: PropTypes.object.isRequired,
};

export default StoryCard;
