import React, {useContext, useEffect} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useHistory} from "react-router";
import Layout from "../layout/Layout";
import {Link} from "react-router-dom";

const Home = () => {

    const {isAuthenticated} = useContext(AuthContext);

    const history = useHistory();

    // Redirect user to dashboard if authenticated
    useEffect(() => {
        if (isAuthenticated)
            history.push('/dashboard');
    }, [isAuthenticated]);


    return (
        <Layout title="Cuppa Caffeine Tracker" className="container">
            <p>
                Love coffee and other caffeinated drinks, but are you worried you might consume too much caffeine?
                Search no more. The Cuppa Caffeine Tracker will make sure you won't exceed safe levels.
            </p>
            <p>
                <Link to="/register">Create a profile</Link> and start tracking!
                <br/>
                Already registered? <Link to="/login">Log in</Link> to see if you can get another brew of your choice!
            </p>
        </Layout>
    )

}
export default Home;
