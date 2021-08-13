import React from 'react';

import Panel from '../../components/Panel/Panel';
import Footer from '../../components/Footer/Footer';
import Logo from '../../components/UI/Logo/Logo';
import Navbar from '../../components/Navbar/Navbar';
import { VscCheck } from 'react-icons/vsc';
import Divider from '../../components/UI/Divider/Divider';

import stepImage from '../../assets/images/misc/checkmark.png';
import footerLinks from '../../fixtures/login-footer-links.json';
import Layout from '../../components/UI/Layout/Layout';

import './SignUp.css';
import { ROUTES } from '../../constants/routes';
import { Link } from 'react-router-dom';
import SecondaryNavItems from '../../components/Navbar/SecondaryNavItems';

const items = ['No commitments, cancel anytime.', 'Everything on Cineplex for one low price.', 'Unlimited viewing on all your devices.'];
//https://www.Cineplex.com/signup
const SignUp = (props) => {
    return (
        <div className="signup-container">
            <Layout theme="light">
                <Navbar NavBrand={Logo}>
                    <SecondaryNavItems />
                </Navbar>
                <Divider size="xs" theme="light" />
                <Panel>
                    <div className="center-container">
                        <div className="center-container--body">
                            <img src={stepImage} alt="" />

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
                            <div className="plans-button">
                                <Link
                                    to={{ pathname: ROUTES.PLANFORM, state: { fromSignup: true } }}
                                    className={`button-link button--md button--brand`}
                                >
                                    SEE THE PLANS
                                </Link>
                            </div>

                            {/* <ButtonLink href={{ pathname: ROUTES.PLANFORM, state: { fromSignup: true } }} size="md">
                                SEE THE PLANS
                            </ButtonLink> */}
                        </div>
                    </div>
                </Panel>
                <Footer links={footerLinks} className="footer--reg" />
            </Layout>
        </div>
    );
};

export default SignUp;
