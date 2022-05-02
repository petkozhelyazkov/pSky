import { app } from '../firebase';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    deleteUser
} from "firebase/auth";

export const auth = getAuth(app);

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
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return user;
            }).catch((error) => {
                console.log(error);
            });
    } else {
        signInWithPopup(auth, providers[provider])
            .then((result) => {
                const user = result.user;
                return user;
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export function logout() {
    signOut(auth).then(() => {

    }).catch((error) => {
        console.log(error);
    });
}

export function remove() {
    deleteUser(user).then(() => {
    }).catch((error) => {
        console.log(error);
    });
}

export function register(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            return user;
        })
        .catch((error) => {
            console.log(error);
        });
}

