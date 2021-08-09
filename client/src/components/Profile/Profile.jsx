import React from 'react';

import './Profile.css';

const ProfileList = (props) => {
    const { label, action, children } = props;

    return (
        <div className="profile-list">
            <div className="profile-list__content">
                <div className="profile-list__label">{label}</div>
                <div>{children}</div>
            </div>
            <div className="manage-profile">{action}</div>
        </div>
    );
};

export default ProfileList;
