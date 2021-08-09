import React, { Fragment } from 'react';

import Navbar from '../../components/Navbar/Navbar';
import Layout from '../../components/UI/Layout/Layout';
import Footer from '../../components/Footer/Footer';
import PrimaryNavItems from '../../components/Navbar/PrimaryNavItems.jsx';
import SecondaryNavItems from '../../components/Navbar/SecondaryNavItems.jsx';
import footerLinks from '../../fixtures/login-footer-links.json';
import BrowseContent from '../../components/BrowseContent/BrowseContent';
import NavbarPin from '../../components/Navbar/NavbarPin';
import { Link } from 'react-router-dom';
import Profile from '../../components/Profile/Profile';
import ProfileCards from '../../components/Profile/ProfileCards/ProfileCards';
import { useSelector } from 'react-redux';
// import { getProfiles } from '../../store/account-slice';
import { STATE_SLICE } from '../../store/state-configuration';

const Browse = () => {
    const { activeProfile, profiles } = useSelector((state) => state[STATE_SLICE.ACCOUNT.name]);

    const renderNavbar = activeProfile ? (
        <NavbarPin>
            <Navbar>
                <Fragment>
                    <PrimaryNavItems />
                    <SecondaryNavItems />
                </Fragment>
            </Navbar>
        </NavbarPin>
    ) : (
        <Navbar />
    );
    return (
        <div onClick={() => {}}>
            <Layout theme="dark">
                {renderNavbar}
                {!activeProfile ? (
                    <div style={{}}>
                        <Profile label="Who's watching?" action={<Link to="/">MANAGE PROFILES</Link>}>
                            <ProfileCards profiles={profiles} />
                        </Profile>
                    </div>
                ) : (
                    <BrowseContent />
                )}

                {activeProfile ? <Footer links={footerLinks} /> : null}
            </Layout>
        </div>
    );
};

export default Browse;
// { position: 'absolute', top: '0', right: '0', left: '0', bottom: '0' }
