import React from 'react';
import { Switch, Router } from 'react-router-dom';

import './app.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Browse from './pages/Browse/Browse';
import Regform from './pages/RegForm/RegForm';
import SignUp from './pages/SignUp/SignUp';
import Planform from './pages/PlanForm/PlanForm';
import PaymentOption from './pages/PaymentOption/PaymentOption';
import CreateProfiles from './pages/CreateProfiles/CreateProfiles';
import history from './helpers/history';
import { ROUTES } from './constants/routes';
import { IsUserRedirect, ProtectedRoute } from './route/Route';
import useAuthentication from './hooks/useAuthentication';
import Layout from './components/UI/Layout/Layout';
import Spinner from './components/UI/Spinner/Spinner';

// <Route path="/browse" exact component={Browse} />
// <Route path="/login" exact component={Login} />
// <Route path="/signup" exact component={SignUp} />
// <Route path="/signup/password" exact component={Regform} />
// <Route path="/registration" exact component={Registration} />
// <Route path="/regform" exact component={Regform} />
// <Route path="/planform" exact component={Planform} />
// <Route path="/payment-option" exact component={PaymentOption} />
// <Route path="/continue" exact component={SignupForm} />
// <IsUserRedirect path={ROUTES.REGISTRATION} exact Component={Registration} />
// <ProtectedRoute path={ROUTES.BROWSE} exact redirectPath={ROUTES.LOGIN} Component={Browse} isSignedIn={isSignedIn} />

const App = () => {
    const { isSignedIn, loading } = useAuthentication();
    console.log(`App.jsx: user sign in status ${isSignedIn}`);
    // console.log(`App.jsx: user sign in status ${isSignedIn} and loading status ${loading}`);

    if (loading)
        return (
            <Layout>
                <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner />
                </div>
            </Layout>
        );
    return (
        <Router history={history}>
            <Switch>
                <IsUserRedirect path={ROUTES.HOME} exact Component={Home} isSignedIn={isSignedIn} />

                <ProtectedRoute path={ROUTES.BROWSE} exact redirectPath={ROUTES.LOGIN} Component={Browse} isSignedIn={isSignedIn} />
                <IsUserRedirect path={ROUTES.LOGIN} exact Component={Login} isSignedIn={isSignedIn} />
                <IsUserRedirect path={ROUTES.SIGNUP} exact Component={SignUp} isSignedIn={isSignedIn} />
                <IsUserRedirect path={ROUTES.SIGNUP_PASSWORD} exact Component={Regform} isSignedIn={isSignedIn} />
                <IsUserRedirect path={ROUTES.REGFORM} exact Component={Regform} isSignedIn={isSignedIn} />
                <IsUserRedirect path={ROUTES.PLANFORM} exact Component={Planform} isSignedIn={isSignedIn} />
                <ProtectedRoute path={ROUTES.PAYMENT_OPTION} exact redirectPath={ROUTES.REGFORM} Component={PaymentOption} isSignedIn={isSignedIn} />
                <ProtectedRoute
                    path={ROUTES.CREATE_PROFILES}
                    exact
                    redirectPath={ROUTES.REGFORM}
                    Component={CreateProfiles}
                    isSignedIn={isSignedIn}
                />
            </Switch>
        </Router>
    );
};

export default App;
