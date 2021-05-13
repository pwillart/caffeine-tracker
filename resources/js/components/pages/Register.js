import React from 'react';
import Layout from "../layout/Layout";
import RegisterForm from "../user/RegisterForm";

const Register = () => {
    return (
        <Layout title="Register" className="container">
           <RegisterForm />
        </Layout>
    )
}
export default Register;
