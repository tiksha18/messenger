import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);  //passig our own created AuthContext into react hook - useContext

// here, managing user's data 
export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const history = useHistory();

    useEffect(() => {
        // grabbing user from firebase authentication
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
            if(user) {
                history.push('/chats');
            }
        })
    }, [user, history]);  // useEffect will work whenever a new user adds or page gets renavigated

    const value = { user };

    return (
        <AuthContext.Provider value={value}>
            {/* showing children components if we are not loading */}
            {!loading && children}
        </AuthContext.Provider>
    )
}