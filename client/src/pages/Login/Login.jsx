import React from 'react';

import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import LoginForm from '../../components/LoginForm/LoginForm';
import footerLinks from '../../fixtures/login-footer-links.json';
import Logo from '../../components/UI/Logo/Logo';
import BillboardBanner from '../../components/Billboard/BillboardBanner/BillboardBanner';
import Layout from '../../components/UI/Layout/Layout';

import './Login.css';
const Login = (props) => {
    return (
        <Layout theme="dark">
            <BillboardBanner />
            <div className="login-wrapper">
                <Navbar NavBrand={Logo} />

                <LoginForm />

                <Footer links={footerLinks} />
            </div>
        </Layout>
    );
};

export default Login;
