import { initializeApp } from "firebase/app";
import { initializeFirestore } from 'firebase/firestore';

//TODO: MOVE TO .env.local
const firebaseConfig = {
    apiKey: "AIzaSyC502p5iM1TCWXNZJCuUre4wi_AKJQLQDY",
    authDomain: "planesdb-44047.firebaseapp.com",
    projectId: "planesdb-44047",
    storageBucket: "planesdb-44047.appspot.com",
    messagingSenderId: "29672688117",
    appId: "1:29672688117:web:2edb4350e0e237b770f8bc"
};

export const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, { cacheSizeBytes: 1048576 });