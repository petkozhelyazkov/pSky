import { register, login, logout, remove } from '../auth';
import { createContext, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../auth';

export const UserContext = createContext();

export const UserState = ({ children }) => {
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
        }
    });

    const userReducer = (payload, action) => {
        const { email, password, provider } = payload;

        switch (action) {
            case 'REGISTER': {
                register(email, password);
            }
                break;

            case 'LOGIN': {
                login(provider, email, password);
            }
                break;

            case 'LOGOUT': {
                logout();
            }
                break;

            case 'DELETE': {
                remove();
            }
        }
    }

    const userState = {
        user,
        userReducer
    };

    return (
        <UserContext.Provider value={userState}>
            {children}
        </UserContext.Provider>
    )
}