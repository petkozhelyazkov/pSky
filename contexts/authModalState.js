import { createContext, useState } from 'react';

export const AuthModalContext = createContext();

export const AuthModalState = ({ children }) => {
    const [authModal, setAuthModal] = useState(false);

    const authModalReducer = (payload) => {
        setAuthModal(x => x = payload);
    }

    const authModalState = {
        authModal,
        authModalReducer
    }

    return (
        <AuthModalContext.Provider value={authModalState}>
            {children}
        </AuthModalContext.Provider>
    )
}