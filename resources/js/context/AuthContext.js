import React, {createContext, useState, useEffect} from 'react';
import AuthService from '../services/AuthService';
import Cookies from 'universal-cookie';

export const AuthContext = createContext(); // Creates both a Provider and a Consumer

export default ({children}) => {
    const [user, setUser] = useState({email: '', name: ''});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(async () => {
        // Verify if access_token exists and is still valid
        const cookies = new Cookies();
        const accessToken = cookies.get('access_token');
        if (typeof accessToken !== 'undefined') {
            // Access token exist. Check if still valid
            await AuthService.user().then(data => {
                if(data.status === 'success') {
                    // Token is still valid
                    setIsAuthenticated(true);
                    setUser({email: data.user.email, name: data.user.name});
                }
                else {
                    // Token is no longer valid
                    setIsAuthenticated(false);
                }
            });
        }
        else
            setIsAuthenticated(false);
    }, []);

    return (
        <div>
            <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}
