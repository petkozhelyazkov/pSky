import { createContext, useState, useContext } from 'react';
import { AuthContext } from './authState';
import { db } from '../auth/index';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { useLazyEffect } from '../hooks';

export const UserContext = createContext();

export const UserState = ({ children }) => {
    const { userAuth } = useContext(AuthContext);
    const [user, setUser] = useState(userAuth);

    useLazyEffect(() => {
        if (!userAuth.uid) {
            setUser({});
            return;
        }

        (async () => {
            const docRef = await doc(db, "users", userAuth.uid);
            const docSnap = await getDoc(docRef);

            const userData = docSnap.data();

            if (!userData) {
                (async () => {
                    await setDoc(doc(db, "users", userAuth.uid), {
                        uid: userAuth.uid,
                        email: userAuth.email,
                        passengers: [],
                        reservations: [],
                        userData: {},
                        paymentData: {}
                    }, { merge: 'true' });
                })();

                const docRef = await doc(db, "users", userAuth.uid);
                const docSnap = await getDoc(docRef);

                setUser(docSnap.data());
            }

            setUser(userData);
        })();
    }, [userAuth]);

    const userReducer = (payload, action) => {
        switch (action) {
            case 'UPDATE_PAYMENTDATA': {
                (async () => {
                    const docRef = await doc(db, "users", userAuth.uid);
                    await updateDoc(docRef, { paymentData: payload });

                    const docSnap = await getDoc(docRef);
                    const userData = docSnap.data();
                    setUser(userData);
                })();
            } break;

            case 'UPDATE_USERDATA': {
                (async () => {
                    const docRef = await doc(db, "users", userAuth.uid);
                    await updateDoc(docRef, { userData: payload });

                    const docSnap = await getDoc(docRef);
                    const userData = docSnap.data();
                    setUser(userData);
                })();
            } break;

            case 'ADD_PASSENGER': {
                (async () => {
                    const docRef = await doc(db, "users", userAuth.uid);
                    const docSnap = await getDoc(docRef);
                    const { passengers } = docSnap.data();

                    let newPassenger = { ...payload, id: Math.random() };
                    await updateDoc(docRef, { passengers: [...passengers, newPassenger] });
                    setUser({ ...user, passengers: [...passengers, newPassenger] });
                })();
            } break;

            case 'REMOVE_PASSENGER': {
                (async () => {
                    const docRef = await doc(db, "users", userAuth.uid);
                    const docSnap = await getDoc(docRef);
                    const { passengers } = docSnap.data();

                    let newPassengers = passengers.filter(x => x.id != payload);

                    await updateDoc(docRef, { passengers: newPassengers });
                    setUser({ ...user, passengers: newPassengers });
                })();
            } break;

            case 'ADD_FLIGHT': {
                if (userAuth.uid) {
                    (async () => {
                        const docRef = await doc(db, "users", userAuth.uid);
                        const docSnap = await getDoc(docRef);
                        const { reservations } = docSnap.data();

                        let newReservation = { ...payload, id: Math.random() };
                        await updateDoc(docRef, { reservations: [newReservation, ...reservations] });
                        setUser({ ...user, reservations: [newReservation, ...reservations] });
                    })();
                }
            } break;
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