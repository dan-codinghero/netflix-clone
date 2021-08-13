import React, { useEffect, useState } from 'react';
import Layout from '../../components/UI/Layout/Layout';

import Panel from '../../components/Panel/Panel';
import Footer from '../../components/Footer/Footer';
import footerLinks from '../../fixtures/login-footer-links.json';
import Logo from '../../components/UI/Logo/Logo';
import Navbar from '../../components/Navbar/Navbar';
import Divider from '../../components/UI/Divider/Divider';
import amex from '../../assets/images/misc/amex-v2.svg';
import visa from '../../assets/images/misc/visa-v3.svg';
import mastercard from '../../assets/images/misc/mastercard-v2.svg';
import stepImage from '../../assets/images/misc/Lock.png';
import { VscChevronRight } from 'react-icons/vsc';
//1. https://www.Cineplex.com/signup/registration?locale=en-JM

import './PaymentOption.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addSubscriptionPlan } from '../../store/account-slice';
import { ROUTES } from '../../constants/routes';
import SecondaryNavItems from '../../components/Navbar/SecondaryNavItems';

const PaymentOption = (props) => {
    // const { requestStatus } = useSelector((state) => state[STATE_SLICE.SUBSCRIPTION.name]);
    const [requestError, setRequestError] = useState();
    const history = useHistory();
    const { state } = useLocation();
    const dispatch = useDispatch();

    const planId = history.location.state?.fromPlanId;

    useEffect(() => {
        return () => {
            if (history.action === 'POP') {
                history.push(history.location.pathname, { ...state });
                history.location.state = state;
            }
        };
    }, [history, state]);

    useEffect(() => {
        if (!planId) {
            history.push(ROUTES.SIGNUP);
        }
    }, [history, planId]);

    const handlePaymentOption = async () => {
        // dispatch(submitSubscriptionPlan(planId));
        try {
            console.log('adding plan');
            await dispatch(addSubscriptionPlan({ planId })).unwrap();
            history.replace(`${ROUTES.CREATE_PROFILES}`);
        } catch (err) {
            setRequestError(err.message);
        }
    };

    return (
        <div className="payment-option">
            <Layout theme="light">
                <Navbar NavBrand={Logo}>
                    <SecondaryNavItems />
                </Navbar>
                <Divider theme="light" />
                <Panel>
                    <div className="center-container">
                        <div className="center-container--body">
                            {requestError && <div>{requestError}</div>}
                            <img src={stepImage} alt="" />
                            <div className="step-indicator">STEP 3 OF 3</div>

                            <div className="step-title">Set up your payment.</div>
                            <div className="step-subtitle">{`Your membership starts as\nsoon as you set up\npayment.`}</div>
                            <p className="step-subtitle emphasize">{`No commitments.\nCancel online anytime.`}</p>
                            <button className="button button--primary button--md" onClick={handlePaymentOption}>
                                <span className="payment">
                                    Credit or Debit Card
                                    <span className="payment__vendors">
                                        <img className="payment__vendor" src={visa} alt="" />
                                        <img className="payment__vendor" src={mastercard} alt="" />
                                        <img className="payment__vendor" src={amex} alt="" />
                                    </span>
                                </span>
                                <VscChevronRight />
                            </button>
                        </div>
                    </div>
                </Panel>
                <Footer links={footerLinks} className="footer--reg" />
            </Layout>
        </div>
    );
};

export default PaymentOption;
