import React from 'react';
import { useDispatch } from 'react-redux';
import request from '../../../../api/request-config';
import { accountActions } from '../../../../store/account-slice';

import './ProfileCard.css';

const ProfileCard = (props) => {
    const { profile } = props;

    const imgUrl = `${request.defaults.baseUrl}/static/images/${profile.avatarName}`;
    const profileAvatarStyle = { backgroundImage: `url(${imgUrl})` };
    const dispatch = useDispatch();

    const setActiveProfile = (guid) => {
        dispatch(accountActions.setActiveProfile({ profileGuid: guid }));
    };
    return (
        <div className="profile-card" onClick={() => setActiveProfile(profile.guid)}>
            <div className="profile-card__container">
                <div className="profile-card__avatar" style={profileAvatarStyle}></div>
                <div className="profile-card__name">{profile.profileName}</div>
            </div>
        </div>
    );
};

export default ProfileCard;
