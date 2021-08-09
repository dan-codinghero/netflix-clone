import React, { useState } from 'react';

import Panel from '../../components/Panel/Panel';
import Footer from '../../components/Footer/Footer';
import Logo from '../../components/UI/Logo/Logo';
import Navbar from '../../components/Navbar/Navbar';
import Divider from '../../components/UI/Divider/Divider';
import Layout from '../../components/UI/Layout/Layout';

import footerLinks from '../../fixtures/login-footer-links.json';
import { useDispatch, useSelector } from 'react-redux';
import { signupAsyncThunk } from '../../store/auth-slice';
import { useHistory, useLocation } from 'react-router-dom';
import { STATE_SLICE } from '../../store/state-configuration';
import WORKFLOW_ROUTES from '../../constants/workflow-routes';
import { WORKFLOW } from '../../constants/workflow';
import { FIELDS, FormFields, FormPack } from '../../components/FormPack/Form';

///signup/regform
const STEP_CONTENTS = {
    [WORKFLOW.GUEST]: {
        title: `Create a password to start your membership`,
        subTitle: `Just a few more steps and you're done!\nWe hate paperwork, too.`,
    },
    [WORKFLOW.SIGNUP_PASSWORD]: {
        title: `Welcome back!\nJoining Cineplex is easy.`,
        subTitle: `Just a few more steps and you're done!\nWe hate paperwork, too.`,
    },
    [WORKFLOW.CREATE_PROFILES]: {
        title: `Welcome back!\nJoining Cineplex is easy.`,
        subTitle: `Just a few more steps and you're done!\nWe hate paperwork, too.`,
    },
};

const Regform = (props) => {
    const history = useHistory();

    const dispatch = useDispatch();
    const location = useLocation();

    const { workflow } = useSelector((state) => state[STATE_SLICE.ACCOUNT.name]);
    const [requestError, setRequestError] = useState();
    // const email = window.localStorage.getItem('account-email');
    const email = history.location.state?.email;

    const fields = [...(!email ? [FIELDS.EMAIL] : []), FIELDS.PASSWORD];

    const handleFormSubmit = async (data) => {
        try {
            await dispatch(signupAsyncThunk({ password: data.password, email: email || data.email })).unwrap();
            const path = history.location.state?.redirect || `${WORKFLOW_ROUTES[workflow].authenticatedRedirect}`;
            window.localStorage.removeItem('account-email');
            history.replace(path, { ...location.state });
        } catch (err) {
            setRequestError(err.message);
        }
    };
    return (
        <Layout theme="light">
            <Navbar NavBrand={Logo} />
            <Divider size="xs" theme="light" />

            <Panel>
                <div className="center-container">
                    <div className="center-container--body">
                        <div>
                            {requestError && <div>{requestError}</div>}
                            <div className="step-indicator">STEP 1 OF 3</div>

                            <div className="step-title">{`${STEP_CONTENTS[workflow].title}`}</div>
                            <div className="step-subtitle">{`${STEP_CONTENTS[workflow].subTitle}`}</div>
                        </div>
                        <FormPack
                            render={(errors, register, handleSubmit) => {
                                return (
                                    <form onSubmit={handleSubmit(handleFormSubmit)} style={{ textAlign: 'left' }}>
                                        {email && (
                                            <div className="input-readOnly" style={{ padding: '10px 0' }}>
                                                <div className="label-readOnly">Email</div>
                                                <div className="value-readOnly" id="field-email" style={{ fontWeight: '700' }}>
                                                    {email}
                                                </div>
                                            </div>
                                        )}
                                        <FormFields fields={fields} register={register} errors={errors} />
                                        <button className="button button--brand button--md">CONTINUE</button>
                                    </form>
                                );
                            }}
                        />{' '}
                    </div>
                </div>
            </Panel>

            <Footer links={footerLinks} className="footer--reg" />
        </Layout>
    );
};

export default Regform;
