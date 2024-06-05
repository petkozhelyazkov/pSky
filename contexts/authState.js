import { register, login, remove } from '../auth';
import { createContext, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../auth';
import { signOut } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthState = ({ children }) => {
    const [userAuth, setUserAuth] = useState({});

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserAuth(user);
        }
    });

    const userAuthReducer = (payload, action) => {
        const { email, password, provider } = payload;

        switch (action) {
            case 'REGISTER': {
                return register(email, password);
            } break;

            case 'LOGIN': {
                return login(provider, email, password);
            } break;

            case 'LOGOUT': {
                signOut(auth).then(() => {
                    setUserAuth({});
                }).catch((error) => {
                    console.log(error);
                });
            } break;

            case 'DELETE': {
                signOut(auth).then(() => {
                    remove(userAuth);
                    setUserAuth({});
                })
            }
        }
    }

    const userAuthState = {
        userAuth,
        userAuthReducer
    };

    return (
        <AuthContext.Provider value={userAuthState}>
            {children}
        </AuthContext.Provider>
    )
}