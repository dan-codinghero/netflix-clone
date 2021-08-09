import React, { Fragment, useState } from 'react';

import CtaForm from '../../components/CtaForm/CtaForm';
import Footer from '../../components/Footer/Footer';
// import StoryCards from '../../components/story-cards/story-cards';
import Faq from '../../components/Faq/Faq';
import Panel from '../../components/Panel/Panel';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Divider from '../../components/UI/Divider/Divider';
import Layout from '../../components/UI/Layout/Layout';

import faqs from '../../fixtures/faq.json';
import cards from '../../fixtures/cards.json';
import footerLinks from '../../fixtures/main-footer-links.json';
import SecondaryNavItems from '../../components/Navbar/SecondaryNavItems';
import BillboardBanner from '../../components/Billboard/BillboardBanner/BillboardBanner';
import UIMarkup from '../../components/UI/UIMarkup/UIMarkup';

import './Home.css';
import { VscChevronRight } from 'react-icons/vsc';
import StoryCard from '../../components/StoryCard/StoryCard';
import { useDispatch, useSelector } from 'react-redux';
import { STATE_SLICE } from '../../store/state-configuration';
import { useHistory, useLocation } from 'react-router-dom';
// import { FloatField, FormGroup } from '../../components/FormPack/FormPack';

import Notify from '../../components/UI/Notification/Notify';
import { registerAccount } from '../../store/account-slice';
import { FIELDS } from '../../components/FormPack/Form';
import { WORKFLOW } from '../../constants/workflow';
import WORKFLOW_ROUTES from '../../constants/workflow-routes';

const Home = (props) => {
    const { isSignedIn } = useSelector((state) => state[STATE_SLICE.AUTH.name]);
    const { workflow } = useSelector((state) => state[STATE_SLICE.ACCOUNT.name]);
    const [requestError, setRequestError] = useState();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const email = history.location.state?.email;
    if (email) FIELDS.EMAIL.defaultValue = `${email}`;
    const fields = [FIELDS.EMAIL];

    async function handleRegistration(data) {
        try {
            const account = await dispatch(registerAccount({ email: data.email })).unwrap();

            const redirectWithEmailWorkflow = [WORKFLOW.SIGNUP_PASSWORD, WORKFLOW.BROWSWE];
            history.push(
                `${WORKFLOW_ROUTES[account.workflow].unauthenticatedRedirect}`,
                redirectWithEmailWorkflow.includes(account.workflow) ? { ...location.state, email: data.email } : { ...location.state }
            );
        } catch (err) {
            setRequestError(err.message);
        }
    }

    const renderRegistrationCTA = () => {
        let cta = (
            <div className="cta">
                <div className="cta-title">
                    <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                </div>
                <CtaForm btnClasses="" btnText="TRY 30 DAYS FREE" showLoader={true} handleSubmission={handleRegistration} fields={fields} />
                {requestError && <Notify type="error">{requestError}</Notify>}
                <div className="cta-disclaimer">
                    <h4>Only new members are eligible for this offer.</h4>
                </div>
            </div>
        );

        const handleContinueSignup = () => {
            history.push(`${WORKFLOW_ROUTES[workflow].authenticatedRedirect}`);
        };

        if (isSignedIn) {
            cta = (
                <div style={{ display: 'flex', height: '4.5rem', justifyContent: 'center' }}>
                    <div style={{}}>
                        <button onClick={handleContinueSignup} className="button button--brand" style={{ padding: '0 .6rem', height: '100%' }}>
                            CONTINUE SIGNUP <VscChevronRight />
                        </button>
                    </div>
                </div>
            );
        }
        return cta;
    };

    return (
        <Layout>
            <Header>
                <Navbar>
                    <SecondaryNavItems />
                </Navbar>
                <BillboardBanner />
                <Panel>
                    <UIMarkup tagName="h1" className="headline-title" text="Unlimited movies, TV shows, and more."></UIMarkup>
                    <UIMarkup tagName="h2" className="headline-subtitle" text="Watch anywhere. Cancel anytime."></UIMarkup>
                    {renderRegistrationCTA()}
                </Panel>
            </Header>

            <Divider size="lg" theme="dark" />

            {cards.map((card) => (
                <Fragment key={card.id}>
                    <StoryCard card={card} />
                    <Divider theme="dark" size="lg" />
                </Fragment>
            ))}

            <Panel>
                <div style={{ maxWidth: '95rem', margin: '0 auto' }}>
                    <Faq faqs={faqs} title="Frequently Asked Questions"></Faq>

                    <CtaForm btnClasses="" btnText="GET STARTED" showLoader={true} handleSubmission={handleRegistration} fields={fields} />
                    {requestError && <Notify type="error">{requestError}</Notify>}
                </div>
            </Panel>

            <Divider size="lg" theme="dark" />

            <Footer links={footerLinks} configuration={{ color: 'black' }} />
        </Layout>
    );
};

export default Home;
