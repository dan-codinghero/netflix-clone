import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './LoginForm.css';
import fbLogo from '../../assets/images/fb.png';

import { FIELDS, FormFields, FormPack } from '../FormPack/Form';
import { useDispatch } from 'react-redux';
import { loginAsyncThunk } from '../../store/auth-slice';
import WORKFLOW_ROUTES from '../../constants/workflow-routes';
import { ROUTES } from '../../constants/routes';
import Notify from '../UI/Notification/Notify';

const LoginForm = (props) => {
    const [requestError, setRequestError] = useState();
    const dispatch = useDispatch();
    const history = useHistory();

    const email = history.location.state?.email;

    const fields = [FIELDS.EMAIL, FIELDS.PASSWORD];
    const defaultValues = email ? { email } : {};

    const handleFormSubmit = async (data) => {
        try {
            const { email, password } = data;
            const account = await dispatch(loginAsyncThunk({ email, password })).unwrap();

            history.push(WORKFLOW_ROUTES[account.workflow].authenticatedRedirect);
        } catch (err) {
            setRequestError(err.message);
        }
    };

    return (
        <div className="login-form">
            {requestError && <Notify type="error">{requestError}</Notify>}
            <div className="login-content">
                <h1>Sign In</h1>

                <FormPack
                    defaultValues={defaultValues}
                    render={(errors, register, handleSubmit) => {
                        return (
                            <form onSubmit={handleSubmit(handleFormSubmit)}>
                                <FormFields fields={fields} register={register} errors={errors} />

                                <div className="login-form__button">
                                    <button className="button button--brand button--md">Sign In</button>
                                </div>
                            </form>
                        );
                    }}
                />

                <div className="login-form__help">
                    <div className="login-form__remember-me">
                        <input type="checkbox" name="remember-me" id="" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <Link to={ROUTES.HOME}>Need help?</Link>
                </div>
                <div className="login-form-other">
                    <div className="login-form__sign-up">
                        <div className="login-form__external">
                            <button>
                                <img src={fbLogo} alt="" /> Login with Facebook
                            </button>
                        </div>
                        <p className="sign-up-now">
                            New to Cineplex? <Link to={ROUTES.HOME}>Sign up now.</Link>
                        </p>

                        <p className="login-form-recaptcha">
                            This page is protected by Google reCAPTCHA to ensure you're not a bot.
                            <Link to={ROUTES.HOME}>Learn more</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
