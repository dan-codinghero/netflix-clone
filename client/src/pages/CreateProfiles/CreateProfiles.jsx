import React from 'react';
import { useDispatch } from 'react-redux';

import Panel from '../../components/Panel/Panel';
import Footer from '../../components/Footer/Footer';
import Logo from '../../components/UI/Logo/Logo';
import Navbar from '../../components/Navbar/Navbar';
import Divider from '../../components/UI/Divider/Divider';
import Layout from '../../components/UI/Layout/Layout';

import footerLinks from '../../fixtures/login-footer-links.json';
import { addBulkProfiles } from '../../store/account-slice';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { FIELDS, FormFields, FormPack } from '../../components/FormPack/Form';
import './CreateProfiles.css';
import SecondaryNavItems from '../../components/Navbar/SecondaryNavItems';

const fields = [FIELDS.PROFILE1, FIELDS.PROFILE2, FIELDS.PROFILE3, FIELDS.PROFILE4, FIELDS.PROFILE5];
const CreateProfiles = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleFormSubmit = async (data) => {
        if (!data) return;

        const filteredInputs = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== ''));
        const profiles = [];
        for (const [index, [, value]] of Object.entries(Object.entries(filteredInputs))) {
            const profile = {};
            if (parseInt(index) === 0) {
                profile.isAccountOwner = true;
            } else {
                profile.isAccountOwner = false;
            }
            profile.profileName = value;
            profile.avatarName = '';
            profile.isKid = false;

            profiles.push(profile);
        }
        try {
            console.log('adding profiles');
            await dispatch(addBulkProfiles(profiles)).unwrap();
            history.replace(`${ROUTES.BROWSE}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="create-profiles-container">
            <Layout theme="light">
                <Navbar NavBrand={Logo}>
                    <SecondaryNavItems />
                </Navbar>
                <Divider size="xs" theme="light" />

                <Panel>
                    <div className="center-container">
                        <div className="center-container--body">
                            <div className="step-indicator">STEP 3 OF 3</div>

                            <div className="step-title">Create profiles.</div>
                            <div className="step-subtitle">We are almost done!</div>
                            <FormPack
                                render={(errors, register, handleSubmit) => {
                                    return (
                                        <form onSubmit={handleSubmit(handleFormSubmit)} style={{ textAlign: 'left' }}>
                                            <FormFields fields={fields} register={register} errors={errors} />

                                            <button className="button button--brand button--md">CONTINUE</button>
                                        </form>
                                    );
                                }}
                            />
                        </div>
                    </div>
                </Panel>

                <Footer links={footerLinks} className="footer--reg" />
            </Layout>
        </div>
    );
};

export default CreateProfiles;
