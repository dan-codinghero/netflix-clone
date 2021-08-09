import React, { Fragment, useEffect, useState } from 'react';

import Logo from '../../components/UI/Logo/Logo';
import Navbar from '../../components/Navbar/Navbar';
import Divider from '../../components/UI/Divider/Divider';
import Panel from '../../components/Panel/Panel';
import Layout from '../../components/UI/Layout/Layout';
import { VscCheck } from 'react-icons/vsc';
import Footer from '../../components/Footer/Footer';

import footerLinks from '../../fixtures/login-footer-links.json';
import Plangrid from '../../components/Plangrid/Plangrid';

import './PlanForm.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useGetPlansQuery } from '../../api/plans.api';
import { STATE_SLICE } from '../../store/state-configuration';
import { useSelector } from 'react-redux';
import SecondaryNavItems from '../../components/Navbar/SecondaryNavItems';

const items = ['Watch all you want. Ad-free.', 'Recommendations just for you.', 'Change or cancel your plan anytime.'];
const GRID_ROW_TITLE = {
    supportedDevices: 'Watch on your TV, computer, mobile phone and tablet',
    price: 'Monthly Price',
    videoQuality: 'Video quality',
    resolution: 'Resolution',
    // maxScreenCount: 'Screens you can watch on at the same time',
};

//https://www.cineplex.com/signup/planform

// state:
// index: 2
// trackingInfo:
// actions: ["registerOnlyAction"]
// flow: "signupSimplicity"
// mode: "registrationWithContext"

const PlanForm = () => {
    const history = useHistory();
    const location = useLocation();
    const { isSignedIn } = useSelector((state) => state[STATE_SLICE.AUTH.name]);
    const [planId, setPlanId] = useState();
    const { data, error, isLoading } = useGetPlansQuery();

    const fromSignup = history.location.state?.fromSignup;
    const fromPlanId = history.location.state?.fromPlanId;

    useEffect(() => {
        if (!fromSignup) {
            history.replace(ROUTES.SIGNUP);
        }
    }, [history, fromSignup]);

    useEffect(() => {
        if (!data) return;
        const promotedPlan = fromPlanId || data.find((plan) => plan.isPromoted);
        setPlanId(fromPlanId || promotedPlan._id);
        return () => {};
    }, [data, fromPlanId]);

    const handleContinue = () => {
        if (isSignedIn) {
            history.push(ROUTES.PAYMENT_OPTION, { ...location.state, fromPlanId: planId });
        } else {
            history.push(ROUTES.SIGNUP_PASSWORD, { ...location.state, fromPlanId: planId, redirect: ROUTES.PLANFORM });
        }
    };

    const renderPlanSelection = () => {
        return error ? (
            <div>Oh no, there was an error</div>
        ) : isLoading ? (
            <div>Loading...</div>
        ) : data ? (
            <Fragment>
                <Plangrid
                    handleContinue={handleContinue}
                    handlePlanSelected={setPlanId}
                    gridRowTitle={GRID_ROW_TITLE}
                    items={data}
                    selectedPlan={planId}
                />
                <div>
                    <small className="plan-disclaimer ">
                        <div>
                            Full HD (1080p), Uldiva HD (4K) and HDR availability subject to your internet service and device capabilities. Not all
                            content available in HD, Full HD, Uldiva HD or HDR. See
                            <Link to="/termsofuse" target="_blank">
                                Terms of Use
                            </Link>{' '}
                            for more details.
                        </div>
                        <div>
                            Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with
                            Standard and 1 with Basic.
                        </div>
                    </small>
                    <div className="button-container">
                        <button className="button button--brand button--md" onClick={handleContinue}>
                            CONTINUE
                        </button>
                    </div>
                </div>
            </Fragment>
        ) : null;
    };

    return (
        <div className="planform-container">
            <Layout theme="light">
                <Navbar NavBrand={Logo}>
                    <SecondaryNavItems />
                </Navbar>
                <Divider size="xs" theme="light" />
                <Panel>
                    <div className="center-container">
                        <div className="center-container--body">
                            <div className="step-indicator">STEP 2 OF 3</div>

                            <div className="step-title">Choose your plan.</div>
                            <div className="icon-group">
                                {items.map((item) => (
                                    <div key={item} className="icon-group-row">
                                        <span className="icon-group--icon">
                                            <VscCheck color="red" />
                                        </span>
                                        <div className="icon-group--text">{item}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {renderPlanSelection()}
                </Panel>
                <Divider size="xs" theme="light" />
                <Footer links={footerLinks} className="footer--reg" />
            </Layout>
        </div>
    );
};

export default PlanForm;
