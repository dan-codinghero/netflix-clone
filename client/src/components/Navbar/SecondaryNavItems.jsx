import React, { Fragment } from 'react';
import { AiFillBell, AiOutlineGift } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { WORKFLOW } from '../../constants/workflow';
import { logout } from '../../store/auth-slice';
import { STATE_SLICE } from '../../store/state-configuration';
// import ButtonLink from '../UI/Button/ButtonLink';
import SearchInput from '../UI/SearchInput/SearchInput';

const SecondaryNavItems = (props) => {
    const { isSignedIn } = useSelector((state) => state[STATE_SLICE.AUTH.name]);
    const { workflow, profiles, activeProfile } = useSelector((state) => state[STATE_SLICE.ACCOUNT.name]);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = async () => {
        await dispatch(logout());
        history.replace(ROUTES.HOME);
    };

    const renderSecondaryNavItems = () => {
        if (isSignedIn && workflow === WORKFLOW.BROWSWE && activeProfile) {
            const profile = profiles.filter((profile) => profile.guid === activeProfile)[0];

            // const imgUrl = `${request.defaults.baseUrl}/static/images/${profile.avatarName}`;
            // const profileAvatar = `${request.defaults.baseUrl}/static/images/tiny/${profile.avatarName}`;
            // const profileAvatar = `${process.env.REACT_APP_ASSETS_URI}/images/tiny/${profile.avatarName}`;
            const profileAvatar = require(`../../assets/images/profile-cards/tiny/${profile.avatarName}`).default;

            return (
                <Fragment>
                    <div className="menu-item search">
                        <SearchInput />
                    </div>
                    <div className="menu-item">
                        <Link className="menu-icon" to="/">
                            <AiOutlineGift />
                        </Link>
                    </div>
                    <div className="menu-item">
                        <span className="menu-icon" to="/">
                            <AiFillBell />
                        </span>
                    </div>
                    <div className="menu-item" onClick={handleLogout}>
                        <div className="menu-image">
                            <img className="" src={profileAvatar} alt="" />
                        </div>
                    </div>
                </Fragment>
            );
        } else if (isSignedIn && workflow !== WORKFLOW.BROWSWE) {
            return (
                <div className="menu-item">
                    <button className="button button--brand button--sm" onClick={handleLogout}>
                        Sign Out
                    </button>
                </div>
            );
        } else if (!isSignedIn) {
            return (
                <div className="menu-item">
                    <Link to={ROUTES.LOGIN} className={`button--brand button-link button--sm`}>
                        Sign In
                    </Link>
                    {/* <ButtonLink href="/login">Sign In</ButtonLink> */}
                </div>
            );
        }
    };

    return (
        <div className="main-nav__secondary__items" style={{ position: 'absolute', right: '0' }}>
            {renderSecondaryNavItems()}
        </div>
    );
};

export default SecondaryNavItems;
// <NavLink to="/">
// <img className="" src={profileAvatar} alt="" />
// </NavLink>
