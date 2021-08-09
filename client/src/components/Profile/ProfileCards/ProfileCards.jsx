import React from 'react';

import './ProfileCards.css';
import ProfileCard from './ProfileCard/ProfileCard';

const ProfileCards = (props) => {
    const { profiles } = props;
    return (
        <div className="profile-cards">
            {profiles.map((profile, index) => (
                <div className="profile-cards__item" key={index}>
                    <ProfileCard profile={profile} />
                </div>
            ))}
        </div>
    );
};

export default ProfileCards;
