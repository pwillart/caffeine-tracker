import React from 'react';
import Layout from "../layout/Layout";
import LoginForm from "../user/LoginForm";

const Login = () => {
    return (
        <Layout title="Login" className="container">
           <LoginForm />
        </Layout>
    )
}
export default Login;
