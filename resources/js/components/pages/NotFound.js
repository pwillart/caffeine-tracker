import React from 'react';
import Image from 'react-bootstrap/Image';
import Layout from "../layout/Layout";

const NotFound = () => {
    return (
        <Layout title="Cuppa Caffeine Tracker" className="container">
            <div className="vh-100">
                <div className="h-25 w-100 d-inline-block text-center">
                    <h3 className="text-secondary">Page not found</h3>
                    <Image src="/images/404.png" alt="#404 - Page not found" fluid/>
                </div>
            </div>
        </Layout>
    )
}
export default NotFound;
