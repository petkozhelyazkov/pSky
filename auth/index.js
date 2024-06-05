import { app } from '../firebase';
import { initializeFirestore } from 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    deleteUser,
} from "firebase/auth";

export const auth = getAuth(app);
export const db = initializeFirestore(app, { cacheSizeBytes: 1048576 });

const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({
    display: 'popup',
    redirect_uri: 'https://planesdb-44047.firebaseapp.com/__/auth/handler',
});

const googleProvider = new GoogleAuthProvider();

const providers = {
    'FACEBOOK': facebookProvider,
    'GOOGLE': googleProvider
}

export function login(provider, email, password) {
    if (provider == 'EMAIL') {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return user;
            });
    } else {
        signInWithPopup(auth, providers[provider])
            .then((result) => {
                const user = result.user;
                return user;
            });
    }
}

export function remove(user) {
    deleteUser(user)
        .then(() => { })
        .catch(x => {
            return x;
        })
}

export function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            return user;
        })
}

