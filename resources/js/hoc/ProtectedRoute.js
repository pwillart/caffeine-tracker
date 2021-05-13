import React, {useContext} from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const ProtectedRoute = ({component: Component, ...rest}) => {
    const location = useLocation();
    const {isAuthenticated} = useContext(AuthContext);

    return (
        <Route {...rest}>
            {!isAuthenticated &&
            <Redirect to={{pathname: "/", state: {from: location}}}/>
            }
            {isAuthenticated &&
            <Component {...rest}/>
            }
        </Route>    )
};

export default ProtectedRoute;
